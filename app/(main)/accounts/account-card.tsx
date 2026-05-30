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

const iconMap: Record<string, React.ReactNode> = {
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
    <Card className="w-full h-auto flex flex-col justify-between shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
            {iconMap[account.icon] || <Landmark className="h-6 w-6" />}
          </div>
          <CardTitle className="text-base font-bold truncate max-w-[150px]">
            {account.bank_name}
          </CardTitle>
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Ellipsis className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-32 p-1 flex flex-col gap-1"
              align="end"
            >
              <Button
                variant="ghost"
                className="justify-start w-full text-sm"
                onClick={() => onEdit(account)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Sửa
              </Button>
              <Button
                variant="ghost"
                className="justify-start w-full text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDeleteClick(account)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Xóa
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <p className="font-semibold uppercase tracking-wider text-sm truncate">
          {account.account_name}
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          {account.account_number}
        </p>
      </CardContent>

      <CardFooter className="flex items-baseline space-x-2 pt-2 border-t mt-auto">
        <span className="text-muted-foreground text-[0.7rem]">Số dư:</span>
        <span className="font-bold text-primary text-lg">
          {Number(account.balance).toLocaleString("vi-VN")}
          <span className="text-xs font-normal text-muted-foreground ml-1">
            VND
          </span>
        </span>
      </CardFooter>
    </Card>
  );
}
