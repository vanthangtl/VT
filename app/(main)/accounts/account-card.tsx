// app/(main)/account/account-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Banknote,
  Ellipsis,
  Landmark,
  Pencil,
  Trash2,
  Wallet,
} from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

const iconMap: Record<string, JSX.Element> = {
  landmark: <Landmark className="h-6 w-6" />,
  banknote: <Banknote className="h-6 w-6" />,
  wallet: <Wallet className="h-6 w-6" />,
};

export function AccountCard({
  account,
  onEdit,
  onDeleteClick,
}: {
  account: any;
  onEdit: (account: any) => void;
  onDeleteClick: (account: any) => void;
}) {
  return (
    <Card className="w-75 h-auto">
      {/* ... Phần UI cũ của bạn giữ nguyên, không cần thay đổi gì thêm ... */}
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 flex items-center justify-center rounded-sm bg-primary/10 text-primary">
            {iconMap[account.icon] || <Landmark className="h-6 w-6" />}
          </div>
          <CardTitle>{account.bank_name}</CardTitle>
        </div>

        <div className="ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Ellipsis className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-40 p-1 flex flex-col gap-1"
              align="end"
            >
              <Button
                variant="ghost"
                className="justify-start w-full"
                onClick={() => onEdit(account)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Sửa
              </Button>
              <Button
                variant="ghost"
                className="justify-start w-full text-red-600 hover:text-red-600 hover:bg-red-50"
                onClick={() => onDeleteClick(account)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Xóa
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent>
        <p className="font-semibold uppercase">{account.account_name}</p>
        <p className="text-muted-foreground">{account.account_number}</p>
      </CardContent>
      <CardFooter className="flex items-end space-x-2">
        <span className="text-muted-foreground text-[0.6rem]">Số dư:</span>
        <span className="font-bold text-primary text-xl">
          {Number(account.balance).toLocaleString("vi-VN")} VND
        </span>
      </CardFooter>
    </Card>
  );
}
