"use client";

import React, { useRef, useState, useEffect, useCallback, ReactNode, MouseEventHandler, UIEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onRemove?: () => void;
  isRemoving?: boolean;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ 
  children, 
  delay = 0, 
  index, 
  onMouseEnter, 
  onClick,
  onRemove,
  isRemoving = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={isRemoving ? { scale: 0.7, opacity: 0, height: 0, marginBottom: 0 } : inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      exit={{ scale: 0.7, opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2, delay: isRemoving ? 0 : delay }}
      className="mb-4"
    >
      {children}
    </motion.div>
  );
};

interface CartItemData {
  id: string;
  slug?: string;
  name: string;
  label?: string;
  shortDescription?: string;
  imageUrl?: string;
}

interface AnimatedListProps {
  items?: CartItemData[];
  onItemRemove?: (item: CartItemData, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  emptyMessage?: string;
  emptySubtext?: string;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items = [],
  onItemRemove,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = false,
  initialSelectedIndex = -1,
  emptyMessage = "Your cart is empty",
  emptySubtext = "You can choose services from Quick Opt below"
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleItemMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleRemoveClick = useCallback(
    (e: React.MouseEvent, item: CartItemData, index: number) => {
      e.stopPropagation();
      setRemovingId(item.id);
      setTimeout(() => {
        if (onItemRemove) {
          onItemRemove(item, index);
        }
        setRemovingId(null);
      }, 200);
    },
    [onItemRemove]
  );

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  useEffect(() => {
    if (!enableArrowNavigation || items.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          const item = items[selectedIndex];
          setRemovingId(item.id);
          setTimeout(() => {
            if (onItemRemove) {
              onItemRemove(item, selectedIndex);
            }
            setRemovingId(null);
          }, 200);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemRemove, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  if (items.length === 0) {
    return (
      <div className={cn("relative w-full", className)}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {emptyMessage}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {emptySubtext}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={listRef}
        className={cn(
          "max-h-[400px] overflow-y-auto p-4",
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-[4px]'
            : 'scrollbar-hide'
        )}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',
          scrollbarColor: 'var(--scrollbar-thumb) transparent'
        }}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <AnimatedItem
              key={item.id}
              delay={0.05 * index}
              index={index}
              onMouseEnter={() => handleItemMouseEnter(index)}
              isRemoving={removingId === item.id}
            >
              <div 
                className={cn(
                  "p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group",
                  selectedIndex === index 
                    ? 'border-orange-400 dark:border-orange-500 bg-orange-50/80 dark:bg-orange-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600',
                  itemClassName
                )}
              >
                {/* Service Image */}
                {item.imageUrl && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Service Details */}
                <div className="flex-grow min-w-0">
                  {item.label && (
                    <p className="text-xs uppercase tracking-wider text-orange-500 font-semibold mb-1">
                      {item.label}
                    </p>
                  )}
                  <p className="text-gray-900 dark:text-white font-medium text-lg">
                    {item.name}
                  </p>
                  {item.shortDescription && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                      {item.shortDescription}
                    </p>
                  )}
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemoveClick(e, item, index)}
                  className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200 opacity-60 group-hover:opacity-100 hover:scale-110 flex-shrink-0"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </AnimatedItem>
          ))}
        </AnimatePresence>
      </div>
      {showGradients && items.length > 3 && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none transition-opacity duration-300 ease rounded-t-xl"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none transition-opacity duration-300 ease rounded-b-xl"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedList;
