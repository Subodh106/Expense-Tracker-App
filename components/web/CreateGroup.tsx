"use client";

import {
  Dialog,
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
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateGroup = () => {
  const [groupName, setgroupName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleCreateGroup = async () => {
    setLoading(true);
    setServerErrors("");
    try {
      const response = await axios.post("/api/groups/create-group", {
        group_name: groupName,
      });

      if (response.status === 201) {
        toast.success("Group created successfully");
        setOpen(false);
        setgroupName("");
      }
    } catch (error: any) {
      setServerErrors(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              value={groupName}
              onChange={(e) => setgroupName(e.target.value)}
            />

            {serverErrors && (
              <p className="text-sm text-red-500">{serverErrors}</p>
            )}
          </Field>
        </FieldGroup>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleCreateGroup}
            disabled={loading}
          >
            <PlusIcon />
            {loading ? "Creating..." : "Create Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;