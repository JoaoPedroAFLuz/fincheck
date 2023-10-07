import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from '@/app/utils/cn';

interface DropdownMenuProps {
  className?: string;
  children: React.ReactNode;
}

function DropdownMenuRoot({ children }: DropdownMenuProps) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: DropdownMenuProps) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none">
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

function DropdownMenuContent({ className, children }: DropdownMenuProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'z-50 space-y-2 rounded-2xl bg-white p-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps extends DropdownMenuProps {
  onSelect?(): void;
}

function DropdownMenuItem({
  onSelect,
  className,
  children,
}: DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'flex min-h-[40px] cursor-pointer items-center rounded-2xl px-4 py-2 text-sm text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50',
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};

