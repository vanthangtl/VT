// edit-category.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCategory } from "./actions";

export function EditCategoryDialog({
  category,
  open,
  onOpenChange,
}: {
  category: { id: string; name: string; budget: number };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // Ràng buộc id của function update với category cụ thể
  const updateWithId = updateCategory.bind(null, category.id);

  async function handleAction(formData: FormData) {
    await updateWithId(formData);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sửa danh mục</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin danh mục.</DialogDescription>
        </DialogHeader>
        <form action={handleAction}>
          <FieldGroup>
            <Field>
              <Label htmlFor="edit-name">Tên danh mục</Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={category.name}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="edit-budget">Ngân sách (VND)</Label>
              <Input
                id="edit-budget"
                name="budget"
                type="number"
                defaultValue={category.budget}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
