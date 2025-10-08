import Hero from "@/components/modules/Home/Hero";
import FeaturedProjects from "@/components/modules/Home/Projects";

export default function HomePage() {
  return (
    <div>
      <section>
        <Hero />
      </section>

      <section className="bg-secondary/30 " >
        <div className="max-w-7xl mx-auto px-4 pb-[10vh] ">
          <FeaturedProjects />
        </div>
      </section>

    </div>
  );
}
