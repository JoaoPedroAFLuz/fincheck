import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/view/components/Button';

export function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="w-40">
      <h1>Dashboard Page</h1>

      <Button onClick={logout}>Sair</Button>
    </div>
  );
}

