import { Logo } from '@/view/components/Logo';
import { UserMenu } from '@/view/components/UserMenu';
import { Accounts } from './components/Accounts';
import { DashboardProvider } from './components/DashboardContext';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { NewAccountModal } from './modals/NewAccountModal';

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="flex h-full w-full flex-col gap-4 p-4 md:px-8 md:pb-8 md:pt-6">
        <header className="flex h-12 justify-between">
          <Logo className="h-6 text-teal-900" />
          <UserMenu />
        </header>

        <main className="flex max-h-full flex-1 flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/2">
            <Accounts />
          </div>

          <div className="w-full md:w-1/2">
            <Transactions />
          </div>
        </main>

        <Fab />

        <NewAccountModal />
      </div>
    </DashboardProvider>
  );
}

