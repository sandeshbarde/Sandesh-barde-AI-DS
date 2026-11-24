import React, { useState, useEffect } from 'react';
import { Eye, X, ArrowRight, CheckCircle2, AlertTriangle, Layers, GitBranch, Cpu, Award } from 'lucide-react';
import { Project, CaseStudy } from '../../types';
import { api } from '../../lib/api';

interface CaseStudiesSectionProps {
  projects?: Project[];
  selectedSlug?: string;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  projects = [],
  selectedSlug,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync selected slug if triggered externally
  useEffect(() => {
    if (selectedSlug && projects.length > 0) {
      const idx = projects.findIndex((p) => p.slug === selectedSlug);
      if (idx !== -1) {
        setCurrentProjectIndex(idx);
        const el = document.getElementById('cases');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedSlug, projects]);

  const currentProject = projects[currentProjectIndex];

  // Fetch case study details for the active project
  useEffect(() => {
    if (!currentProject) return;
    setIsLoading(true);
    api
      .getCaseStudy(currentProject.slug)
      .then((data) => setCaseStudy(data))
      .catch(() => setCaseStudy(null))
      .finally(() => setIsLoading(false));
  }, [currentProject]);

  // Handle Escape key for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const tabs = [
    { label: 'Overview', icon: Layers },
    { label: 'Architecture', icon: GitBranch },
    { label: 'Development', icon: Cpu },
    { label: 'Features', icon: CheckCircle2 },
    { label: 'Challenges', icon: AlertTriangle },
    { label: 'Results', icon: Award },
  ];

  return (
    <section id="cases" className="py-24 px-6 relative bg-[#0B071C]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#A855F7] mb-2 block">
            05. DEEP DIVE LAB
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Architecture & <span className="gradient-text">case studies.</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-xl mt-3 text-sm">
            Examine system architecture diagrams, problem statements, engineering trade-offs, and verifiable milestones.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Project Selector Rail (Desktop & Touch Scroll) */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
            {projects.map((p, idx) => {
              const isSelected = idx === currentProjectIndex;
              return (
                <button
                  key={p.slug}
                  onClick={() => {
                    setCurrentProjectIndex(idx);
                    setActiveTab('Overview');
                  }}
                  className={`text-left p-4 rounded-xl transition-all border flex items-center justify-between min-w-[260px] lg:min-w-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#7C3AED]/40 to-[#C026D3]/30 border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : 'bg-[#110C25]/80 border-[#A855F7]/20 hover:border-[#38BDF8]/40 hover:bg-[#110C25]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider block mb-0.5">
                      Case Study {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-bold text-white font-heading">{p.title}</h4>
                    <p className="text-[11px] text-[#A1A1AA] line-clamp-1 mt-0.5">{p.tagline}</p>
                  </div>
                  {isSelected && <ArrowRight className="w-4 h-4 text-[#D946EF] hidden sm:block" />}
                </button>
              );
            })}
          </div>

          {/* Right Case Study Detail View */}
          <div className="lg:col-span-8 glass-card p-6 sm:p-8 border border-[#A855F7]/30 min-h-[500px] flex flex-col justify-between">
            {currentProject && (
              <div>
                {/* Header Banner */}
                <div className="border-b border-[#A855F7]/20 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#D946EF] uppercase tracking-wider">
                      Case Study 0{currentProjectIndex + 1} / 0{projects.length}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs text-[#38BDF8] mt-1 font-medium">{currentProject.tagline}</p>
                  </div>

                  {currentProject.github_url && (
                    <a
                      href={currentProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs inline-flex items-center gap-1.5 self-start sm:self-center"
                    >
                      <span>View GitHub ↗</span>
                    </a>
                  )}
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-3">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isTabActive = activeTab === tab.label;
                    return (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isTabActive
                            ? 'bg-[#A855F7]/30 text-white border border-[#A855F7]'
                            : 'text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Panels */}
                {isLoading ? (
                  <div className="py-20 text-center text-sm text-[#A1A1AA] animate-pulse">
                    Loading case study specifications...
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* OVERVIEW TAB */}
                    {activeTab === 'Overview' && (
                      <div className="space-y-6 animate-in fade-in">
                        <div>
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                            Problem Statement
                          </h5>
                          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed bg-[#0B071C]/60 p-4 rounded-xl border border-white/5">
                            {caseStudy?.problem_statement ||
                              'Students and job seekers struggle to understand real-time market demand patterns, trending technical proficiencies, and relevant opportunities in high-growth engineering domains.'}
                          </p>
                        </div>

                        {caseStudy?.objectives && caseStudy.objectives.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                              Project Objectives
                            </h5>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {caseStudy.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-xs text-[#A1A1AA]">
                                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ARCHITECTURE TAB */}
                    {activeTab === 'Architecture' && (
                      <div className="space-y-6 animate-in fade-in">
                        {caseStudy?.architecture_flow?.pipeline ? (
                          <div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                              Data Processing Pipeline
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              {caseStudy.architecture_flow.pipeline.map((stage, idx) => (
                                <div
                                  key={idx}
                                  className="p-3.5 rounded-xl bg-[#080516] border border-[#A855F7]/30 text-center relative group"
                                >
                                  <div className="text-xs font-bold text-white font-heading">{stage.stage}</div>
                                  <div className="text-[11px] text-[#38BDF8] mt-1 font-medium">{stage.tool}</div>
                                </div>
                              ))}
                            </div>

                            {caseStudy.architecture_flow.backend && (
                              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-3">
                                {caseStudy.architecture_flow.backend.map((b, i) => (
                                  <div key={i} className="px-3 py-1.5 rounded-lg bg-[#110C25] border border-[#38BDF8]/30 text-xs text-white">
                                    ⚙️ {b}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Enlarge Diagram Button */}
                            <div className="mt-6 flex justify-end">
                              <button
                                onClick={() => setIsLightboxOpen(true)}
                                className="inline-flex items-center gap-1.5 text-xs text-[#38BDF8] hover:text-white font-medium"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect Pipeline Diagram</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-xs text-[#A1A1AA]">
                            Architecture specifications for this project are currently in production review.
                          </div>
                        )}
                      </div>
                    )}

                    {/* DEVELOPMENT TAB */}
                    {activeTab === 'Development' && (
                      <div className="space-y-4 animate-in fade-in">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                          Verified Technologies & Libraries
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {(caseStudy?.technologies_used || currentProject.technologies).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-lg border border-[#A855F7]/30 bg-[#110C25] text-xs font-medium text-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* FEATURES TAB */}
                    {activeTab === 'Features' && (
                      <div className="space-y-4 animate-in fade-in">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                          Key Capabilities
                        </h5>
                        <ul className="space-y-2">
                          {(caseStudy?.key_features || [currentProject.description]).map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-[#A1A1AA]">
                              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CHALLENGES TAB */}
                    {activeTab === 'Challenges' && (
                      <div className="space-y-4 animate-in fade-in">
                        {caseStudy?.challenges_solutions && caseStudy.challenges_solutions.length > 0 ? (
                          caseStudy.challenges_solutions.map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-[#080516] border border-[#A855F7]/30 space-y-2">
                              <div className="text-xs font-bold text-[#D946EF] flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Challenge: {item.challenge}</span>
                              </div>
                              <div className="text-xs text-[#A1A1AA] pl-5">
                                <strong>Resolution:</strong> {item.solution}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-xs text-[#A1A1AA]">
                            No major unhandled blockers encountered during initial development pass.
                          </div>
                        )}
                      </div>
                    )}

                    {/* RESULTS TAB */}
                    {activeTab === 'Results' && (
                      <div className="space-y-4 animate-in fade-in">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                          Verified Project Outcome
                        </h5>
                        <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed bg-[#0B071C]/60 p-4 rounded-xl border border-white/5">
                          {caseStudy?.outcomes_results ||
                            'Deployed as an open-source technical prototype with verified repository tests and clean component modularity.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#110C25] border border-[#A855F7] rounded-2xl overflow-hidden p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#A855F7]/30 mb-4">
              <h4 className="text-base font-bold text-white font-heading">
                {currentProject?.title} — Architecture Pipeline
              </h4>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg border border-white/20 text-[#A1A1AA] hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center p-4 bg-[#050014] rounded-xl border border-white/5">
              <img
                src="/assets/joblens-architecture.jpg"
                alt="Architecture pipeline diagram"
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 text-center text-xs text-[#A1A1AA]">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Escape</kbd> or click outside to close.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
