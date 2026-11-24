import React from 'react';
import { Code2, Brain, Cpu, Rocket, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { Profile } from '../../types';

interface AboutSectionProps {
  profile?: Profile | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const focusAreas = [
    {
      title: 'Full Stack Development',
      desc: 'Architecting fast, responsive React applications paired with robust FastAPI and Node.js backends.',
      icon: Code2,
      accent: 'text-[#38BDF8]',
    },
    {
      title: 'Artificial Intelligence & ML',
      desc: 'Developing predictive models, data extraction pipelines, and NLP applications using Python and Hugging Face.',
      icon: Brain,
      accent: 'text-[#A855F7]',
    },
    {
      title: 'Generative AI & LLMs',
      desc: 'Integrating language models, vector embeddings via ChromaDB, and context retrieval workflows.',
      icon: Cpu,
      accent: 'text-[#D946EF]',
    },
    {
      title: 'Freelance & Production Code',
      desc: 'Delivering end-to-end client applications from discovery and wireframing through cloud deployment.',
      icon: Rocket,
      accent: 'text-[#10B981]',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#D946EF] mb-2 block">
            02. ABOUT ME
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Driven by curiosity, powered by{' '}
            <span className="gradient-text">intelligent code.</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-2xl mt-4 text-base leading-relaxed">
            I am a full-stack engineer and Artificial Intelligence student who bridges the gap between deep machine learning concepts and production-grade software engineering.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio & Status Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mb-6">
              {/* Outer Glowing Ring Ambient Aura */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#8B5CF6]/30 via-[#D946EF]/25 to-[#38BDF8]/30 blur-lg opacity-75 animate-pulse pointer-events-none" />

              {/* Floating Tech Badges (Matching Hero Orbit) */}
              <div className="absolute -top-3 -left-3 z-20 px-3 py-1 rounded-xl bg-[#110C25]/95 border border-[#38BDF8]/60 shadow-[0_0_18px_rgba(56,189,248,0.5)] text-xs font-bold text-[#38BDF8] flex items-center gap-1.5 animate-[bounce_4s_infinite]">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
                React
              </div>
              <div className="absolute -top-3 -right-3 z-20 px-3 py-1 rounded-xl bg-[#110C25]/95 border border-[#A855F7]/60 shadow-[0_0_18px_rgba(168,85,247,0.5)] text-xs font-bold text-white flex items-center gap-1.5 animate-[bounce_5s_infinite]">
                <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                AI / ML
              </div>
              <div className="absolute -bottom-3 -right-2 z-20 px-3 py-1 rounded-xl bg-[#110C25]/95 border border-[#10B981]/60 shadow-[0_0_18px_rgba(16,185,129,0.5)] text-xs font-bold text-[#10B981] flex items-center gap-1.5 animate-[bounce_4.5s_infinite]">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Full Stack
              </div>

              {/* Main Presentation Showcase Card */}
              <div className="glass-card overflow-hidden border border-[#A855F7]/40 group relative rounded-2xl shadow-[0_0_35px_rgba(168,85,247,0.35)] hover:border-[#A855F7]/80 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#110C25]">
                  <img
                    src="/assets/about-presentation.png"
                    alt="Sandesh Barde presenting the ARES Voice AI System"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B071C] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-bold text-white tracking-wide flex items-center gap-1.5 font-heading">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      Live Presentation: ARES Voice AI
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#050014]/80 text-[#38BDF8] border border-[#38BDF8]/30">
                      R&D Showcase
                    </span>
                  </div>
                </div>
              </div>
            </div>
              <div className="glass-card p-6 border border-[#A855F7]/25">
              <h3 className="text-xl font-bold text-white font-heading mb-4">Background & Education</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                Currently pursuing a <strong>B.Tech in Artificial Intelligence & Data Science</strong> at <strong>Alard College of Engineering, Pune</strong> (2024–2028).
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                My work centers on designing intuitive interfaces, engineering robust REST APIs, and training machine learning systems to automate real-world business and research challenges.
              </p>

              <div className="mt-6 pt-6 border-t border-[#A855F7]/20 space-y-3 text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
                  <span>Alard College of Engineering, Pune (2024–2028)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#A855F7]" />
                  <span>{profile?.location || 'Pune, Maharashtra, India'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-[#10B981]" />
                  <span className="text-white font-medium">{profile?.availability || 'Available for Freelance Projects'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#110C25] border border-[#A855F7]/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <Icon className={`w-5 h-5 ${area.accent}`} />
                    </div>
                    <h4 className="text-base font-bold text-white font-heading mb-2">{area.title}</h4>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{area.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
