
import React, { useState, useEffect } from 'react';
import { AppView, UserStats, Question, Domain, TopicStats } from './types';
import { INITIAL_STATS } from './constants';
import Dashboard from './components/Dashboard';
import ExamView from './components/ExamView';
import CompetenciesView from './components/CompetenciesView';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('DASHBOARD');
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [focusDomain, setFocusDomain] = useState<Domain | undefined>();

  useEffect(() => {
    const saved = localStorage.getItem('cpacc_stats_v_shadcn');
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load stats", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cpacc_stats_v_shadcn', JSON.stringify(stats));
  }, [stats]);

  const handleExamComplete = (answers: (number | null)[], questions: Question[]) => {
    setStats(prev => {
      const newStats = { ...prev };
      let sessionXP = 0;
      let sessionCorrect = 0;

      questions.forEach((q, idx) => {
        const userAnswer = answers[idx];
        if (userAnswer === null) return;
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) {
          sessionXP += 10;
          sessionCorrect++;
        }
        newStats.totalQuestionsAnswered++;
        if (isCorrect) newStats.correctAnswers++;

        const domainStats = newStats.domainPerformance[q.domain];
        domainStats.total++;
        if (isCorrect) domainStats.correct++;

        const topicKey = q.topic || 'General';
        const tStats: TopicStats = newStats.topicPerformance[topicKey] || {
          correct: 0, total: 0, lastTested: Date.now(), interval: 1
        };
        tStats.total++;
        if (isCorrect) {
          tStats.correct++;
          tStats.interval *= 2;
        } else {
          tStats.interval = 1;
        }
        tStats.lastTested = Date.now();
        newStats.topicPerformance[topicKey] = tStats;
      });

      const today = new Date().toDateString();
      if (newStats.lastActivityDate !== today) {
        if (newStats.lastActivityDate) {
          const lastDate = new Date(newStats.lastActivityDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastDate.toDateString() === yesterday.toDateString()) {
            newStats.streak++;
          } else {
            newStats.streak = 1;
          }
        } else {
          newStats.streak = 1;
        }
        newStats.lastActivityDate = today;
      }

      sessionXP += 50;
      newStats.xp += sessionXP;
      newStats.recentScores = [Math.round((sessionCorrect / questions.length) * 100), ...newStats.recentScores].slice(0, 10);
      return newStats;
    });
    setView('DASHBOARD');
    setFocusDomain(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold tracking-tight text-lg">
            <div className="bg-zinc-900 text-white w-6 h-6 rounded flex items-center justify-center text-[10px]">CP</div>
            <span>CPACC Mastery</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button 
              onClick={() => { setView('DASHBOARD'); setFocusDomain(undefined); }}
              className={`transition-colors hover:text-foreground/80 ${view === 'DASHBOARD' ? 'text-foreground' : 'text-foreground/60'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => { setView('COMPETENCIES'); setFocusDomain(undefined); }}
              className={`transition-colors hover:text-foreground/80 ${view === 'COMPETENCIES' ? 'text-foreground' : 'text-foreground/60'}`}
            >
              Learning Path
            </button>
            <button 
              onClick={() => { setView('EXAM'); setFocusDomain(undefined); }}
              className={`transition-colors hover:text-foreground/80 ${view === 'EXAM' ? 'text-foreground' : 'text-foreground/60'}`}
            >
              Practice
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-700">
             🔥 {stats.streak}d
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-100 border flex items-center justify-center text-xs font-bold">
            {stats.xp > 500 ? '⭐' : '🌱'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {view === 'DASHBOARD' && <Dashboard stats={stats} onNavigate={setView} onFocusReview={(d) => { setFocusDomain(d); setView('EXAM'); }} />}
        {view === 'EXAM' && <ExamView onComplete={handleExamComplete} onExit={() => setView('DASHBOARD')} focusDomain={focusDomain} />}
        {view === 'COMPETENCIES' && <CompetenciesView />}
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-zinc-500">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-zinc-900">CPACC Mastery Hub</p>
            <p>Elevating digital accessibility expertise.</p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-zinc-900">Resources</p>
              <a href="#" className="hover:text-zinc-900">IAAP Certification</a>
              <a href="#" className="hover:text-zinc-900">WCAG Guidelines</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-zinc-900">App</p>
              <button onClick={() => confirm('Reset data?') && setStats(INITIAL_STATS)} className="text-left text-red-500 hover:text-red-600">Reset Progress</button>
              <a href="#" className="hover:text-zinc-900">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
