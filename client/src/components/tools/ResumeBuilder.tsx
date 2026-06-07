'use client';

import { useState } from 'react';
import ToolLayout from '../ui/ToolLayout';
import { Download, Plus, Trash2, User, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Globe, Linkedin, Github, Eye, Palette, FileText, Languages, Trophy } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

type TemplateType = 'professional' | 'modern' | 'creative' | 'executive' | 'minimal';

export default function ResumeBuilder() {
  const [template, setTemplate] = useState<TemplateType>('professional');
  const [showPreview, setShowPreview] = useState(false);
  const [accentColor, setAccentColor] = useState('#4A90E2');
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: '1', company: '', position: '', startDate: '', endDate: '', description: '', current: false }
  ]);

  const [education, setEducation] = useState<Education[]>([
    { id: '1', school: '', degree: '', field: '', graduationDate: '', gpa: '' }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: '', level: 'intermediate' }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: '', description: '', technologies: '', link: '' }
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    { id: '1', name: '', issuer: '', date: '' }
  ]);

  const [languages, setLanguages] = useState<Language[]>([
    { id: '1', name: '', proficiency: 'intermediate' }
  ]);

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    setSkills([...skills, { id: Date.now().toString(), name: '', level: 'intermediate' }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), name: '', description: '', technologies: '', link: '' }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const addCertification = () => {
    setCertifications([...certifications, { id: Date.now().toString(), name: '', issuer: '', date: '' }]);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const addLanguage = () => {
    setLanguages([...languages, { id: Date.now().toString(), name: '', proficiency: 'intermediate' }]);
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfilePhoto('');
  };

  const downloadResume = () => {
    const resumeContent = generateResumeHTML();
    
    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(resumeContent);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print dialog
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };
    }
  };

  const getTemplateStyles = () => {
    const templates = {
      professional: {
        sidebarWidth: '35%',
        sidebarBg: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
        headerStyle: 'sidebar',
        accentElements: true,
        graphics: 'circles'
      },
      modern: {
        sidebarWidth: '30%',
        sidebarBg: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}ee 100%)`,
        headerStyle: 'top',
        accentElements: true,
        graphics: 'lines'
      },
      creative: {
        sidebarWidth: '40%',
        sidebarBg: `linear-gradient(45deg, ${accentColor} 0%, ${accentColor}cc 50%, ${accentColor}ee 100%)`,
        headerStyle: 'sidebar',
        accentElements: true,
        graphics: 'shapes'
      },
      executive: {
        sidebarWidth: '32%',
        sidebarBg: `linear-gradient(135deg, #2c3e50 0%, #34495e 100%)`,
        headerStyle: 'sidebar',
        accentElements: false,
        graphics: 'minimal'
      },
      minimal: {
        sidebarWidth: '28%',
        sidebarBg: `linear-gradient(180deg, ${accentColor}22 0%, ${accentColor}11 100%)`,
        headerStyle: 'sidebar',
        accentElements: false,
        graphics: 'none'
      }
    };
    return templates[template];
  };

  const generateResumeHTML = () => {
    const templateConfig = getTemplateStyles();
    
    const sidebarTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${personalInfo.fullName} - Resume</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
    }
    .container {
      display: flex;
      min-height: 100vh;
    }
    
    /* Sidebar */
    .sidebar {
      width: ${templateConfig.sidebarWidth};
      background: ${templateConfig.sidebarBg};
      color: ${template === 'minimal' ? '#333' : 'white'};
      padding: 40px 30px;
      position: relative;
      overflow: hidden;
    }
    ${templateConfig.graphics === 'circles' ? `
    .sidebar:before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
    }
    .sidebar:after {
      content: '';
      position: absolute;
      bottom: -80px;
      left: -80px;
      width: 250px;
      height: 250px;
      background: rgba(255,255,255,0.08);
      border-radius: 50%;
    }
    ` : ''}
    ${templateConfig.graphics === 'lines' ? `
    .sidebar:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent);
    }
    ` : ''}
    ${templateConfig.graphics === 'shapes' ? `
    .sidebar:before {
      content: '';
      position: absolute;
      top: 20%;
      right: -30px;
      width: 100px;
      height: 100px;
      background: rgba(255,255,255,0.1);
      transform: rotate(45deg);
    }
    .sidebar:after {
      content: '';
      position: absolute;
      bottom: 30%;
      left: -30px;
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.08);
      border-radius: 20px;
      transform: rotate(25deg);
    }
    ` : ''}
    .profile-photo {
      width: ${template === 'creative' ? '200px' : '180px'};
      height: ${template === 'creative' ? '200px' : '180px'};
      border-radius: ${template === 'executive' ? '20px' : '50%'};
      background: white;
      margin: 0 auto 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 72px;
      font-weight: bold;
      color: ${accentColor};
      border: ${template === 'creative' ? '8px' : '5px'} solid ${template === 'minimal' ? accentColor : 'white'};
      box-shadow: 0 ${template === 'creative' ? '15px 40px' : '10px 30px'} rgba(0,0,0,0.2);
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    ${template === 'creative' ? `
    .profile-photo:before {
      content: '';
      position: absolute;
      inset: -10px;
      background: linear-gradient(45deg, ${accentColor}44, transparent);
      z-index: -1;
      border-radius: 50%;
    }
    ` : ''}
    .profile-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .name {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .sidebar-section {
      margin-top: 40px;
    }
    .sidebar-section h3 {
      font-size: 18px;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid ${template === 'minimal' ? accentColor : 'rgba(255,255,255,0.3)'};
      display: flex;
      align-items: center;
      gap: 10px;
      text-transform: ${template === 'executive' ? 'uppercase' : 'none'};
      letter-spacing: ${template === 'executive' ? '2px' : '0'};
      font-weight: ${template === 'executive' ? '700' : '600'};
    }
    .sidebar-section h3:before {
      content: '';
      width: ${template === 'creative' ? '12px' : '8px'};
      height: ${template === 'creative' ? '12px' : '8px'};
      background: ${template === 'minimal' ? accentColor : 'white'};
      border-radius: ${template === 'executive' ? '2px' : '50%'};
      ${template === 'creative' ? 'box-shadow: 0 0 10px rgba(255,255,255,0.5);' : ''}
    }
    .contact-item {
      margin-bottom: 12px;
      font-size: 13px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      word-break: break-word;
    }
    .contact-item:before {
      content: '▸';
      font-size: 16px;
      flex-shrink: 0;
    }
    .skill-item {
      margin-bottom: 15px;
    }
    .skill-name {
      font-size: 14px;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .skill-bar {
      height: 8px;
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      overflow: hidden;
    }
    .skill-fill {
      height: 100%;
      background: white;
      border-radius: 10px;
      transition: width 0.3s;
    }
    .language-item, .cert-item {
      margin-bottom: 10px;
      font-size: 13px;
      padding-left: 15px;
      position: relative;
    }
    .language-item:before, .cert-item:before {
      content: '•';
      position: absolute;
      left: 0;
      font-size: 20px;
    }
    
    /* Main Content */
    .main-content {
      flex: 1;
      padding: 50px 40px;
      background: #f8f9fa;
    }
    .main-section {
      margin-bottom: 35px;
    }
    .main-section h2 {
      font-size: 24px;
      color: ${accentColor};
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: ${template === 'creative' ? '4px' : '3px'} solid ${accentColor};
      display: flex;
      align-items: center;
      gap: 10px;
      text-transform: ${template === 'executive' ? 'uppercase' : 'none'};
      letter-spacing: ${template === 'executive' ? '3px' : '0'};
      position: relative;
    }
    .main-section h2:before {
      content: '';
      width: ${template === 'creative' ? '16px' : '12px'};
      height: ${template === 'creative' ? '16px' : '12px'};
      background: ${accentColor};
      border-radius: ${template === 'executive' ? '3px' : '50%'};
      ${template === 'creative' ? `box-shadow: 0 0 15px ${accentColor}88;` : ''}
    }
    ${template === 'modern' ? `
    .main-section h2:after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 60px;
      height: 3px;
      background: ${accentColor};
    }
    ` : ''}
    .summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      font-size: 15px;
      line-height: 1.8;
      color: #555;
    }
    .item {
      background: white;
      padding: 20px;
      border-radius: ${template === 'creative' ? '15px' : '8px'};
      margin-bottom: 15px;
      box-shadow: 0 2px ${template === 'creative' ? '15px' : '10px'} rgba(0,0,0,${template === 'minimal' ? '0.03' : '0.05'});
      border-left: ${template === 'creative' ? '6px' : '4px'} solid ${accentColor};
      position: relative;
      ${template === 'modern' ? `border-top: 1px solid ${accentColor}22;` : ''}
    }
    ${template === 'creative' ? `
    .item:before {
      content: '';
      position: absolute;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      background: ${accentColor}11;
      border-radius: 50%;
    }
    ` : ''}
    ${template === 'executive' ? `
    .item:hover {
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transform: translateX(5px);
      transition: all 0.3s;
    }
    ` : ''}
    .item h3 {
      font-size: 18px;
      color: #333;
      margin-bottom: 5px;
    }
    .item h4 {
      font-size: 15px;
      color: ${accentColor};
      margin-bottom: 8px;
      font-weight: 600;
    }
    .date {
      color: #666;
      font-size: 13px;
      font-style: italic;
      margin-bottom: 10px;
    }
    .description {
      color: #555;
      font-size: 14px;
      line-height: 1.7;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .tag {
      background: ${accentColor}22;
      color: ${accentColor};
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: 600;
    }
    .link {
      color: ${accentColor};
      text-decoration: none;
      font-weight: 600;
    }
    .link:hover {
      text-decoration: underline;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .container {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="profile-photo">
        ${profilePhoto 
          ? `<img src="${profilePhoto}" alt="${personalInfo.fullName}" />` 
          : personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        }
      </div>
      <div class="name">${personalInfo.fullName}</div>
      
      ${personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.website || personalInfo.linkedin || personalInfo.github ? `
      <div class="sidebar-section">
        <h3>Contact</h3>
        ${personalInfo.phone ? `<div class="contact-item">${personalInfo.phone}</div>` : ''}
        ${personalInfo.email ? `<div class="contact-item">${personalInfo.email}</div>` : ''}
        ${personalInfo.location ? `<div class="contact-item">${personalInfo.location}</div>` : ''}
        ${personalInfo.website ? `<div class="contact-item">${personalInfo.website}</div>` : ''}
        ${personalInfo.linkedin ? `<div class="contact-item">LinkedIn Profile</div>` : ''}
        ${personalInfo.github ? `<div class="contact-item">GitHub Profile</div>` : ''}
      </div>
      ` : ''}
      
      ${skills.some(s => s.name) ? `
      <div class="sidebar-section">
        <h3>Skills</h3>
        ${skills.filter(s => s.name).map(skill => {
          const levelPercent = { beginner: 33, intermediate: 66, advanced: 85, expert: 100 }[skill.level] || 66;
          return `
          <div class="skill-item">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
              <div class="skill-fill" style="width: ${levelPercent}%"></div>
            </div>
          </div>
          `;
        }).join('')}
      </div>
      ` : ''}
      
      ${languages.some(l => l.name) ? `
      <div class="sidebar-section">
        <h3>Languages</h3>
        ${languages.filter(l => l.name).map(lang => `
          <div class="language-item">${lang.name} - ${lang.proficiency}</div>
        `).join('')}
      </div>
      ` : ''}
      
      ${certifications.some(c => c.name) ? `
      <div class="sidebar-section">
        <h3>Certifications</h3>
        ${certifications.filter(c => c.name).map(cert => `
          <div class="cert-item">
            <strong>${cert.name}</strong><br>
            ${cert.issuer}${cert.date ? ` (${cert.date})` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
    
    <!-- Main Content -->
    <div class="main-content">
      ${personalInfo.summary ? `
      <div class="main-section">
        <h2>Summary</h2>
        <div class="summary">${personalInfo.summary}</div>
      </div>
      ` : ''}
      
      ${education.some(e => e.school || e.degree) ? `
      <div class="main-section">
        <h2>Education</h2>
        ${education.filter(e => e.school || e.degree).map(edu => `
        <div class="item">
          <h3>${edu.school}</h3>
          <h4>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</h4>
          ${edu.graduationDate || edu.gpa ? `<div class="date">${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>` : ''}
        </div>
        `).join('')}
      </div>
      ` : ''}
      
      ${experiences.some(e => e.company || e.position) ? `
      <div class="main-section">
        <h2>Professional Experience</h2>
        ${experiences.filter(e => e.company || e.position).map(exp => `
        <div class="item">
          <h3>${exp.position}</h3>
          <h4>${exp.company}</h4>
          ${exp.startDate || exp.endDate ? `<div class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>` : ''}
          ${exp.description ? `<div class="description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
        `).join('')}
      </div>
      ` : ''}
      
      ${projects.some(p => p.name) ? `
      <div class="main-section">
        <h2>Projects</h2>
        ${projects.filter(p => p.name).map(proj => `
        <div class="item">
          <h3>${proj.link ? `<a href="${proj.link}" class="link">${proj.name}</a>` : proj.name}</h3>
          ${proj.description ? `<div class="description">${proj.description}</div>` : ''}
          ${proj.technologies ? `<div class="tags">${proj.technologies.split(',').map(tech => `<span class="tag">${tech.trim()}</span>`).join('')}</div>` : ''}
        </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
    `.trim();

    return sidebarTemplate;
  };

  return (
    <ToolLayout
      title="Resume Builder"
      description="Create professional resumes with multiple templates"
      icon="📄"
      gradient="from-blue-500 to-indigo-600"
    >
      <div className="space-y-6">
        {/* Template Selection & Color Customization */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-blue-600" />
              Choose Professional Template
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Select a template that matches your industry</p>
          </div>
          
          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {[
              { id: 'professional', name: 'Professional', icon: '💼', desc: 'Classic sidebar design', color: 'from-blue-500 to-blue-600' },
              { id: 'modern', name: 'Modern', icon: '✨', desc: 'Clean & contemporary', color: 'from-purple-500 to-purple-600' },
              { id: 'creative', name: 'Creative', icon: '🎨', desc: 'Bold & artistic', color: 'from-pink-500 to-rose-600' },
              { id: 'executive', name: 'Executive', icon: '👔', desc: 'Senior leadership', color: 'from-gray-700 to-gray-800' },
              { id: 'minimal', name: 'Minimal', icon: '⚡', desc: 'Simple & elegant', color: 'from-teal-500 to-cyan-600' }
            ].map((temp) => (
              <button
                key={temp.id}
                onClick={() => setTemplate(temp.id as TemplateType)}
                className={`relative p-4 rounded-xl border-2 transition text-center overflow-hidden ${
                  template === temp.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-lg scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {template === temp.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${temp.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {temp.icon}
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-1">{temp.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{temp.desc}</div>
              </button>
            ))}
          </div>

          {/* Color Customization */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Accent Color:
              </label>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">{accentColor}</span>
            </div>
            
            {/* Quick Color Presets */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick:</span>
              {[
                { name: 'Blue', color: '#4A90E2' },
                { name: 'Purple', color: '#9B59B6' },
                { name: 'Green', color: '#27AE60' },
                { name: 'Orange', color: '#E67E22' },
                { name: 'Red', color: '#E74C3C' },
                { name: 'Teal', color: '#16A085' },
              ].map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => setAccentColor(preset.color)}
                  className={`w-10 h-10 rounded-lg border-2 hover:scale-110 transition ${
                    accentColor === preset.color ? 'border-gray-900 dark:border-white ring-2 ring-offset-2 ring-blue-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Personal Information
          </h3>
          
          {/* Profile Photo Upload */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-gray-200 dark:border-gray-600">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '📷'
                )}
              </div>
              {profilePhoto && (
                <button
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <label className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer font-medium">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {profilePhoto ? 'Change Photo' : 'Upload Photo'}
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Recommended: Square image, max 2MB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                placeholder="New York, NY"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                value={personalInfo.website}
                onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Linkedin className="w-4 h-4 inline mr-1" />
                LinkedIn
              </label>
              <input
                type="url"
                value={personalInfo.linkedin}
                onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Github className="w-4 h-4 inline mr-1" />
                GitHub
              </label>
              <input
                type="url"
                value={personalInfo.github}
                onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                placeholder="https://github.com/yourusername"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Professional Summary
              </label>
              <textarea
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                placeholder="Brief summary of your professional background and goals..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Work Experience
            </h3>
            <button
              onClick={addExperience}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          {experiences.map((exp, index) => (
            <div key={exp.id} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Experience {index + 1}
                </span>
                {experiences.length > 1 && (
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = experiences.map(item =>
                        item.id === exp.id ? { ...item, company: e.target.value } : item
                      );
                      setExperiences(updated);
                    }}
                    placeholder="Company Name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => {
                      const updated = experiences.map(item =>
                        item.id === exp.id ? { ...item, position: e.target.value } : item
                      );
                      setExperiences(updated);
                    }}
                    placeholder="Job Title"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => {
                      const updated = experiences.map(item =>
                        item.id === exp.id ? { ...item, startDate: e.target.value } : item
                      );
                      setExperiences(updated);
                    }}
                    placeholder="Jan 2020"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => {
                      const updated = experiences.map(item =>
                        item.id === exp.id ? { ...item, endDate: e.target.value } : item
                      );
                      setExperiences(updated);
                    }}
                    placeholder="Present"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => {
                      const updated = experiences.map(item =>
                        item.id === exp.id ? { ...item, description: e.target.value } : item
                      );
                      setExperiences(updated);
                    }}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
              Education
            </h3>
            <button
              onClick={addEducation}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          {education.map((edu, index) => (
            <div key={edu.id} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Education {index + 1}
                </span>
                {education.length > 1 && (
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    School/University
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => {
                      const updated = education.map(item =>
                        item.id === edu.id ? { ...item, school: e.target.value } : item
                      );
                      setEducation(updated);
                    }}
                    placeholder="University Name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = education.map(item =>
                        item.id === edu.id ? { ...item, degree: e.target.value } : item
                      );
                      setEducation(updated);
                    }}
                    placeholder="Bachelor's, Master's, etc."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => {
                      const updated = education.map(item =>
                        item.id === edu.id ? { ...item, field: e.target.value } : item
                      );
                      setEducation(updated);
                    }}
                    placeholder="Computer Science, etc."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Graduation Date
                  </label>
                  <input
                    type="text"
                    value={edu.graduationDate}
                    onChange={(e) => {
                      const updated = education.map(item =>
                        item.id === edu.id ? { ...item, graduationDate: e.target.value } : item
                      );
                      setEducation(updated);
                    }}
                    placeholder="May 2020"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => {
                      const updated = education.map(item =>
                        item.id === edu.id ? { ...item, gpa: e.target.value } : item
                      );
                      setEducation(updated);
                    }}
                    placeholder="3.8/4.0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Projects
            </h3>
            <button
              onClick={addProject}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          {projects.map((proj, index) => (
            <div key={proj.id} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Project {index + 1}
                </span>
                {projects.length > 1 && (
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => {
                      const updated = projects.map(item =>
                        item.id === proj.id ? { ...item, name: e.target.value } : item
                      );
                      setProjects(updated);
                    }}
                    placeholder="E-commerce Website"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => {
                      const updated = projects.map(item =>
                        item.id === proj.id ? { ...item, description: e.target.value } : item
                      );
                      setProjects(updated);
                    }}
                    placeholder="Brief description of the project..."
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={proj.technologies}
                    onChange={(e) => {
                      const updated = projects.map(item =>
                        item.id === proj.id ? { ...item, technologies: e.target.value } : item
                      );
                      setProjects(updated);
                    }}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={proj.link}
                    onChange={(e) => {
                      const updated = projects.map(item =>
                        item.id === proj.id ? { ...item, link: e.target.value } : item
                      );
                      setProjects(updated);
                    }}
                    placeholder="https://github.com/username/project"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Skills
            </h3>
            <button
              onClick={addSkill}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => {
                      const updated = skills.map(item =>
                        item.id === skill.id ? { ...item, name: e.target.value } : item
                      );
                      setSkills(updated);
                    }}
                    placeholder="e.g., JavaScript, Project Management"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <select
                  value={skill.level}
                  onChange={(e) => {
                    const updated = skills.map(item =>
                      item.id === skill.id ? { ...item, level: e.target.value } : item
                    );
                    setSkills(updated);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-blue-600" />
              Certifications
            </h3>
            <button
              onClick={addCertification}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={cert.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    Certification {index + 1}
                  </span>
                  {certifications.length > 1 && (
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = certifications.map(item =>
                        item.id === cert.id ? { ...item, name: e.target.value } : item
                      );
                      setCertifications(updated);
                    }}
                    placeholder="Certification Name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => {
                      const updated = certifications.map(item =>
                        item.id === cert.id ? { ...item, issuer: e.target.value } : item
                      );
                      setCertifications(updated);
                    }}
                    placeholder="Issuing Organization"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => {
                      const updated = certifications.map(item =>
                        item.id === cert.id ? { ...item, date: e.target.value } : item
                      );
                      setCertifications(updated);
                    }}
                    placeholder="Date Obtained"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Languages className="w-5 h-5 mr-2 text-blue-600" />
              Languages
            </h3>
            <button
              onClick={addLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((lang, index) => (
              <div key={lang.id} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => {
                    const updated = languages.map(item =>
                      item.id === lang.id ? { ...item, name: e.target.value } : item
                    );
                    setLanguages(updated);
                  }}
                  placeholder="e.g., English, Spanish"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) => {
                    const updated = languages.map(item =>
                      item.id === lang.id ? { ...item, proficiency: e.target.value } : item
                    );
                    setLanguages(updated);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="fluent">Fluent</option>
                  <option value="native">Native</option>
                </select>
                {languages.length > 1 && (
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowPreview(true)}
            disabled={!personalInfo.fullName}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Eye className="w-5 h-5" />
            <span>Preview Resume</span>
          </button>
          <button
            onClick={downloadResume}
            disabled={!personalInfo.fullName}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>Generate PDF Resume</span>
          </button>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-auto max-h-[calc(90vh-80px)]">
                <div 
                  className="scale-75 origin-top"
                  dangerouslySetInnerHTML={{ __html: generateResumeHTML() }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 How to Generate PDF
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Fill in all your information in the form above</li>
            <li>• Click "Generate PDF Resume" button</li>
            <li>• A new window will open with your formatted resume</li>
            <li>• Click Print (Ctrl+P) and select "Save as PDF"</li>
            <li>• Choose destination and save your professional resume</li>
            <li>• Your resume features a professional sidebar layout with colored accent</li>
            <li>• Skills are displayed with visual progress bars</li>
            <li>• Perfect for job applications and professional networking</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
