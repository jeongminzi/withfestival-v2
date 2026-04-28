import AppleCardsCarousel from "@/src/components/AppleCardsCarousel";
import ChatConversation from "@/src/components/ChatConversation";
import Hero from "@/src/components/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div id="hero-next">
        <AppleCardsCarousel />
        <ChatConversation />
      </div>
    </main>
  );
}
