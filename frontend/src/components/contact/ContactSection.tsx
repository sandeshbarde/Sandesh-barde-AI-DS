import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Briefcase, Copy, Check, Send, AlertCircle, Sparkles } from 'lucide-react';
import { Profile } from '../../types';
import { api } from '../../lib/api';

interface ContactSectionProps {
  profile?: Profile | null;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full Stack Web Development');
  const [budget, setBudget] = useState('$1,000 - $3,000');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Sync preselected service from Services section
  useEffect(() => {
    if (preselectedService) {
      setProjectType(preselectedService);
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [preselectedService]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!name.trim()) {
      setSubmitStatus({ success: false, message: 'Please enter your name.' });
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus({ success: false, message: 'Please enter a valid email address.' });
      return;
    }
    if (message.trim().length < 10) {
      setSubmitStatus({ success: false, message: 'Please describe your inquiry in at least 10 characters.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitInquiry({
        name,
        email,
        project_type: projectType,
        budget,
        message,
        hp: honeypot,
      });

      setSubmitStatus({
        success: true,
        message: res.message || 'Thank you! Your inquiry has been sent to Sandesh Barde.',
      });

      // Clear form on confirmed success
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setSubmitStatus({
        success: false,
        message: err.message || 'Failed to submit inquiry. Please try again or reach out directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = [
    'Full Stack Web Development',
    'AI Integration & Automation',
    'AI & ML Application Development',
    'Technical Consulting',
    'General Inquiry',
  ];

  const budgetTiers = [
    'Under $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000+',
    'Flexible / Milestone Based',
  ];

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#38BDF8] mb-2 block">
            08. CONTACT & INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Let's build something <span className="gradient-text">exceptional.</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-xl mt-3 text-sm">
            Have a project in mind, an opportunity to discuss, or an engineering question? Send an inquiry directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Copy Buttons */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-6 border border-[#A855F7]/30 space-y-6">
              <h3 className="text-lg font-bold text-white font-heading">Get in Touch</h3>

              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080516] border border-[#A855F7]/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#A1A1AA]">Email Address</span>
                    <span className="text-xs font-semibold text-white">
                      {profile?.email || 'sandeshbarde2214@gmail.com'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(profile?.email || 'sandeshbarde2214@gmail.com', 'email')}
                  className="p-1.5 rounded-lg border border-white/10 text-[#A1A1AA] hover:text-white"
                  title="Copy email to clipboard"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080516] border border-[#A855F7]/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#A1A1AA]">Phone (Direct)</span>
                    <span className="text-xs font-semibold text-white">
                      {profile?.phone || '+91 9850751835'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(profile?.phone || '+91 9850751835', 'phone')}
                  className="p-1.5 rounded-lg border border-white/10 text-[#A1A1AA] hover:text-white"
                  title="Copy phone to clipboard"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#080516] border border-[#A855F7]/20">
                <div className="w-8 h-8 rounded-lg bg-[#D946EF]/10 flex items-center justify-center text-[#D946EF]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#A1A1AA]">Current Location</span>
                  <span className="text-xs font-semibold text-white">
                    {profile?.location || 'Pune, Maharashtra, India'}
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#080516] border border-[#A855F7]/20">
                <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#A1A1AA]">Availability Status</span>
                  <span className="text-xs font-semibold text-[#10B981]">
                    {profile?.availability || 'Open for Freelance Projects'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real API-Connected Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 border border-[#A855F7]/30 space-y-5">
              <h3 className="text-lg font-bold text-white font-heading mb-4">Send an Inquiry</h3>

              {/* Status Message Alert */}
              {submitStatus && (
                <div
                  className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                    submitStatus.success
                      ? 'bg-[#10B981]/10 border border-[#10B981]/40 text-[#10B981]'
                      : 'bg-[#EF4444]/10 border border-[#EF4444]/40 text-[#EF4444]'
                  }`}
                >
                  {submitStatus.success ? <Check className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              {/* Hidden Honeypot field for bot mitigation */}
              <input
                type="text"
                name="hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-semibold text-white mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080516] border border-[#A855F7]/30 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-semibold text-white mb-1.5">
                    Your Email *
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080516] border border-[#A855F7]/30 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              {/* Project Type & Budget Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-type" className="block text-xs font-semibold text-white mb-1.5">
                    Project Domain / Service *
                  </label>
                  <select
                    id="inquiry-type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080516] border border-[#A855F7]/30 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc} value={svc} className="bg-[#0B071C] text-white">
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry-budget" className="block text-xs font-semibold text-white mb-1.5">
                    Target Budget (Optional)
                  </label>
                  <select
                    id="inquiry-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080516] border border-[#A855F7]/30 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    {budgetTiers.map((tier) => (
                      <option key={tier} value={tier} className="bg-[#0B071C] text-white">
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message with Character Counter */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="inquiry-msg" className="block text-xs font-semibold text-white">
                    Project Scope & Details *
                  </label>
                  <span className="text-[11px] text-[#A1A1AA] font-mono">
                    {message.length} / 500 characters
                  </span>
                </div>
                <textarea
                  id="inquiry-msg"
                  required
                  rows={4}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your application goals, timeline, and deliverables..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080516] border border-[#A855F7]/30 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38BDF8] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 inline-flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Recording Inquiry...</span>
                ) : (
                  <>
                    <span>Send Message to Sandesh</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[11px] text-[#A1A1AA]">
                Stored securely in PostgreSQL. Direct email fallback:{' '}
                <a
                  href={`mailto:${profile?.email || 'sandeshbarde2214@gmail.com'}`}
                  className="text-[#38BDF8] underline"
                >
                  {profile?.email || 'sandeshbarde2214@gmail.com'}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
