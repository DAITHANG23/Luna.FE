import { ReservationItem } from "@/libs/shared/components/client-components/ReservationHistory";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <ReservationItem id={id} />
    </>
  );
}
