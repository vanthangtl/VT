// account-card-delete.tsx
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa tài khoản</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn
          tác.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 className="mr-2 h-4 w-4" /> Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
