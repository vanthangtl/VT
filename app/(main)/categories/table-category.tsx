// table-category.tsx
"use client";

import { useState, useTransition } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateCategoryDialog } from "./create-category";
import { EditCategoryDialog } from "./edit-category";
import { deleteCategory } from "./actions";

type Category = {
  id: string;
  name: string;
  budget: number;
};

export function TableCategories({ categories }: { categories: Category[] }) {
  const [isPending, startTransition] = useTransition();

  // State quản lý việc mở modal sửa cho từng dòng
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      startTransition(() => {
        deleteCategory(id);
      });
    }
  };

  return (
    <div>
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Danh mục</h2>
        <CreateCategoryDialog />
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Danh mục</TableHead>
            <TableHead>Ngân sách</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                Chưa có dữ liệu.
              </TableCell>
            </TableRow>
          )}
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(category.budget)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      disabled={isPending}
                    >
                      <MoreHorizontalIcon />
                      <span className="sr-only">Mở menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setEditingCategory(category)}
                    >
                      Sửa
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      className="text-red-600 focus:bg-red-50"
                      onClick={() => handleDelete(category.id)}
                    >
                      Xoá
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Render Dialog Sửa nếu có state editingCategory */}
      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
        />
      )}
    </div>
  );
}
