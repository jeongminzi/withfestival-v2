import Faq from "@/src/components/Faq";
import { listFaq } from "@/src/lib/faq";

export default async function FaqPage() {
  const items = await listFaq();
  return (
    <main className="min-h-screen">
      <Faq items={items} />
    </main>
  );
}
