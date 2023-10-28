import { ExitIcon } from '@radix-ui/react-icons';

import { useAuth } from '@/app/hooks/useAuth';
import { DropdownMenu } from './DropdownMenu';

export function UserMenu() {
  const { user, logout } = useAuth();

  const initials = `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-teal-50 transition-colors hover:bg-teal-100">
          <span className="text-sm font-medium tracking-tight text-teal-900">
            {initials.toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="mr-2 mt-2 w-32">
        <DropdownMenu.Item
          onSelect={logout}
          className="flex items-center justify-between gap-2"
        >
          <span>Sair</span>
          <ExitIcon className="h-4 w-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

