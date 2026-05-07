import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { PlusIcon } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CreateGroup = () => {
  return (
    <Dialog>
      <form>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:bg-green-500 bg-green-600">
          
          <PlusIcon /> Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
              Create your own group
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="group-name">Group Name</Label>
          <Input
          id="group-name"
          name="group-name"
          autoCorrect="group-name"
          />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>
            <PlusIcon></PlusIcon>
            Create Group</Button>
        </DialogFooter>
      </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateGroup;
