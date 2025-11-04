import { CreateNewPassword } from "@/libs/shared/components/client-components/ResetPassword";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <CreateNewPassword id={id} />
    </>
  );
}
