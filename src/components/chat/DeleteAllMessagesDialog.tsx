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

interface DeleteAllMessagesDialogProps {
  onDeleteAllMessages: () => Promise<void>;
}

const DeleteAllMessagesDialog: React.FC<DeleteAllMessagesDialogProps> = ({ onDeleteAllMessages }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full mt-2">
          Видалити всі повідомлення
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card text-card-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
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