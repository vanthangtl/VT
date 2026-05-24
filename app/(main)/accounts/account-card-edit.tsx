// app/(main)/account/account-card-edit.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Landmark, Banknote, Wallet } from "lucide-react";

export function AccountCardEdit({
  account,
  isOpen,
  onClose,
  onSuccess,
}: {
  account: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
    balance: "",
    icon: "landmark",
  });

  // Cập nhật formData mỗi khi chọn một account khác
  useEffect(() => {
    if (account) {
      setFormData({
        bank_name: account.bank_name || "",
        account_name: account.account_name || "",
        account_number: account.account_number || "",
        balance: account.balance?.toString() || "0",
        icon: account.icon || "landmark",
      });
    }
  }, [account]);

  const handleSave = async () => {
    if (!account) return;
    setLoading(true);

    const { error } = await createClient()
      .from("accounts")
      .update({
        bank_name: formData.bank_name,
        account_name: formData.account_name,
        account_number: formData.account_number,
        balance: Number(formData.balance),
        icon: formData.icon,
      })
      .eq("id", account.id);

    setLoading(false);

    if (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Cập nhật thất bại!");
    } else {
      onClose();
      onSuccess();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sửa thông tin tài khoản</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Ngân hàng</Label>
            <Input
              className="col-span-3"
              value={formData.bank_name}
              onChange={(e) =>
                setFormData({ ...formData, bank_name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tên TK</Label>
            <Input
              className="col-span-3"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({ ...formData, account_name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Số TK</Label>
            <Input
              className="col-span-3"
              value={formData.account_number}
              onChange={(e) =>
                setFormData({ ...formData, account_number: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Số dư</Label>
            <Input
              type="number"
              className="col-span-3"
              value={formData.balance}
              onChange={(e) =>
                setFormData({ ...formData, balance: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Icon</Label>
            <Select
              value={formData.icon}
              onValueChange={(val) => setFormData({ ...formData, icon: val })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="landmark">
                  <div className="flex items-center">
                    <Landmark className="mr-2 h-4 w-4" /> Ngân hàng
                  </div>
                </SelectItem>
                <SelectItem value="banknote">
                  <div className="flex items-center">
                    <Banknote className="mr-2 h-4 w-4" /> Tiền mặt
                  </div>
                </SelectItem>
                <SelectItem value="wallet">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" /> Ví điện tử
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
