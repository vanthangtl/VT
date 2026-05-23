"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// Sửa đường dẫn này trỏ tới file server.ts của bạn
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Xử lý lỗi (ví dụ trả về trang login kèm tham số báo lỗi)
    return redirect("/login?error=Invalid_Credentials");
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
