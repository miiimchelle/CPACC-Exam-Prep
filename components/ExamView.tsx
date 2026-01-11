
import React, { useState, useEffect } from 'react';
import { Question, Domain } from '../types';
import { generateQuestions } from '../services/gemini';
import { MOCK_QUESTIONS } from '../constants';

interface ExamViewProps {
  onComplete: (answers: (number | null)[], questions: Question[]) => void;
  onExit: () => void;
  focusDomain?: Domain;
}

const ExamView: React.FC<ExamViewProps> = ({ onComplete, onExit, focusDomain }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120 * 60);

  useEffect(() => {
    if (isMockMode && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (isMockMode && timeLeft === 0) {
      onComplete(userAnswers, questions);
    }
  }, [isMockMode, timeLeft]);

  const startExam = async (mock: boolean) => {
    setLoading(true);
    setIsMockMode(mock);
    const count = mock ? 100 : (focusDomain ? 5 : 8);
    
    try {
      const fetched = await generateQuestions({ 
        domain: focusDomain, 
        count: mock ? 15 : count
      });
      
      let all = [...fetched];
      if (mock) {
        while (all.length < 100) {
           all = [...all, ...MOCK_QUESTIONS];
           if (all.length > 100) all = all.slice(0, 100);
        }
      } else if (all.length < count) {
        all = [...all, ...MOCK_QUESTIONS].slice(0, count);
      }
      
      setQuestions(all.sort(() => Math.random() - 0.5));
      setUserAnswers(new Array(all.length).fill(null));
      setLoading(false);
    } catch (err) {
      setQuestions(MOCK_QUESTIONS.slice(0, mock ? 100 : count));
      setUserAnswers(new Array(Math.min(MOCK_QUESTIONS.length, count)).fill(null));
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading && !questions.length) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-12 text-center animate-in fade-in duration-500">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tight">Select Assessment Mode</h2>
          <p className="text-zinc-500 max-w-lg mx-auto">Prepare for the IAAP CPACC certification with either a quick focus session or a full endurance simulation.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <button 
            onClick={() => startExam(false)}
            className="group relative p-10 rounded-2xl border-2 border-zinc-100 bg-white hover:border-zinc-900 transition-all text-left space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl group-hover:bg-zinc-900 group-hover:text-white transition-colors">⚡</div>
            <div>
              <h3 className="text-xl font-bold">Quick Review</h3>
              <p className="text-sm text-zinc-500 mt-1">Short focused bursts of 5-8 questions. Ideal for busy schedules.</p>
            </div>
          </button>
          <button 
            onClick={() => startExam(true)}
            className="group relative p-10 rounded-2xl border-2 border-zinc-100 bg-white hover:border-zinc-900 transition-all text-left space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl group-hover:bg-zinc-900 group-hover:text-white transition-colors">🏁</div>
            <div>
              <h3 className="text-xl font-bold">Full Simulation</h3>
              <p className="text-sm text-zinc-500 mt-1">100 questions in 120 minutes. Matches the official exam format.</p>
            </div>
          </button>
        </div>
        <button onClick={onExit} className="text-sm font-medium text-zinc-400 hover:text-zinc-900 underline transition-colors">Go back to dashboard</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
        <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Assembling Exam Database</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-16 bg-slate-50/50 py-4 z-40 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white px-3 py-1 rounded-full">
            {isMockMode ? 'Mock Exam' : 'Review Mode'}
          </span>
          <span className="text-sm font-bold text-zinc-400">Q {currentIndex + 1} of {questions.length}</span>
        </div>
        
        <div className="flex items-center gap-6">
          {isMockMode && (
            <div className={`text-sm font-mono font-black tabular-nums ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-zinc-900'}`}>
              {formatTime(timeLeft)}
            </div>
          )}
          <div className="w-32 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-900 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 space-y-12">
           <div className="space-y-2">
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{currentQ.domain.split(':')[0]}</p>
             <h3 className="text-2xl font-bold leading-tight tracking-tight text-zinc-900">{currentQ.text}</h3>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentIndex] === idx;
                const isCorrect = currentQ.correctAnswer === idx;
                const hasAnswered = userAnswers[currentIndex] !== null;

                let styles = "border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50";
                if (hasAnswered) {
                  if (isSelected) {
                    styles = isCorrect || isMockMode ? "border-zinc-900 bg-zinc-900 text-white" : "border-red-500 bg-red-50 text-red-700";
                  } else if (isCorrect && !isMockMode) {
                    styles = "border-zinc-900 bg-zinc-50 text-zinc-900";
                  } else {
                    styles = "border-zinc-100 text-zinc-300 pointer-events-none opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => {
                      const newA = [...userAnswers];
                      newA[currentIndex] = idx;
                      setUserAnswers(newA);
                      if (!isMockMode) setShowExplanation(true);
                    }}
                    className={`w-full text-left p-6 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-between group ${styles}`}
                  >
                    <span>{opt}</span>
                    {hasAnswered && !isMockMode && isCorrect && <span className="text-lg">✓</span>}
                  </button>
                );
              })}
           </div>

           {!isMockMode && showExplanation && (
             <div className="mt-4 p-8 bg-zinc-50 rounded-xl border-2 border-zinc-100 space-y-4 animate-in slide-in-from-top-4 duration-500">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Handbook Commentary</p>
                <p className="text-sm leading-relaxed text-zinc-600 font-medium italic">"{currentQ.explanation}"</p>
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="bg-zinc-50/50 border-t p-6 flex justify-between items-center">
           <button onClick={onExit} className="text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">Terminate Session</button>
           <button 
             onClick={() => {
                if (currentIndex < questions.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                  setShowExplanation(false);
                } else {
                  onComplete(userAnswers, questions);
                }
             }}
             disabled={userAnswers[currentIndex] === null}
             className={`px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
               userAnswers[currentIndex] === null
               ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
               : 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10 hover:-translate-y-0.5'
             }`}
           >
             {currentIndex === questions.length - 1 ? 'End Assessment' : 'Next Task'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ExamView;
