import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim();
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing', details: 'Missing server credentials' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into contact table
    // Table columns: full_name, email, phone_number, subject, description
    const { data: contactData, error: insertError } = await supabase
      .from('contact')
      .insert({
        full_name: fullName,
        email: email,
        phone_number: phone || null,
        subject: subject || null,
        description: message
      })
      .select()
      .single();

    if (insertError) {
      console.error('[API/send-contact-email] Insert error:', JSON.stringify(insertError, null, 2));
      console.error('[API/send-contact-email] Attempted to insert:', { full_name: fullName, email, phone, subject, message });
      
      // Check if table doesn't exist
      if (insertError.code === '42P01') {
        return NextResponse.json(
          { error: 'Contact table not found. Please create the table in Supabase first.', details: insertError.message },
          { status: 500 }
        );
      }
      
      // Check for RLS policy violation
      if (insertError.code === '42501') {
        return NextResponse.json(
          { error: 'Permission denied. Check RLS policies on contact table.', details: insertError.message, code: insertError.code },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to save contact submission', details: insertError.message, code: insertError.code, hint: insertError.hint || '' },
        { status: 500 }
      );
    }

    // If no data returned, generate a temporary ID
    const contactId = contactData?.id || `temp-${Date.now()}`;

    // Get agent email from database (agents table has: full_name, email, phone_number)
    const { data: agentData } = await supabase
      .from('agents')
      .select('email')
      .limit(1)
      .single();

    const agentEmail = agentData?.email || 'nridesicart064@gmail.com';

    // Format date
    const formattedDate = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Subject mapping
    const subjectLabels: Record<string, string> = {
      'insurance': 'Life Insurance',
      'tailoring': 'Fabrics & Tailoring',
      'realestate': 'Real Estate',
      'auto': 'Auto Advertisements',
      'general': 'General Inquiry',
      'support': 'Support'
    };

    const subjectLabel = subject ? subjectLabels[subject] || subject : 'Not specified';

    // Send email via Resend
    console.log('[API/send-contact-email] Sending email to:', agentEmail);
    console.log('[API/send-contact-email] RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    
    // Initialize Resend inside the handler to avoid build-time errors
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Nridesikart Contact <onboarding@resend.dev>',
      to: agentEmail,
      replyTo: email,
      subject: `New Contact: ${subjectLabel} - ${fullName}`,
      text: `
New Contact Form Submission - Nridesikart
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${fullName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subjectLabel}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact ID: ${contactId}
Submitted: ${formattedDate}

To respond, reply directly to: ${email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated notification from Nridesikart Contact Form.
      `
    });

    if (emailError) {
      console.error('[API/send-contact-email] Email error:', JSON.stringify(emailError, null, 2));
      // Still return success since data was saved to database
    } else {
      console.log('[API/send-contact-email] Email sent successfully, ID:', emailData?.id);
    }

    console.log('[API/send-contact-email] Contact saved successfully');
    return NextResponse.json({ success: true, contactId: contactId });

  } catch (error) {
    console.error('[API/send-contact-email] API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
