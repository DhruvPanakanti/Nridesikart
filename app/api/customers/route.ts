import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const supabaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim();
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  // Check env vars first
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      {
        error: "Server configuration error",
        details: "Missing Supabase server credentials",
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!supabaseKey,
      },
      { status: 500 }
    );
  }

  // Log the URL being used (first 50 chars for debugging)
  const urlPreview = supabaseUrl.substring(0, 50);
  console.log("[API/customers] Using Supabase URL:", urlPreview);

  // Validate URL format
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
    return NextResponse.json(
      { error: "Invalid Supabase URL", details: `URL should be like https://xxxxx.supabase.co, got: ${supabaseUrl.substring(0, 30)}...` },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { fullName, email, phoneNumber } = body;

  // Validate required fields
  if (!fullName || !email || !phoneNumber) {
    return NextResponse.json(
      { error: "Missing required fields", details: { fullName: !!fullName, email: !!email, phoneNumber: !!phoneNumber } },
      { status: 400 }
    );
  }

  try {
    console.log("[API/customers] Connecting to Supabase URL:", supabaseUrl);
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if customer already exists by email
    const { data: existingCustomer, error: existingCustomerError } = await supabase
      .from("customers")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existingCustomerError) {
      console.log("[API/customers] Existing customer lookup error:", existingCustomerError);
    }

    if (existingCustomer) {
      // Customer already exists - return error instead of silently skipping
      console.log("[API/customers] Customer already exists, returning error");
      return NextResponse.json(
        { error: "User already exists", details: "A user with this email address already exists in our system. Please use a different email or contact support." },
        { status: 409 }
      );
    }

    // Insert new customer
    const { error } = await supabase
      .from("customers")
      .insert({
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
      });

    if (error) {
      console.log("[API/customers] Supabase error:", error);
      
      // Handle duplicate key error (unique constraint violation)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: "User already exists", details: "A user with this email address already exists in our system. Please use a different email or contact support." },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to save customer", details: error.message, code: error.code || "", hint: error.hint || "" },
        { status: 500 }
      );
    }

    console.log("[API/customers] Customer saved successfully");
    return NextResponse.json({ success: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { 
        error: "Failed to save customer", 
        details: errorMessage, 
        supabaseUrlUsed: supabaseUrl,
        diagnosis: errorMessage.includes("fetch failed") ? "NETWORK_ERROR: Cannot reach Supabase. Check if URL is correct and project is active." : "UNKNOWN"
      },
      { status: 500 }
    );
  }
}
