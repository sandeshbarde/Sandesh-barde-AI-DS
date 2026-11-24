import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Instagram } from 'lucide-react';
import { Profile } from '../../types';

interface NavbarProps {
  profile?: Profile | null;
}

export const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'cases', 'journey', 'services', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'Experience', href: '#journey' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-6xl mx-auto glass-card py-3 px-6 flex items-center justify-between border border-[#A855F7]/30 bg-[#0B071C]/80 backdrop-blur-md rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Logo Lockup */}
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src="/assets/sb-logo.png"
            alt="Sandesh Barde Emblem"
            className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-transform"
          />
          <div className="hidden sm:block">
            <span className="block text-sm font-bold tracking-tight text-white font-heading">
              {profile?.full_name || 'Sandesh Barde'}
            </span>
            <span className="block text-xs text-[#38BDF8] font-medium">
              {profile?.headline || 'AI & Full Stack Developer'}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors py-1 border-b-2 font-medium ${
                activeSection === link.href.substring(1)
                  ? 'text-white border-[#D946EF] shadow-[0_4px_12px_rgba(217,70,239,0.5)]'
                  : 'text-[#A1A1AA] border-transparent hover:text-white hover:border-[#A855F7]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons & Admin Shortcut */}
        <div className="hidden md:flex items-center gap-3 border-l border-[#A855F7]/30 pl-4">
          {profile?.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-full border border-[#A855F7]/30 text-[#A1A1AA] hover:text-white hover:border-[#38BDF8] hover:shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {profile?.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full border border-[#A855F7]/30 text-[#A1A1AA] hover:text-white hover:border-[#38BDF8] hover:shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {profile?.instagram_url && (
            <a
              href={profile.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-2 rounded-full border border-[#A855F7]/30 text-[#A1A1AA] hover:text-white hover:border-[#D946EF] hover:shadow-[0_0_12px_rgba(217,70,239,0.5)] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="lg:hidden p-2 rounded-lg border border-[#A855F7]/30 text-white hover:border-[#D946EF]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed top-20 left-4 right-4 glass-card border border-[#A855F7]/40 bg-[#0B071C]/95 p-6 rounded-2xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 border-b border-[#A855F7]/20 ${
                activeSection === link.href.substring(1) ? 'text-[#38BDF8]' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#38BDF8]">
                <Github className="w-5 h-5" />
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#38BDF8]">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {profile?.instagram_url && (
              <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D946EF]">
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
