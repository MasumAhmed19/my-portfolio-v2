import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-10">
      {/* Top border */}
      <div className="border-t border-foreground/30 mb-6"></div>

      {/* Footer content */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left section */}
        <p className="text-sm text-gray-400">
          © {currentYear} <span className="font-medium text-gray-300">Masum Ahmed</span>. All rights reserved.
        </p>

        {/* Right section (social icons) */}
        <div className="flex items-center gap-4 text-gray-400">
          <a
            href="https://github.com/MasumAhmed19"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/masum-ahmed-61b3b8294/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://x.com/Masum_Ahmedd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="mailto:masum.ahmed1328@gmail.com"
            aria-label="Email"
            className="hover:text-white transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
