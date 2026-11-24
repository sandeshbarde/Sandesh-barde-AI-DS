import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertOctagon } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050014] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-[#7C3AED]/20 to-[#38BDF8]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 border border-[#A855F7]/30 text-center relative z-10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#110C25] border border-[#A855F7]/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <AlertOctagon className="w-8 h-8 text-[#D946EF]" />
        </div>

        <h1 className="text-5xl font-bold font-heading text-white mb-2">404</h1>
        <h2 className="text-lg font-bold font-heading text-[#38BDF8] mb-3">Endpoint Not Found</h2>
        <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
          The requested route does not exist or has been relocated in the portfolio architecture.
        </p>

        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2 text-xs py-2.5 px-6 mx-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    </div>
  );
};
