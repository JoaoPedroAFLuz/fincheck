import * as RdxDialog from '@radix-ui/react-dialog';

import { cn } from '@/app/utils/cn';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  title: string;
  open: boolean;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export function Modal({
  title,
  open,
  children,
  rightAction,
  onClose,
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Trigger />

      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-overlayShow',
          )}
        />

        <RdxDialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[95%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-10 rounded-2xl bg-white p-6 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)] outline-none',
            'data-[state=open]:animate-content-show',
          )}
        >
          <header className="flex h-12 items-center justify-between text-gray-800">
            <button
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full outline-none transition-colors hover:bg-gray-50"
            >
              <Cross2Icon className="h-6 w-6" />
            </button>

            <h1 className="text-lg font-bold tracking-tighter">{title}</h1>

            <div className="flex h-12 w-12 items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}

