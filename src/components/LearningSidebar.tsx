'use client';

import { LearningModule } from '@/types/learning';
import { useState, useEffect } from 'react';

interface SidebarProps {
  modules: LearningModule[];
  overallProgress: number;
  totalHours: number;
  completedHours: number;
}

export default function LearningSidebar({ modules, overallProgress, totalHours, completedHours }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = modules.map(m => document.getElementById(m.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modules]);

  const scrollToModule = (moduleId: string) => {
    const element = document.getElementById(moduleId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const completedCount = modules.filter(m => m.status === 'completed').length;
  const inProgressCount = modules.filter(m => m.status === 'in-progress').length;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl p-6 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]
          overflow-y-auto
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Journey</h2>
            <p className="text-sm text-gray-600">Track your AI engineering progress</p>
          </div>

          {/* Overall Progress */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
              <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded p-2">
                <div className="text-gray-600">Completed</div>
                <div className="font-bold text-green-600">{completedCount} / {modules.length}</div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="text-gray-600">In Progress</div>
                <div className="font-bold text-blue-600">{inProgressCount}</div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="text-gray-600">Total Hours</div>
                <div className="font-bold text-gray-900">{totalHours}h</div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="text-gray-600">Completed</div>
                <div className="font-bold text-gray-900">{completedHours}h</div>
              </div>
            </div>
          </div>

          {/* Module navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Modules</h3>
            <nav className="space-y-2">
              {modules.map((module, index) => {
                const isActive = activeSection === module.id;
                const statusColors = {
                  'not-started': 'bg-gray-400',
                  'in-progress': 'bg-blue-500',
                  'completed': 'bg-green-500'
                };

                return (
                  <button
                    key={module.id}
                    onClick={() => scrollToModule(module.id)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-blue-100 border-l-4 border-blue-600 shadow-sm' 
                        : 'bg-gray-50 border-l-4 border-transparent hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full ${statusColors[module.status]} mt-1 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                          {module.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{module.estimatedHours}h</span>
                          <span>•</span>
                          <span className="capitalize">{module.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Skills summary */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">All Skills</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(modules.flatMap(m => m.skills))).map((skill) => (
                <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
