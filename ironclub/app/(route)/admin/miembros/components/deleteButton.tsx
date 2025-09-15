import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
    user: {
        id: number;
    };
    onUpdate: () => void;
};

export const DeleteButton = ({ user, onUpdate }: Props) => {
    const deleted = async () => {
        axios
            .delete(`http://localhost:8000/users/users/${user.id}`)
            .then((response) => {
                toast.success('Usuario eliminado con éxito');
                onUpdate();
            })
            .catch((error) => {
                toast.error('Error al eliminar el usuario');
            });
    };
    return (
        <Button
            size={'sm'}
            variant={'ghost'}
            onClick={deleted}
            className="text-gray-600 hover:text-gray-900"
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
};
