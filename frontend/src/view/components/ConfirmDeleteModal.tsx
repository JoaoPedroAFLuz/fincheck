import { Button } from './Button';
import { Modal } from './Modal';
import { TrashIcon } from './icons/Trash';

interface ConfirmDeleteModalProps {
  title: string;
  description?: string;
  isLoading: boolean;
  onConfirm(): void;
  onClose(): void;
}

export function ConfirmDeleteModal({
  title,
  description,
  isLoading,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-[52] w-[52px] items-center justify-center rounded-full bg-red-50">
          <TrashIcon className="h-6 w-6 text-red-900" />
        </div>
        <p className="w-[180px] font-bold tracking-tight text-gray-800">
          {title}
        </p>
        {description && (
          <p className="tracking-tight text-gray-800">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button variant="danger" isLoading={isLoading} onClick={onConfirm}>
          Sim, desejo excluir
        </Button>

        <Button variant="ghost" disabled={isLoading} onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}

