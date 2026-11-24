import React, { useState } from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsSectionProps {
  projects?: Project[];
  onSelectProjectForCaseStudy?: (slug: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = [],
  onSelectProjectForCaseStudy,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'AI / ML', 'Full Stack', 'Cybersecurity', 'Web Development'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#D946EF] mb-2 block">
              04. FEATURED WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Selected projects & <span className="gradient-text">applications.</span>
            </h2>
            <p className="text-[#A1A1AA] max-w-xl mt-3 text-sm">
              Explore intelligent systems, machine learning pipelines, and full-stack web platforms built by Sandesh Barde.
            </p>
          </div>

          <div className="text-xs text-[#A1A1AA] px-4 py-2 rounded-full border border-[#A855F7]/25 glass-card self-start md:self-auto">
            Showing <span className="text-[#D946EF] font-bold">{filteredProjects.length}</span> of {projects.length} Projects
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#A855F7]/20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedFilter === cat
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white shadow-[0_0_20px_rgba(192,38,211,0.5)]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#110C25]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, idx) => (
            <article
              key={p.slug}
              className="glass-card flex flex-col justify-between overflow-hidden group hover:border-[#38BDF8]/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#110C25]">
                <img
                  src={p.image_url || '/assets/projects/joblens.jpg'}
                  alt={`${p.title} screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#080516]/80 backdrop-blur-md border border-[#A855F7]/40 text-[11px] font-bold text-[#38BDF8]">
                  #{String(idx + 1).padStart(2, '0')}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#080516]/80 backdrop-blur-md border border-[#A855F7]/40 text-[10px] font-medium text-[#A1A1AA]">
                  {p.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1 group-hover:text-[#38BDF8] transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-xs font-medium text-[#D946EF] mb-3">{p.tagline}</div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4 line-clamp-3">
                    {p.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2.5 py-0.5 rounded-full border border-[#A855F7]/30 bg-[#110C25] text-[#A1A1AA]"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.technologies.length > 4 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#A855F7]/20 text-[#A1A1AA]">
                        +{p.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#A855F7]/20 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      {p.github_url && (
                        <a
                          href={p.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-[#A855F7]/30 text-white hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors"
                          title="View Source Code on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {p.demo_url ? (
                        <a
                          href={p.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#10B981]/40 text-[#10B981] hover:bg-[#10B981]/10 transition-colors font-medium"
                          title="Open Live Deployment"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span
                          className="px-2.5 py-1.5 rounded-lg border border-white/10 text-white/40 text-[11px]"
                          title="Live deployment coming soon"
                        >
                          Demo in Progress
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectProjectForCaseStudy?.(p.slug)}
                      className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-white font-medium transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
