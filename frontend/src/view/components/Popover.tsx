import * as RdxPopover from '@radix-ui/react-popover';

import { cn } from '@/app/utils/cn';

interface PopoverProps {
  className?: string;
  children: React.ReactNode;
}

function PopoverRoot({ children }: PopoverProps) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopoverTrigger({ children }: PopoverProps) {
  return <RdxPopover.Trigger asChild>{children}</RdxPopover.Trigger>;
}

function PopoverContent({ className, children }: PopoverProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          'z-50 space-y-2 rounded-2xl bg-white p-4 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};

