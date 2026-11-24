import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/about/AboutSection';
import { SkillsSection } from '../components/skills/SkillsSection';
import { ProjectsSection } from '../components/projects/ProjectsSection';
import { CaseStudiesSection } from '../components/case-studies/CaseStudiesSection';
import { JourneySection } from '../components/journey/JourneySection';
import { ServicesSection } from '../components/services/ServicesSection';
import { ContactSection } from '../components/contact/ContactSection';
import { Footer } from '../components/layout/Footer';
import { api } from '../lib/api';
import { Profile, Project, SkillCategory, Service, ExperienceItem, EducationItem, Certificate } from '../types';

export const PortfolioPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [journeyData, setJourneyData] = useState<{
    experience: ExperienceItem[];
    education: EducationItem[];
    certificates: Certificate[];
  }>({ experience: [], education: [], certificates: [] });

  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string | undefined>();
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.getProfile(),
      api.getProjects(),
      api.getSkills(),
      api.getServices(),
      api.getJourney(),
    ]).then(([profRes, projRes, skillsRes, svcRes, jrnRes]) => {
      if (profRes.status === 'fulfilled') setProfile(profRes.value);
      if (projRes.status === 'fulfilled') setProjects(projRes.value);
      if (skillsRes.status === 'fulfilled') setSkillCategories(skillsRes.value);
      if (svcRes.status === 'fulfilled') setServices(svcRes.value);
      if (jrnRes.status === 'fulfilled') setJourneyData(jrnRes.value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050014] text-white flex flex-col">
      {/* Sticky Pill Navigation */}
      <Navbar profile={profile} />

      {/* Main Public Experience */}
      <main className="flex-1">
        {/* 01. Hero */}
        <Hero profile={profile} />

        {/* 02. About */}
        <AboutSection profile={profile} />

        {/* 03. Skills */}
        <SkillsSection categories={skillCategories} />

        {/* 04. Projects */}
        <ProjectsSection
          projects={projects}
          onSelectProjectForCaseStudy={(slug) => setSelectedCaseStudySlug(slug)}
        />

        {/* 05. Case Studies */}
        <CaseStudiesSection
          projects={projects}
          selectedSlug={selectedCaseStudySlug}
        />

        {/* 06. Journey (Experience, Education, Certifications) */}
        <JourneySection
          experience={journeyData.experience}
          education={journeyData.education}
          certificates={journeyData.certificates}
        />

        {/* 07. Services */}
        <ServicesSection
          services={services}
          onSelectServiceForQuote={(svcTitle) => setPreselectedService(svcTitle)}
        />

        {/* 08. Contact & Inquiry Form */}
        <ContactSection
          profile={profile}
          preselectedService={preselectedService}
        />
      </main>

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  );
};
