'use client';

import { LearningModule } from '@/types/learning';
import { useState } from 'react';

interface TimelineProps {
  modules: LearningModule[];
  onStatusChange: (moduleId: string, newStatus: LearningModule['status']) => void;
}

const statusConfig = {
  'not-started': {
    label: 'Not Started',
    gradient: 'from-gray-400 to-gray-500',
    dotGlow: 'shadow-gray-400/50',
    badge: 'bg-gray-100 text-gray-600 border-gray-200'
  },
  'in-progress': {
    label: 'Learning',
    gradient: 'from-blue-500 to-cyan-500',
    dotGlow: 'shadow-blue-500/50',
    badge: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  'completed': {
    label: 'Mastered',
    gradient: 'from-green-500 to-emerald-500',
    dotGlow: 'shadow-green-500/50',
    badge: 'bg-green-50 text-green-700 border-green-200'
  }
};

export default function LearningTimeline({ modules, onStatusChange }: TimelineProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const toggleExpand = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="relative">
      {/* Animated gradient line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 opacity-30" />
      
      <div className="space-y-6">
        {modules.map((module, index) => {
          const status = statusConfig[module.status];
          const isExpanded = expandedModule === module.id;
          const isHovered = hoveredModule === module.id;

          return (
            <div 
              key={module.id} 
              id={module.id} 
              className="relative pl-16 scroll-mt-24 group"
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              {/* Glowing dot with pulse animation */}
              <div className="absolute left-4 flex items-center justify-center">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${status.gradient} shadow-lg ${status.dotGlow} transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                  {module.status === 'completed' && (
                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
                {module.status === 'in-progress' && (
                  <div className={`absolute w-4 h-4 rounded-full bg-gradient-to-br ${status.gradient} animate-ping opacity-75`} />
                )}
              </div>
              
              {/* Card with glassmorphism */}
              <div className={`
                relative overflow-hidden rounded-2xl backdrop-blur-sm
                bg-white/80 border border-gray-200/50
                shadow-lg hover:shadow-2xl
                transition-all duration-500 ease-out
                ${isHovered ? 'translate-x-2 border-gray-300' : ''}
              `}>
                {/* Gradient overlay on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${status.gradient} opacity-0 transition-opacity duration-500
                  ${isHovered ? 'opacity-5' : ''}
                `} />
                
                <div className="relative p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight pr-4">
                        {module.title}
                      </h3>
                      <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${status.badge}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    {/* Metadata with icons */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {module.startDate && (
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(module.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      )}
                      {module.completedDate && (
                        <div className="flex items-center gap-1.5 text-green-600 font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{new Date(module.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{module.estimatedHours}h</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills pills with gradient */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.skills.slice(0, 6).map((skill, idx) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                    {module.skills.length > 6 && (
                      <span className="px-3 py-1.5 rounded-lg text-gray-500 text-sm">+{module.skills.length - 6}</span>
                    )}
                  </div>

                  {/* Expandable section */}
                  <button
                    onClick={() => toggleExpand(module.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/btn transition-colors"
                  >
                    <span>{isExpanded ? 'Show less' : 'View details'}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded content with smooth animation */}
                  <div className={`
                    grid transition-all duration-500 ease-in-out
                    ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}
                  `}>
                    <div className="overflow-hidden">
                      <div className="pt-4 border-t border-gray-200 space-y-4">
                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed">{module.description}</p>
                        
                        {/* All Skills */}
                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {module.skills.map((skill) => (
                              <span key={skill} className="px-3 py-1.5 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Key Learnings with checkmarks */}
                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Key Outcomes</h4>
                          <ul className="space-y-2">
                            {module.keyLearnings.map((learning, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs mt-0.5">
                                  ✓
                                </span>
                                <span className="leading-relaxed">{learning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action buttons with gradients */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {module.status === 'not-started' && (
                            <button
                              onClick={() => onStatusChange(module.id, 'in-progress')}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                              Start Learning
                            </button>
                          )}
                          {module.status === 'in-progress' && (
                            <>
                              <button
                                onClick={() => onStatusChange(module.id, 'completed')}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                              >
                                Mark Complete
                              </button>
                              <button
                                onClick={() => onStatusChange(module.id, 'not-started')}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                              >
                                Reset
                              </button>
                            </>
                          )}
                          {module.status === 'completed' && (
                            <button
                              onClick={() => onStatusChange(module.id, 'not-started')}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                              Reset Progress
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
