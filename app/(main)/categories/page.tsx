// page.tsx
// 1. Đổi đường dẫn import sang file server
import { createClient } from "@/utils/supabase/server";
import { TableCategories } from "./table-category";

export default async function CategoriesPage() {
  // 2. Thêm await ở đây
  const supabase = await createClient();

  // Fetch dữ liệu từ Supabase
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <TableCategories categories={categories || []} />
    </div>
  );
}
