import React from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react'; // Import Trash2 icon

interface DeleteAllMessagesDialogProps {
  onDeleteAllMessages: () => Promise<void>;
}

const DeleteAllMessagesDialog: React.FC<DeleteAllMessagesDialogProps> = ({ onDeleteAllMessages }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Adjusted button styling for use within a dropdown menu */}
        <Button variant="ghost" className="w-full justify-start text-left px-2 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive" >
          <Trash2 className="mr-2 h-4 w-4" /> Видалити всі повідомлення
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card text-card-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>Ви впевнені?</AlertDialogDTitle>
          <AlertDialogDescription>
            Ця дія видалить всі повідомлення з чату назавжди. Цю дію неможливо скасувати.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-muted text-muted-foreground hover:bg-muted/80">Скасувати</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteAllMessages} className="bg-destructive text-destructive-foreground hover:bg-destructive/80">
            Видалити все
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAllMessagesDialog;