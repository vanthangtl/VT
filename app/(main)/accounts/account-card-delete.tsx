// app/(main)/account/account-card-delete.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function AccountCardDelete({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xóa tài khoản</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa tài khoản này? Toàn bộ dữ liệu liên quan
            sẽ mất và hành động này{" "}
            <strong className="text-destructive">không thể hoàn tác</strong>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 className="mr-2 h-4 w-4" /> Xóa tài khoản
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
