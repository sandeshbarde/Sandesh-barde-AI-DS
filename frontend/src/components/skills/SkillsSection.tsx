import React, { useState } from 'react';
import { Layers, Terminal, Sparkles, Database, Wrench } from 'lucide-react';
import { SkillCategory } from '../../types';

interface SkillsSectionProps {
  categories?: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories = [] }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categoryIcons: Record<string, any> = {
    Frontend: Layers,
    Backend: Terminal,
    'AI / ML': Sparkles,
    Database: Database,
    'Tools & Platforms': Wrench,
  };

  const allSkills = categories.flatMap((cat) => cat.skills.map((s) => ({ ...s, categoryName: cat.name })));

  const displayedSkills =
    activeTab === 'All'
      ? allSkills
      : allSkills.filter((s) => s.categoryName === activeTab);

  const tabs = ['All', ...categories.map((c) => c.name)];

  return (
    <section id="skills" className="py-24 px-6 relative bg-[#0B071C]/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#38BDF8] mb-2 block">
              03. TECHNICAL EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Core technologies & <span className="gradient-text">toolchains.</span>
            </h2>
            <p className="text-[#A1A1AA] max-w-xl mt-3 text-sm">
              A curated stack of modern languages, frameworks, and AI toolsets I actively work with.
            </p>
          </div>

          <div className="text-xs text-[#A1A1AA] px-4 py-2 rounded-full border border-[#A855F7]/25 glass-card self-start md:self-auto">
            <span className="text-[#38BDF8] font-bold">{allSkills.length}</span> Verified Technologies
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#A855F7]/20">
          {tabs.map((tab) => {
            const Icon = categoryIcons[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white shadow-[0_0_20px_rgba(192,38,211,0.5)]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#110C25]'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedSkills.map((skill) => (
            <div
              key={`${skill.categoryName}-${skill.name}`}
              className="glass-card p-5 border border-[#A855F7]/20 hover:border-[#38BDF8]/60 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors font-heading">
                  {skill.name}
                </h4>
                <span className="text-[10px] uppercase font-semibold text-[#A855F7] tracking-wider px-2 py-0.5 rounded bg-[#110C25] border border-[#A855F7]/20">
                  {skill.categoryName}
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
