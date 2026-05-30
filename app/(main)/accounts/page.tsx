// app/(main)/account/page.tsx
import { createClient } from "@/utils/supabase/server"; // Đã đổi thành Server Client
import { AccountManager } from "./account-manager";

export const revalidate = 0; // Đảm bảo dữ liệu luôn mới nhất không bị cache sai mục đích

export default async function AccountPage() {
  const supabase = await createClient();

  // Lấy thông tin user hiện tại để đảm bảo tính bảo mật
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="p-4">Vui lòng đăng nhập để xem ví tài khoản.</div>;
  }

  // Fetch dữ liệu trực tiếp trên Server theo đúng user_id
  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Lỗi khi fetch accounts:", error);
  }

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      {/* Truyền cả userId xuống để Client Component dùng khi Thêm mới */}
      <AccountManager initialAccounts={accounts || []} userId={user.id} />
    </div>
  );
}
