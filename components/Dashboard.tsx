
import React, { useMemo } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  Tooltip
} from 'recharts';
import { UserStats, Domain, AppView, TopicStats } from '../types';
import { BADGE_DEFINITIONS } from '../constants';

interface DashboardProps {
  stats: UserStats;
  onNavigate: (view: AppView) => void;
  onFocusReview: (domain: Domain) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onNavigate, onFocusReview }) => {
  const radarData = useMemo(() => {
    return Object.keys(stats.domainPerformance).map(domainKey => {
      const domain = domainKey as Domain;
      const perf = stats.domainPerformance[domain];
      return {
        subject: domain.split(':')[0],
        A: perf.total === 0 ? 0 : Math.round((perf.correct / perf.total) * 100),
      };
    });
  }, [stats]);

  const weakestDomain = useMemo(() => {
    let minScore = 1.1;
    let weakest: Domain | null = null;
    Object.keys(stats.domainPerformance).forEach((domainKey) => {
      const domain = domainKey as Domain;
      const perf = stats.domainPerformance[domain];
      if (perf.total > 0) {
        const score = perf.correct / perf.total;
        if (score < minScore) {
          minScore = score;
          weakest = domain;
        }
      }
    });
    return weakest;
  }, [stats]);

  const level = Math.floor(stats.xp / 500) + 1;
  const progressInLevel = (stats.xp % 500) / 5;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 rounded-xl border bg-white p-8 flex flex-col justify-between space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Scholar</h1>
            <p className="text-zinc-500">You've mastered <span className="text-zinc-900 font-semibold">{Math.round((stats.correctAnswers / (stats.totalQuestionsAnswered || 1)) * 100)}%</span> of the material. Keep pushing.</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Level {level}</span>
              <span>{Math.round(progressInLevel)}% to Level {level + 1}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full bg-zinc-900 transition-all duration-1000" style={{ width: `${progressInLevel}%` }}></div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-zinc-900 text-zinc-50 p-8 flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-400">Total Mastery</p>
            <p className="text-5xl font-bold tracking-tighter">{stats.xp}</p>
          </div>
          <button 
            onClick={() => onNavigate('EXAM')}
            className="w-full bg-white text-zinc-900 rounded-lg py-2.5 text-sm font-bold hover:bg-zinc-100 transition-colors"
          >
            Start Practice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Competency Chart */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Competency Profile</h3>
            <span className="text-xs text-zinc-400 font-medium">Based on {stats.totalQuestionsAnswered} responses</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e4e4e7" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontWeight: 500, fill: '#71717a' }} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#18181b"
                  fill="#18181b"
                  fillOpacity={0.1}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Focus Area & Badges */}
        <div className="space-y-8">
          <div className="rounded-xl border bg-white p-6 space-y-6">
            <h3 className="font-semibold">Current Focus</h3>
            {weakestDomain ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-zinc-50 border space-y-2">
                  <p className="text-xs font-bold uppercase text-zinc-400">{weakestDomain.split(':')[0]}</p>
                  <p className="text-sm font-medium leading-snug">Based on your recent errors, we suggest reinforcing this domain.</p>
                </div>
                <button 
                  onClick={() => onFocusReview(weakestDomain)}
                  className="w-full border rounded-lg py-2 text-sm font-semibold hover:bg-zinc-50 transition-colors"
                >
                  Reinforce Domain
                </button>
              </div>
            ) : (
              <p className="text-sm text-zinc-500 italic">Complete more exams to see focus areas.</p>
            )}
          </div>

          <div className="rounded-xl border bg-white p-6 space-y-6">
            <h3 className="font-semibold">Achievements</h3>
            <div className="grid grid-cols-3 gap-4">
              {BADGE_DEFINITIONS.map(badge => (
                <div 
                  key={badge.id} 
                  title={badge.label}
                  className={`aspect-square rounded-lg border flex items-center justify-center text-xl transition-all ${
                    stats.badges.includes(badge.id) 
                    ? 'bg-zinc-900 border-zinc-900 shadow-md text-white' 
                    : 'bg-zinc-50 border-zinc-100 grayscale opacity-30'
                  }`}
                >
                  {badge.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
