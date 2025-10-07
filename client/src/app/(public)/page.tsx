import Hero from "@/components/modules/Home/Hero";
import FeaturedProjects from "@/components/modules/Home/Projects";

export default function HomePage() {
  return (
    <div>
      <section>
        <Hero />
      </section>

      <section className="max-w-4xl mx-auto px-4 py-[10vh]">
        <FeaturedProjects />
      </section>

    </div>
  );
}
