import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background py-35 px-6">
      <section className="max-w-7xl mx-auto space-y-10 px-4">
        {/* Intro */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
              Hey, I’m <span className="text-primary">Masum Ahmed</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              I’m a Computer Science student at{" "}
              <span className="font-medium text-foreground">BUBT</span> who
              loves solving problems and bringing ideas to life through code. My
              path into tech wasn’t a straight one — I actually began studying{" "}
              <span className="font-medium text-foreground">
                Textile Engineering at BUTEX
              </span>
              , but I quickly realized my curiosity belonged in computer
              science. After{" "}
              <span className="font-medium text-foreground">
                1.5 years of focused learning
              </span>
              , I made the leap — and it changed everything.
            </p>
            <p className="italic text-foreground bg-primary/10 border-l-4 border-primary p-3 rounded-r-lg">
              “That journey taught me that real growth starts outside your
              comfort zone.”
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Now, as a{" "}
              <span className="font-medium text-foreground">
                6th-semester CSE student
              </span>
              , I spend most of my time diving into data structures, algorithms,
              and system design. On the practical side, I build web apps using{" "}
              <span className="text-primary font-medium">
                React, Node.js, MongoDB, Prisma,
              </span>{" "}
              and <span className="text-primary font-medium">TypeScript</span>.
              I’ve completed the{" "}
              <span className="font-medium text-foreground">
                Programming Hero Full-Stack Web Development course
              </span>{" "}
              and developed projects with JWT authentication, clean
              architecture, and role-based access. Lately, I’ve been exploring{" "}
              <span className="font-medium text-foreground">AI</span> and its
              intersection with web systems.
            </p>
          </div>
        </div>

        {/* Hobby / Running */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Beyond Code
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            When I’m not coding, I’m probably running. It started as a way to
            clear my head — now it’s become a big part of who I am. I’ve
            completed runs from{" "}
            <span className="font-medium text-foreground">7.5 km</span> to{" "}
            <span className="font-medium text-foreground">
              21.21 km (Half Marathon)
            </span>
            , and I’m training for another one this year. Running keeps me
            disciplined, patient, and focused — the same mindset I bring into
            development.
          </p>
          <p className="italic text-foreground bg-secondary/30 border-l-4 border-primary p-3 rounded-r-lg">
            “Every long run reminds me that persistence beats speed — in both
            life and code.”
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-48 md:h-92 overflow-hidden rounded-md">
              <Image
                src="https://res.cloudinary.com/do0abdlxo/image/upload/v1760384579/megacity_run_rqoevc.jpg"
                alt="Megacity Run"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-48 md:h-92  overflow-hidden rounded-md">
              <Image
                src="https://res.cloudinary.com/do0abdlxo/image/upload/v1760384579/half_marathon_medal_whq23f.jpg"
                alt="Half Marathon Medal"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-48 md:h-92 overflow-hidden rounded-md">
              <Image
                src="https://res.cloudinary.com/do0abdlxo/image/upload/v1760384578/half_marathon_bglytb.jpg"
                alt="Half Marathon"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-48 md:h-92 overflow-hidden rounded-md">
              <Image
                src="https://res.cloudinary.com/do0abdlxo/image/upload/v1760384578/oxfam_run_w3qop8.jpg"
                alt="Oxfam Run"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            My goal is simple — to keep learning, keep building, and contribute
            to projects that make a real impact. I’m drawn to teams that value
            curiosity, collaboration, and meaningful innovation. If that sounds
            like you — let’s connect.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
