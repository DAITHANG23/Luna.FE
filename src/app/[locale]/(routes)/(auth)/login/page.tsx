import LoginForm from "@/libs/shared/components/client-components/login/LoginForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
