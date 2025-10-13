import Hero from "@/components/modules/Home/Hero";
import FeaturedProjects from "@/components/modules/Home/FeaturedProjects";
import TechStack from "@/components/modules/Home/TechStack";
import ExperienceSection from "@/components/modules/Home/ExperienceSection";
import FeaturedBlog from "@/components/modules/Home/FeaturedBlog";

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

       <section className="" >
        <div className="px-4 pb-[4vh]">
          <ExperienceSection />
        </div>
      </section>

      <section className="" >
        <div className="px-4 pb-[4vh]">
          <FeaturedBlog />
        </div>
      </section>

      <section className="" >
        <div className="px-4 pb-[10vh]">
          <TechStack />
        </div>
      </section>
    </div>
  );
}
