import SocialLink from "@/components/shared/SocialLink";
import { Github, Linkedin, Twitter } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-background py-[10vh] sm:py-[12vh] md:py-[15vh]">
      <div className="max-w-4xl mx-auto w-full z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-0">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-center text-center">
          {/* Heading */}
          <div className="text-2xl sm:text-3xl md:text-5xl leading-tight sm:leading-snug md:leading-tight font-light text-foreground">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
              <span className="text-foreground">Hi, I'm</span>

              <div className="relative group">
                <img
                  src="https://i.ibb.co.com/KjN8t2q7/bw.jpg"
                  alt="Masum Ahmed"
                  className="w-52 md:w-16 rounded-full md:border border-gray-400 transition-transform duration-300"
                />
              </div>

              <span className="whitespace-nowrap font-semibold text-primary">
                Masum Ahmed Shanto
              </span>
            </div>

            <span className="text-foreground">
              A Junior{" "}
            </span>

            <span className="text-primary font-semibold">
              Fullstack Developer
            </span>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed px-2 sm:px-0">
            I specialize in modern{" "}
            <span className="text-primary font-medium">Fullstack</span>{" "}
            technologies and comfortable working with the{" "}
            <span className="text-primary font-medium">MERN stack</span>. I
            enjoy solving complex problems and continuously learning new
            technologies. Currently, I'm focusing on{" "}
            <span className="text-primary font-medium">
              Artificial Intelligence (AI)
            </span>{" "}
            and advancing my skills as part of my{" "}
            <span className="text-primary font-medium">
              final-year undergraduate studies
            </span>
            .
          </p>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4 md:gap-5 flex-wrap items-center justify-center mt-2 sm:mt-3">
            <SocialLink
              icon={Twitter}
              name="Twitter"
              to="https://x.com/Masum_Ahmedd"
              iconSize="w-4 h-4"
            />
            <SocialLink
              icon={Linkedin}
              name="LinkedIn"
              to="https://www.linkedin.com/in/masum-ahmed-61b3b8294/"
              iconSize="w-4 h-4 sm:w-5 sm:h-5"
            />
            <SocialLink
              icon={Github}
              name="GitHub"
              to="https://github.com/MasumAhmed19"
              iconSize="w-4 h-4 sm:w-5 sm:h-5"
            />
          </div>

          {/* Button */}
          <div className="flex gap-3 mt-4 sm:mt-5 md:mt-6">
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1SoJVb9FBFxd85KuBbJhl03_Y8UIAqBaN/view"
              className="font-fraunces bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md font-medium transition-all hover:bg-opacity-80 hover:scale-105"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;