import React, { useEffect, useRef } from 'react';
import { ArrowRight, FileText, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { Profile } from '../../types';

interface HeroProps {
  profile?: Profile | null;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High performance starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${star.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#A855F7';
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const orbitSkills = [
    { name: 'React', angle: '0deg', radius: '130px' },
    { name: 'Python', angle: '60deg', radius: '130px' },
    { name: 'FastAPI', angle: '120deg', radius: '130px' },
    { name: 'AI / ML', angle: '180deg', radius: '130px' },
    { name: 'PostgreSQL', angle: '240deg', radius: '130px' },
    { name: 'GitHub', angle: '300deg', radius: '130px' },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden">
      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60" />

      {/* Ambient Eclipse Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#7C3AED]/25 via-[#38BDF8]/20 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#A855F7]/30 bg-[#110C25]/80 text-xs text-[#D946EF] font-medium mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{profile?.availability || 'Open for Freelance Projects'}</span>
            <span className="text-[#A1A1AA]">•</span>
            <span className="flex items-center gap-1 text-[#A1A1AA]">
              <MapPin className="w-3 h-3 text-[#38BDF8]" />
              {profile?.location || 'Pune, India'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white leading-[1.1] mb-6">
            Building the Future with{' '}
            <span className="gradient-text drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Intelligent Technology.
            </span>
          </h1>

          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
            I'm <strong className="text-white font-semibold">{profile?.full_name || 'Sandesh Barde'}</strong>, an AI & Full Stack Developer and B.Tech student in Pune, Maharashtra. I engineer scalable web applications, machine learning workflows, and high-performance APIs.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a href="#projects" className="btn-primary inline-flex items-center gap-2 text-sm">
              <span>Explore My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {profile?.resume_url ? (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <span>Download Resume</span>
              </a>
            ) : (
              <span
                title="Upload resume in Admin to enable direct download"
                className="btn-secondary inline-flex items-center gap-2 text-sm opacity-80 cursor-default"
              >
                <FileText className="w-4 h-4 text-[#A855F7]" />
                <span>Resume (Available on Request)</span>
              </span>
            )}

            <a href="#contact" className="btn-secondary text-sm">
              Get in Touch
            </a>
          </div>

          {/* Metrics bar */}
          <div className="mt-12 pt-8 border-t border-[#A855F7]/20 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 text-left">
            <div>
              <div className="text-2xl font-bold text-white font-heading">
                {profile?.projects_count || 6}+
              </div>
              <div className="text-xs text-[#A1A1AA] uppercase tracking-wider mt-0.5">Projects Built</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-heading">
                {profile?.skills_count || 27}
              </div>
              <div className="text-xs text-[#A1A1AA] uppercase tracking-wider mt-0.5">Technologies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-heading">2024–28</div>
              <div className="text-xs text-[#A1A1AA] uppercase tracking-wider mt-0.5">B.Tech AI & DS</div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Portrait with Orbital Rings */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-72 sm:w-80 aspect-[4/5] flex items-center justify-center">
            {/* Glowing Ring Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] via-[#D946EF] to-[#38BDF8] p-[2px] shadow-[0_0_50px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-[#110C25] rounded-[22px] overflow-hidden relative">
                <img
                  src={profile?.avatar_url || '/assets/portrait.jpg'}
                  alt="Sandesh Barde in dark formal suit"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle dark gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B071C] via-[#0B071C]/50 to-transparent" />
                <div className="absolute bottom-4 inset-x-4 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                    Sandesh Barde
                  </span>
                  <span className="block text-[11px] text-[#A1A1AA]">
                    Alard College of Engineering, Pune
                  </span>
                </div>
              </div>
            </div>

            {/* Orbiting Tech Chips */}
            {orbitSkills.map((chip, idx) => (
              <div
                key={chip.name}
                className="hidden sm:flex absolute items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-[#A855F7]/40 text-xs font-medium text-white shadow-lg backdrop-blur-md animate-pulse"
                style={{
                  top: idx === 0 ? '-12px' : idx === 1 ? '30%' : idx === 2 ? '75%' : idx === 3 ? '100%' : idx === 4 ? '70%' : '15%',
                  left: idx === 0 ? '50%' : idx === 1 ? '-25px' : idx === 2 ? '-35px' : idx === 3 ? '40%' : idx === 4 ? '90%' : '85%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                <span>{chip.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
