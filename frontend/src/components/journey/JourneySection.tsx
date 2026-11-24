import React, { useRef } from 'react';
import { Briefcase, GraduationCap, Award, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { ExperienceItem, EducationItem, Certificate } from '../../types';

interface JourneySectionProps {
  experience?: ExperienceItem[];
  education?: EducationItem[];
  certificates?: Certificate[];
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  experience = [],
  education = [],
  certificates = [],
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const offset = direction === 'left' ? -280 : 280;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="journey" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#38BDF8] mb-2 block">
            06. MY JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Experience, education & <span className="gradient-text">certifications.</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-xl mt-3 text-sm">
            Milestones across software engineering, academic foundations, and specialized certifications.
          </p>
        </div>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Experience Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-[#A855F7]" />
              <span>Professional Experience</span>
            </h3>

            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id} className="glass-card p-6 border border-[#A855F7]/25 relative">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="text-base font-bold text-white font-heading">{item.title}</h4>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#D946EF]/40 bg-[#D946EF]/10 text-[#D946EF] whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#38BDF8] mb-3">{item.organization}</div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-[#38BDF8]" />
              <span>Academic Foundations</span>
            </h3>

            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.id} className="glass-card p-6 border border-[#A855F7]/25">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="text-base font-bold text-white font-heading">{item.institution}</h4>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8] whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white mb-2">{item.degree}</div>
                  {item.details && <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.details}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Carousel Strip */}
        <div className="pt-12 border-t border-[#A855F7]/20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#D946EF]" />
              <h3 className="text-xl font-bold text-white font-heading">
                Professional Certifications
              </h3>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Previous certificates"
                className="p-2 rounded-lg border border-[#A855F7]/30 text-white hover:border-[#38BDF8] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Next certificates"
                className="p-2 rounded-lg border border-[#A855F7]/30 text-white hover:border-[#38BDF8] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex items-stretch gap-4 overflow-x-auto pb-4 scrollbar-none snap-x"
          >
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="glass-card p-5 min-w-[260px] sm:min-w-[280px] max-w-[280px] flex flex-col justify-between shrink-0 snap-start border border-[#A855F7]/25"
              >
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-[#D946EF] mb-2">
                    {cert.issuer}
                  </div>
                  <h4 className="text-sm font-bold text-white font-heading line-clamp-2">
                    {cert.title}
                  </h4>
                </div>

                {cert.credential_url ? (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 pt-3 border-t border-white/10 text-xs text-[#38BDF8] inline-flex items-center gap-1 hover:text-white"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#A1A1AA]">
                    Verified Milestone
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
