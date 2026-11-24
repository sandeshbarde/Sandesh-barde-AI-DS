import React from 'react';
import { Check, ArrowRight, Compass, FileCode, Hammer, ShieldCheck, Send } from 'lucide-react';
import { Service } from '../../types';

interface ServicesSectionProps {
  services?: Service[];
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services = [],
  onSelectServiceForQuote,
}) => {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understanding requirements, audience, and scope.', icon: Compass },
    { num: '02', title: 'Planning', desc: 'Architecting schemas, APIs, and wireframe flows.', icon: FileCode },
    { num: '03', title: 'Development', desc: 'Writing clean, typed, modular full-stack code.', icon: Hammer },
    { num: '04', title: 'Testing', desc: 'Running unit tests, validation, and browser QA.', icon: ShieldCheck },
    { num: '05', title: 'Delivery', desc: 'Deploying to cloud infrastructure with handover.', icon: Send },
  ];

  return (
    <section id="services" className="py-24 px-6 relative bg-[#0B071C]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#D946EF] mb-2 block">
            07. SERVICES OFFERED
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Engineering services & <span className="gradient-text">capabilities.</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-xl mt-3 text-sm">
            Available for client contract work, modern web application development, and AI engineering.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              className="glass-card p-8 flex flex-col justify-between border border-[#A855F7]/30 hover:border-[#38BDF8]/60 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                    Service 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#A1A1AA]">{svc.tech_stack}</span>
                </div>

                <h3 className="text-2xl font-bold text-white font-heading mb-2">{svc.title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">{svc.tagline}</p>

                <div className="space-y-2.5 mb-8">
                  {svc.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-white">
                      <div className="w-4 h-4 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#10B981]" />
                      </div>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#A855F7]/20 flex items-center justify-between">
                <span className="text-xs text-[#A1A1AA]">Custom Milestones</span>
                <button
                  onClick={() => onSelectServiceForQuote?.(svc.title)}
                  className="btn-secondary text-xs inline-flex items-center gap-2 group hover:border-[#D946EF]"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Step Process */}
        <div className="pt-12 border-t border-[#A855F7]/20">
          <h3 className="text-xl font-bold text-white font-heading mb-8 text-center sm:text-left">
            Freelance Project Workflow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="glass-card p-5 border border-[#A855F7]/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#A855F7] font-mono">{step.num}</span>
                    <Icon className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-heading mb-1">{step.title}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
