import { ReactNode } from 'react';

export interface DialogProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  classNames?: {
    overlay?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
}

export interface CarouselProps {
  plugins?: any[];
  options?: {
    loop?: boolean;
    align?: 'start' | 'center' | 'end';
    slidesToScroll?: number;
  };
}

export interface CalendarProps {
  mode?: 'single' | 'range' | 'multiple';
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | undefined) => void;
  disabled?: Date[];
  components?: {
    IconLeft?: () => ReactNode;
    IconRight?: () => ReactNode;
  };
} 