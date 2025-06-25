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

export const NavigationDialog = ({ isOpen, yesCallback, noCallback }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mx-auto lg:mx-0">
            Are you sure you want to leave the page?
          </AlertDialogTitle>
          <AlertDialogDescription>All data will be lost</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={noCallback}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={yesCallback}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
