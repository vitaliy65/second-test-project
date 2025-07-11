"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useList from "@/hooks/List";

interface ShareListModalProps {
  listId: string;
  handleClose: () => void;
}

export default function ShareListModal({
  listId,
  handleClose,
}: ShareListModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "viewer">("viewer");
  const {
    shareList,
    isShareListError,
    isShareListPending,
    ShareListErrorMessage,
  } = useList();

  const handleSubmitShare = async (e: React.FormEvent) => {
    e.preventDefault();
    shareList({
      listId,
      email,
      role,
    });
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Поділитися списком</DialogTitle>
          <DialogDescription>
            Додайте користувача за електронною поштою та призначте йому роль.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitShare}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Роль
              </Label>
              <Select
                onValueChange={(value: "admin" | "viewer") => setRole(value)}
                defaultValue={role}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Виберіть роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Переглядач</SelectItem>
                  <SelectItem value="admin">Адмін</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isShareListError && (
            <div className="text-red-500 text-sm text-center my-4">
              {ShareListErrorMessage}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Скасувати
            </Button>
            <Button type="submit" disabled={isShareListPending}>
              {isShareListPending ? "надсилання..." : "Поділитися"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
