// app/(main)/account/page.tsx
import { createClient } from "@/utils/supabase/client"; // Import Supabase Server Client
import { AccountManager } from "./account-manager";



export default async function AccountPage() {
  const supabase = createClient();

  // Fetch dữ liệu trực tiếp trên Server
  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Lỗi khi fetch accounts:", error);
  }

  return (
    <div className="p-4">
      {/* Truyền dữ liệu ban đầu vào Client Component để quản lý UI/State */}
      <AccountManager initialAccounts={accounts || []} />
    </div>
  );
}
