import { getDocument } from "@/lib/actions";
import { BasketDocumentView } from "./BasketDocumentView";

export default async function Basket({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data = null, error = null } = await getDocument({ documentId: id });

  return <BasketDocumentView initialDocument={data} initialError={error} />;
}
