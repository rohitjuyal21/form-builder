import SharedForm from "@/components/SharedForm/SharedForm";

export default async function page({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  return <SharedForm formId={formId} />;
}
