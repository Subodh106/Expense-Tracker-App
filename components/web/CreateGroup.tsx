"use client"
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
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateGroup = () => {
  const[groupName , setgroupName]=useState<string>("");
  const [loading , setLoading]=useState(false);
  const [serverErrors , setServerErrors]=useState<string>("");

  const handleCreateGroup =async()=>{
    setLoading(true);
    try {
      const response = await axios.post("/api/groups/create-group",{group_name:groupName});
      if(response.status ===201){
        toast.success("Group created successfully");
      }
      } 
      catch (error:any) {
        setServerErrors(error?.response?.data?.message);
      }
    finally{
      setLoading(false);
    }
  }
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
          value={groupName}
          onChange={(e)=>{setgroupName(e.target.value)}}
          />
          {serverErrors && <p className="text-sm text-red-500">{serverErrors}</p>}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose  asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild disabled ={loading} >
            <Button onClick={handleCreateGroup}>
            <PlusIcon></PlusIcon>
            Create Group</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateGroup;
