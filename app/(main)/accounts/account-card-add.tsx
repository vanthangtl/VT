// account-card-add.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client bạn đã tạo ở Bước 2
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { Landmark, Banknote, Wallet, Plus } from "lucide-react";

export function AccountCardAdd({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
    balance: "",
    icon: "landmark",
  });

  const handleAdd = async () => {
    // Kiểm tra sơ bộ
    if (
      !formData.bank_name ||
      !formData.account_name ||
      !formData.account_number
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    const { error } = await createClient().from("accounts").insert([
      {
        bank_name: formData.bank_name,
        account_name: formData.account_name,
        account_number: formData.account_number,
        balance: Number(formData.balance) || 0,
        icon: formData.icon,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Lỗi:", error);
      alert("Không thể thêm tài khoản");
    } else {
      // Reset form và đóng dialog
      setFormData({
        bank_name: "",
        account_name: "",
        account_number: "",
        balance: "",
        icon: "landmark",
      });
      setOpen(false);
      onAdded(); // Gọi callback để load lại danh sách ở trang chủ
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Nút trigger được thiết kế như một cái khung trống hoặc nút bấm nổi bật */}
        <Button variant="outline">
          <Plus className="h-6 w-6 text-primary" />
          <span className="text-primary">Thêm tài khoản mới</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm tài khoản mới</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Ngân hàng</Label>
            <Input
              placeholder="VD: MB Bank, VCB..."
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
              placeholder="Tên chủ tài khoản"
              className="col-span-3 uppercase"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({ ...formData, account_name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Số TK</Label>
            <Input
              placeholder="Số tài khoản ngân hàng"
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
              placeholder="0"
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Đang lưu..." : "Thêm tài khoản"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
