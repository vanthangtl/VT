// create-category.tsx
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createCategory } from "./actions";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  async function handleAction(formData: FormData) {
    await createCategory(formData);
    setOpen(false); // Đóng modal sau khi lưu thành công
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-4 mr-1" />
          Thêm danh mục
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Thêm danh mục</DialogTitle>
          <DialogDescription>
            Tạo danh mục mới để quản lý chi tiêu.
          </DialogDescription>
        </DialogHeader>
        {/* Sử dụng thẻ form bao bọc và gọi server action */}
        <form action={handleAction}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Tên danh mục</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Ví dụ: Ăn uống"
              />
            </Field>
            <Field>
              <Label htmlFor="budget">Ngân sách (VND)</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                required
                placeholder="Ví dụ: 500000"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit">Lưu lại</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
