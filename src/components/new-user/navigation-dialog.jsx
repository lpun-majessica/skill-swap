import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../common/buttons";

export const NavigationDialog = ({ isOpen, yesCallback, noCallback }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="md:px-15">
        <AlertDialogHeader className="mx-auto lg:mx-0">
          <AlertDialogTitle>
            Are you sure you want to leave the page?
          </AlertDialogTitle>
          <AlertDialogDescription>All data will be lost</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-center md:justify-end">
          <AlertDialogCancel asChild>
            <Button text="Cancel" variant="gray" onClick={noCallback} />
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button text="Continue" variant="red" onClick={yesCallback} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
