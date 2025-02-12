import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createFolderAction } from "~/app/actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create folder"}
    </Button>
  );
}

export function AddFolderDialog({ folderId }: { folderId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FolderPlus className="mr-2 h-4 w-4" />
          Add Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          action={async (formData) => {
            const result = await createFolderAction(formData);
            if (result.success) {
              setOpen(false);
            }
          }}
        >
          <input type="hidden" name="folderId" value={folderId} />
          <DialogHeader className="text-left">
            <DialogTitle>Add Folder</DialogTitle>
            <DialogDescription>
              Insert the name of the new folder
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-start gap-2 py-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" required className="col-span-3" />
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
