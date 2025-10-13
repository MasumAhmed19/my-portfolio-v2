import { IExperiece } from "@/types";
import ExperienceCard from "../Experience/ExperienceCard";

const ExperienceSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/experience/`);
  const data = await res.json();
  const experiences: IExperiece[] = data?.data;
  // console.log(experiences);

  return (
    <div>
      <div className="max-w-7xl mx-auto py-20 px-4">
        {/* Header */}
        <div className="flex items-center justify-between text-md">
          <h2 className="font-medium text-foreground/60 uppercase ">
            Experience
          </h2>
          <h2 className="flex items-center justify-center uppercase">Skill</h2>
        </div>

        <div>
          {
            experiences.map((el, index)=><ExperienceCard key={index} el={el} />)
          }
        </div>

      </div>
    </div>
  );
};

export default ExperienceSection;
