import { CanvasDocumentView } from "./CanvasDocumentView";
import { getDocument } from "@/lib/actions";

export default async function Canvas({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data = null, error = null } = await getDocument({ documentId: id });

  return <CanvasDocumentView initialDocument={data} initialError={error} />;
}
