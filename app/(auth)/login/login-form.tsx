// app/login/login-form.tsx
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Import action đăng nhập bạn vừa tạo
import { login } from "./actions";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>
            Nhập thông tin tài khoản để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Gắn Server Action vào form */}
          <form action={login}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email" // Bắt buộc phải có name
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                </div>
                <Input
                  id="password"
                  name="password" // Bắt buộc phải có name
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Đăng nhập
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
