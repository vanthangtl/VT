// actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// Hàm bổ trợ để kiểm tra và lấy thông tin User (tránh lặp code)
async function getAuthenticatedUser(supabase: any) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Bạn cần đăng nhập để thực hiện chức năng này");
  }
  return user;
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const name = formData.get("name") as string;
  const budget = Number(formData.get("budget"));

  if (!name) throw new Error("Tên danh mục không được để trống");

  const { error } = await supabase.from("categories").insert({
    name,
    budget,
    user_id: user.id,
  });

  if (error) {
    console.error("Lỗi Supabase thực tế:", error.message);
    throw new Error(`Không thể lưu dữ liệu: ${error.message}`);
  }

  revalidatePath("/");
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();
  // 1. Kiểm tra đăng nhập
  const user = await getAuthenticatedUser(supabase);

  const name = formData.get("name") as string;
  const budget = Number(formData.get("budget"));

  if (!name) throw new Error("Tên danh mục không được để trống");

  // 2. Cập nhật và thêm điều kiện .eq("user_id", user.id) để đảm bảo chính chủ mới sửa được
  const { error } = await supabase
    .from("categories")
    .update({ name, budget })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Lỗi khi cập nhật danh mục:", error.message);
    throw new Error(`Không thể lưu dữ liệu: ${error.message}`);
  }

  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  // 1. Kiểm tra đăng nhập
  const user = await getAuthenticatedUser(supabase);

  // 2. Thêm điều kiện .eq("user_id", user.id) để đảm bảo chính chủ mới xóa được
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Lỗi khi xóa danh mục:", error.message);
    throw new Error(`Không thể xóa dữ liệu: ${error.message}`);
  }

  revalidatePath("/");
}
