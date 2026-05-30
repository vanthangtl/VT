// app/(main)/account/account-manager.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { AccountCard } from "./account-card";
import { AccountCardAdd } from "./account-card-add";
import { AccountCardDelete } from "./account-card-delete";
import { AccountCardEdit } from "./account-card-edit";

interface Account {
  id: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  balance: number;
  icon: string;
  user_id: string;
}

export function AccountManager({
  initialAccounts,
  userId,
}: {
  initialAccounts: Account[];
  userId: string;
}) {
  const router = useRouter();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleRefreshData = () => {
    router.refresh();
  };

  const handleOpenEdit = (account: Account) => {
    setSelectedAccount(account);
    setIsEditDialogOpen(true);
  };

  const handleOpenDelete = (account: Account) => {
    setSelectedAccount(account);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAccount) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", selectedAccount.id);

    if (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Xóa thất bại!");
    } else {
      setIsDeleteDialogOpen(false);
      setSelectedAccount(null);
      handleRefreshData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý Tài khoản</h1>
        <AccountCardAdd userId={userId} onAdded={handleRefreshData} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {initialAccounts.map((acc) => (
          <AccountCard
            key={acc.id}
            account={acc}
            onEdit={handleOpenEdit}
            onDeleteClick={handleOpenDelete}
          />
        ))}

        {initialAccounts.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">
            Bạn chưa cấu hình tài khoản nào. Hãy thêm tài khoản mới!
          </p>
        )}
      </div>

      {/* Dialog Sửa Thông Tin */}
      <AccountCardEdit
        account={selectedAccount}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedAccount(null);
        }}
        onSuccess={handleRefreshData}
      />

      {/* Dialog Xóa */}
      <AccountCardDelete
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedAccount(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
