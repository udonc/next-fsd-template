import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";
import { ArchitectureOverview } from "./architecture-overview";
import { HeroSection } from "./hero-section";
import { TechStackOverview } from "./tech-stack-overview";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ArchitectureOverview />
        <TechStackOverview />
      </main>
      <Footer />
    </>
  );
}
