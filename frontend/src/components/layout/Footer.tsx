import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';
import { Profile } from '../../types';

interface FooterProps {
  profile?: Profile | null;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#A855F7]/20 bg-[#080516] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/sb-logo.png"
            alt="Sandesh Barde Emblem"
            className="h-9 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          />
          <div>
            <span className="block text-sm font-bold font-heading text-white tracking-wide">
              {profile?.full_name || 'Sandesh Barde'}
            </span>
            <span className="block text-xs text-[#A1A1AA]">
              Building intelligent digital experiences.
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A1A1AA]">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="/admin/login" className="text-xs text-[#A855F7]/70 hover:text-[#A855F7]">Admin</a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#A855F7]/30 text-xs text-white hover:border-[#38BDF8] hover:shadow-[0_0_12px_rgba(56,189,248,0.4)] transition-all"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#A855F7]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A1AA]">
        <p>© {new Date().getFullYear()} Sandesh Barde. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Pune, Maharashtra, India</span>
          <span>•</span>
          <span>B.Tech AI & Data Science</span>
        </p>
      </div>
    </footer>
  );
};
