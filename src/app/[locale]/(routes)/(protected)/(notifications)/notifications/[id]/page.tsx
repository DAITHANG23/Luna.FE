import { NotificationDetail } from "@/libs/shared/components/client-components/Notifications";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <NotificationDetail id={id} />
    </div>
  );
}
