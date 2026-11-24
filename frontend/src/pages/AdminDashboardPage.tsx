import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield, LogOut, MessageSquare, FolderGit2, Wrench, User, Download,
  CheckCircle, Clock, Trash2, ExternalLink, Save, ArrowLeft
} from 'lucide-react';
import { api } from '../lib/api';
import { AdminStats, Inquiry, Project, Profile } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'projects' | 'profile'>('inquiries');

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);

  // Profile State
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  // Verify authentication on mount
  useEffect(() => {
    api
      .getMe()
      .then((user) => {
        setCurrentUser(user);
        loadDashboardData();
      })
      .catch(() => {
        navigate('/admin/login');
      });
  }, [navigate]);

  const loadDashboardData = () => {
    api.getAdminStats().then(setStats).catch(() => {});
    api.getAdminInquiries().then(setInquiries).catch(() => {});
    api.getAdminProjects().then(setProjects).catch(() => {});
    api.getAdminProfile().then(setProfile).catch(() => {});
  };

  const handleLogout = async () => {
    await api.logout();
    navigate('/admin/login');
  };

  const handleUpdateInquiryStatus = async (id: number, newStatus: string) => {
    try {
      const updated = await api.updateInquiryStatus(id, newStatus);
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? updated : inq)));
      if (selectedInquiry?.id === id) setSelectedInquiry(updated);
      api.getAdminStats().then(setStats).catch(() => {});
    } catch (err: any) {
      alert(`Error updating inquiry: ${err.message}`);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const updated = await api.updateAdminProfile(profile);
      setProfile(updated);
      setProfileSuccessMsg('Profile updated successfully!');
      setTimeout(() => setProfileSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(`Error updating profile: ${err.message}`);
    }
  };

  const filteredInquiries = inquiryStatusFilter
    ? inquiries.filter((i) => i.status === inquiryStatusFilter)
    : inquiries;

  return (
    <div className="min-h-screen bg-[#050014] text-white flex flex-col">
      {/* Top Admin Navbar */}
      <header className="border-b border-[#A855F7]/30 bg-[#0B071C]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#110C25] border border-[#A855F7]/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div>
              <span className="font-bold text-sm font-heading block">Sandesh Barde Portfolio CMS</span>
              <span className="text-xs text-[#A1A1AA]">Admin: {currentUser?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs text-[#A1A1AA] hover:text-white inline-flex items-center gap-1 border border-white/10 px-3 py-1.5 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="btn-secondary py-1.5 px-3 text-xs inline-flex items-center gap-1.5 hover:border-[#EF4444] hover:text-[#EF4444]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1">
        {/* KPI Summary Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-5 border border-[#A855F7]/25">
              <span className="text-xs text-[#A1A1AA] block">Total Inquiries</span>
              <span className="text-2xl font-bold font-heading text-white mt-1 block">
                {stats.total_inquiries}
              </span>
              <span className="text-[11px] text-[#D946EF] font-medium mt-1 block">
                {stats.unread_inquiries} Unread / New
              </span>
            </div>

            <div className="glass-card p-5 border border-[#A855F7]/25">
              <span className="text-xs text-[#A1A1AA] block">Published Projects</span>
              <span className="text-2xl font-bold font-heading text-white mt-1 block">
                {stats.total_projects}
              </span>
              <span className="text-[11px] text-[#38BDF8] font-medium mt-1 block">Active on site</span>
            </div>

            <div className="glass-card p-5 border border-[#A855F7]/25">
              <span className="text-xs text-[#A1A1AA] block">Verified Skills</span>
              <span className="text-2xl font-bold font-heading text-white mt-1 block">
                {stats.total_skills}
              </span>
              <span className="text-[11px] text-[#10B981] font-medium mt-1 block">Across 5 domains</span>
            </div>

            <div className="glass-card p-5 border border-[#A855F7]/25">
              <span className="text-xs text-[#A1A1AA] block">Certificates</span>
              <span className="text-2xl font-bold font-heading text-white mt-1 block">
                {stats.total_certificates}
              </span>
              <span className="text-[11px] text-[#A1A1AA] font-medium mt-1 block">Google, IBM, Coursera</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#A855F7]/25 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'inquiries'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white shadow-lg'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white shadow-lg'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects & Case Studies</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white shadow-lg'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Links</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {['', 'new', 'read', 'replied', 'archived'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${
                      inquiryStatusFilter === st
                        ? 'bg-[#38BDF8] text-black font-bold'
                        : 'bg-[#110C25] text-[#A1A1AA] border border-white/10'
                    }`}
                  >
                    {st || 'All'}
                  </button>
                ))}
              </div>

              <a
                href={api.exportInquiriesCsvUrl}
                download
                className="btn-secondary py-1.5 px-3 text-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Export CSV</span>
              </a>
            </div>

            {/* Inquiries Table */}
            <div className="glass-card overflow-hidden border border-[#A855F7]/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#080516] border-b border-white/10 text-[#A1A1AA] uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Sender</th>
                      <th className="p-4">Project Domain</th>
                      <th className="p-4">Budget</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-[#A1A1AA]">
                          No client inquiries found for this filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-white block">{inq.name}</span>
                            <span className="text-[11px] text-[#38BDF8]">{inq.email}</span>
                          </td>
                          <td className="p-4 text-white">{inq.project_type}</td>
                          <td className="p-4 text-[#A1A1AA]">{inq.budget || '—'}</td>
                          <td className="p-4 text-[#A1A1AA]">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className="px-2 py-1 rounded bg-[#080516] border border-white/20 text-[11px] text-white focus:outline-none"
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="replied">Replied</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="text-[#38BDF8] hover:underline"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiry Detail Modal */}
            {selectedInquiry && (
              <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedInquiry(null)}
              >
                <div
                  className="bg-[#110C25] border border-[#A855F7] max-w-xl w-full rounded-2xl p-6 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white font-heading">
                        Inquiry from {selectedInquiry.name}
                      </h4>
                      <span className="text-xs text-[#38BDF8]">{selectedInquiry.email}</span>
                    </div>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="text-[#A1A1AA] hover:text-white text-xs border border-white/10 px-2 py-1 rounded"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-[#A1A1AA] block mb-1">Project Type:</span>
                      <span className="text-white font-semibold">{selectedInquiry.project_type}</span>
                    </div>

                    <div>
                      <span className="text-[#A1A1AA] block mb-1">Budget Target:</span>
                      <span className="text-white font-semibold">{selectedInquiry.budget || 'Not specified'}</span>
                    </div>

                    <div>
                      <span className="text-[#A1A1AA] block mb-1">Client Message:</span>
                      <div className="p-4 rounded-xl bg-[#080516] border border-white/10 text-white whitespace-pre-wrap leading-relaxed">
                        {selectedInquiry.message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-white">Published Projects ({projects.length})</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div key={p.id} className="glass-card p-5 border border-[#A855F7]/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#38BDF8] uppercase">{p.category}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                        Published
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white font-heading mb-1">{p.title}</h4>
                    <p className="text-xs text-[#A1A1AA] line-clamp-2 mb-4">{p.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#A1A1AA] font-mono">slug: {p.slug}</span>
                    {p.github_url && (
                      <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-[#38BDF8] hover:underline">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE SETTINGS */}
        {activeTab === 'profile' && profile && (
          <form onSubmit={handleSaveProfile} className="glass-card p-8 border border-[#A855F7]/30 max-w-2xl space-y-5">
            <h3 className="text-lg font-bold text-white font-heading mb-4">Edit Profile & Contact Facts</h3>

            {profileSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/40 text-[#10B981] text-xs">
                {profileSuccessMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-white mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Contact Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Availability</label>
                <input
                  type="text"
                  value={profile.availability}
                  onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-white mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={profile.github_url || ''}
                  onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-white mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={profile.linkedin_url || ''}
                  onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-white mb-1">Resume Download URL (PDF)</label>
                <input
                  type="url"
                  value={profile.resume_url || ''}
                  placeholder="https://.../sandesh-barde-resume.pdf"
                  onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080516] border border-white/20 text-white focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary py-2.5 px-6 text-xs inline-flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        )}
      </main>
    </div>
  );
};
