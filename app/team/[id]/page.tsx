'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import teamData from '@/app/data/teamMembers.json';

type TabType = 'profile' | 'education' | 'experience' | 'memberships';

interface Profile {
  education: string[];
  experience: string[];
  memberships: string[];
  appointments: string[];
}

interface Member {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  expertise: string[];
  profile: Profile;
}

export default function TeamMemberDetail() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const foundMember = teamData.teamMembers.find(
      (m: Member) => m.id === params.id
    ) as Member | undefined;
    setMember(foundMember || null);
  }, [params.id]);

  const handleTabClick = (tab: TabType) => {
    if (tab === activeTab || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 300);
  };

  if (!member) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom section-padding">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Member not found</h1>
            <Link href="/team" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Back to Team
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'memberships', label: 'Membership & Appointments' },
  ];

  const renderContent = () => {
    if (isTransitioning) return null;

    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Overview</h3>
              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary-600" />
                    <span className="text-gray-700">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary-600" />
                    <span className="text-gray-700">{member.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Educational Background</h3>
            {member.profile.education.map((edu, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">{edu}</p>
              </div>
            ))}
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
            {member.profile.experience.map((exp, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">{exp}</p>
              </div>
            ))}
          </div>
        );

      case 'memberships':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Memberships</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {member.profile.memberships.map((membership, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">{membership}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Appointments</h3>
              <div className="space-y-3">
                {member.profile.appointments.map((appointment, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{appointment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Back Button */}
      <section className="bg-white border-b">
        <div className="container-custom py-4">
          <Link 
            href="/team" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Team
          </Link>
        </div>
      </section>

      {/* Member Header - Updated Layout */}
      <section className="bg-gray-50">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Side - Content */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {member.name}
              </h1>
              <p className="text-2xl text-primary-600 font-semibold mb-6">
                {member.position}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Bio</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {member.bio}
                </p>
              </div>
              
              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="flex flex-wrap gap-6 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary-600" />
                    <span className="text-lg">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary-600" />
                    <span className="text-lg">{member.phone}</span>
                  </div>
                </div>
              </div>

              {/* Areas of Expertise - Static Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {member.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-base font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Large Profile Image */}
            <div className="flex-shrink-0 lg:w-96">
              <div className="bg-gray-200 h-80 lg:h-96 rounded-2xl flex flex-col items-center justify-center p-8">
                <div className="text-center text-gray-600">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-lg">Profile Image</span>
                  <p className="text-sm mt-2 text-gray-500">
                    {member.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Vertical Tabs */}
            <div className="lg:w-1/4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        w-full text-left px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                        ${isActive 
                          ? 'bg-primary-600 text-white shadow-lg transform scale-105' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Content Area */}
            <div className="lg:w-3/4">
              <div className="min-h-96 p-8 bg-gray-50 rounded-2xl">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}