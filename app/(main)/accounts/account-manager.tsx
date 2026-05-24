// app/(main)/account/account-manager.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { AccountCard } from "./account-card";
import { AccountCardAdd } from "./account-card-add";
import { AccountCardDelete } from "./account-card-delete";
import { AccountCardEdit } from "./account-card-edit";

export function AccountManager({
  initialAccounts,
}: {
  initialAccounts: any[];
}) {
  const router = useRouter();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  // Gọi router.refresh() để Server Component tự động lấy dữ liệu mới nhất
  const handleRefreshData = () => {
    router.refresh();
  };

  const handleOpenEdit = (account: any) => {
    setSelectedAccount(account);
    setIsEditDialogOpen(true);
  };

  const handleOpenDelete = (account: any) => {
    setSelectedAccount(account);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAccount) return;

    const { error } = await createClient()
      .from("accounts")
      .delete()
      .eq("id", selectedAccount.id);
 
    if (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Xóa thất bại!");
    } else {
      setIsDeleteDialogOpen(false);
      handleRefreshData();
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Quản lý Tài khoản</h1>
        <AccountCardAdd onAdded={handleRefreshData} />
      </div>

      {initialAccounts.map((acc) => (
        <AccountCard
          key={acc.id}
          account={acc}
          onEdit={handleOpenEdit}
          onDeleteClick={handleOpenDelete}
        />
      ))}

      {/* Dialog Sửa Thông Tin */}
      <AccountCardEdit
        account={selectedAccount}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSuccess={handleRefreshData}
      />

      {/* Dialog Xóa */}
      <AccountCardDelete
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
