import skills from "@/data/skills";
import Image from "next/image";
import React from "react";

const TechStack = () => {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
      <div className="flex items-center justify-between text-md">
        <h2 className="font-medium text-foreground/60 uppercase ">
          Tech Stacks
        </h2>
        <h2 className="flex items-center justify-center uppercase">Skill</h2>
      </div>

        {/* Skill List */}
        <div
          id="project"
          className="flex flex-col items-center justify-between text-left gap-6 pt-10"
        >
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 w-full">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="px-2 py-1 sm:px-2 sm:py-1 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm border-2 border-foreground/80 rounded-sm text-primary w-fit hover:bg-secondary transition-colors duration-200"
              >
                <Image
                  src={skill.icon}
                  width={24}
                  height={24}
                  className="h-4 w-4 sm:h-6 sm:w-6"
                  alt={skill.name}
                />
                <h3 className="text-foreground whitespace-nowrap">
                  {skill.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
