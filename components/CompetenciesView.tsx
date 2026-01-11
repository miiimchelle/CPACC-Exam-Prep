
import React, { useState } from 'react';
import { Domain } from '../types';

interface Flashcard {
  front: string;
  back: string;
}

interface Topic {
  id: string;
  title: string;
  summary: string;
  details: string[];
  flashcards: Flashcard[];
}

interface DomainData {
  domain: Domain;
  topics: Topic[];
}

const KNOWLEDGE_BASE: DomainData[] = [
  {
    domain: Domain.DOMAIN_1,
    topics: [
      {
        id: "d1-models",
        title: "Theoretical Models of Disability",
        summary: "Frameworks for understanding the phenomenon of disability.",
        details: [
          "Medical Model: Disability is a problem of the person directly caused by disease/trauma. Focuses on clinical cure or medical management. Weakness: Overlooks environmental barriers and sociopolitical constraints.",
          "Social Model: Disability is a socially created problem, not an attribute of an individual. Focuses on removing barriers that restrict life choices. Strength: Emphasizes that barriers are not inevitable. Weakness: Can downplay embodied aspects of disability.",
          "Biopsychosocial Model: WHO ICF standard. Accounts for biological (pathology), psychological (thoughts/emotions), and social (socio-economical/environmental) factors. Integrates social and medical models.",
          "Economic Model: Defines disability by a person's inability to participate in work and assesses impact on productivity/state support. Used by policymakers for benefits.",
          "Functional Solutions Model: Practical perspective. Focuses on identifying limitations and creating technological or methodological innovations to overcome them. Professional work lens.",
          "Social Identity / Cultural Affiliation Model: Personal identity derived from membership in a group (e.g., Deaf Culture). Pride in associating with others in a similar condition.",
          "Charity Model: Views PWDs as unfortunate victims needing outside help. Can be condescending and focuses on short-term needs rather than long-term solutions."
        ],
        flashcards: [
          { front: "Which model sees disability as 'Impairment + Barriers'?", back: "The Social Model." },
          { front: "What does the WHO ICF model stand for?", back: "International Classification of Functioning, Disability and Health (Biopsychosocial Model)." },
          { front: "What is a primary weakness of the Medical Model?", back: "It overlooks issues caused by unwelcoming environments or sociopolitical constraints." }
        ]
      },
      {
        id: "d1-sensory",
        title: "Sensory Disabilities (Visual & Auditory)",
        summary: "Characteristics, barriers, and solutions for sight and hearing impairments.",
        details: [
          "Blindness: Total or nearly complete vision loss. Rely on screen readers, braille, and tactile cues.",
          "Low Vision: Uncorrectable vision loss that interferes with daily tasks ('not enough vision to do what you need to do'). Requires magnification and high contrast.",
          "Color Vision Deficiency: Most common is Red-green (1 in 12 males, 0.5% females). Blue-yellow is rare (1 in 10,000).",
          "Visual Barriers: Lack of alt-text, non-resizable layouts, poor contrast, non-tactile signs, obstacles in travel paths.",
          "Deafness: Total or near-total hearing loss. Sign language often primary. Phonetic notation often not helpful for born-deaf individuals.",
          "Hard of Hearing (HOH): Mild-to-severe loss. May use amplification (Hearing Aids, FM systems) and communicate via sign or spoken language.",
          "Central Auditory Processing Disorder (APD): Brain has difficulty interpreting source/meaning of sounds despite normal hearing sensitivity. Affects ~5% of population.",
          "Auditory Barriers: Absence of captions/transcripts, loud environments, multiple speakers talking at once, poor lighting for lip-reading."
        ],
        flashcards: [
          { front: "What percentage of males have red-green color blindness?", back: "8.3% (1 in 12)." },
          { front: "True or False: Phonetic notation always helps born-deaf individuals read text.", back: "False. It often does not help because sign language is their first language." },
          { front: "What are the four pillars of visual accessibility in ICT?", back: "Text alternatives, magnification capability, high contrast, and not relying on color alone." }
        ]
      },
      {
        id: "d1-speech-mobility",
        title: "Speech & Mobility Disabilities",
        summary: "Physical and communication impairments and adaptive strategies.",
        details: [
          "Speech Disorders: Concern the way people say words/sounds (Articulation/Fluency). Language disorders concern understanding/formulating ideas.",
          "Aphasia: Language disorder from neurological damage (often stroke). Affects reading, writing, and speech.",
          "Manual Dexterity: Difficulty with fine motor tasks (buttons, zippers, keyboards). Requires switch devices, eye tracking, or voice control.",
          "Ambulation: Ability to walk independently. Affected by CP, arthritis, amputation, etc. Requires level access and wide entrances.",
          "Muscle Fatigue: Overwhelming tiredness making voluntary tasks difficult. Common across many health conditions.",
          "Body Size/Shape: Conditions like dwarfism, acromegaly, obesity. Requires adjustable height surfaces and appropriate seating clearance.",
          "Solutions: Tactile controls, GPS-based audio navigation, sip-and-puff switches, head wands, and speech-to-text software."
        ],
        flashcards: [
          { front: "What is the difference between Aphasia and a Speech Sound Disorder?", back: "Aphasia is a language disorder affecting understanding/formulation; Speech Sound Disorders affect the physical production of sounds." },
          { front: "Name an ICT assistive technology for manual dexterity.", back: "Switch devices, eye tracking, oversized mice, or voice control." },
          { front: "What is 'Ambulation'?", back: "The ability to walk from place to place independently, with or without an assistive device." }
        ]
      },
      {
        id: "d1-cognitive-neurological",
        title: "Cognitive, Seizure & Psychological",
        summary: "Mental functions, learning disabilities, and neurological conditions.",
        details: [
          "Intellectual Disability: IQ below 70-75. Limitations in conceptual, social, and practical adaptive skills.",
          "Reading/Dyslexia: 70-80% of reading disabilities. Difficulty with phonological processing.",
          "ADHD: Inattention, hyperactivity, and impulsivity. Affects 2-7% of children globally.",
          "Autism Spectrum (ASD): Difficulties in social communication and restricted/repetitive behaviors. Affects ~1 in 100 people.",
          "Non-Verbal Learning (NLD): High verbal skills but poor social cues/abstract reasoning. Affects ~1% of children.",
          "Seizure Disorders: Epilepsy affects 50m people globally. Photosensitive epilepsy (~3%) triggered by flashes (16-25Hz common).",
          "Psychological: Anxiety disorders (GAD, Panic, Social), Mood disorders (Depression, Bipolar), and Psychotic disorders (Schizophrenia).",
          "Cognitive Barriers: Time-outs, cluttered design, complex language, lack of feedback, information overload."
        ],
        flashcards: [
          { front: "What frequency of flashing light is most likely to trigger a seizure?", back: "16 to 25 times per second (Hz)." },
          { front: "What percentage of people with reading disabilities have Dyslexia?", back: "70% to 80%." },
          { front: "What is GAD in the context of psychological disabilities?", back: "Generalized Anxiety Disorder: persistent feeling of anxiety or dread." }
        ]
      },
      {
        id: "d1-stats-etiquette",
        title: "Demographics & Etiquette",
        summary: "Global trends and professional interaction guidelines.",
        details: [
          "Global Stats: ~1.3 billion people (16% or 1 in 6) experience significant disability. 80% live in developing countries.",
          "Health Inequities: PWDs die up to 20 years earlier and have twice the risk of depression/asthma/diabetes due to unfair conditions.",
          "Etiquette: Speak directly to the person. Ask before helping. Respect personal space (don't touch wheelchairs). Acknowledge their decision-making ability.",
          "Person-First Language: 'Person with a disability'. Standard used by UN CRPD and IAAP.",
          "Identity-First Language: 'Disabled person'. Often preferred by Autistic and Deaf communities. Always ask for personal preference."
        ],
        flashcards: [
          { front: "What fraction of the global population has a significant disability?", back: "1 in 6 (approximately 16%)." },
          { front: "Should you speak to a PWD or their companion?", back: "Always speak directly to the person with the disability." },
          { front: "What is the UN CRPD standard for language?", back: "Person-First Language ('Person with a disability')." }
        ]
      }
    ]
  },
  {
    domain: Domain.DOMAIN_2,
    topics: [
      {
        id: "d2-ud-concepts",
        title: "UD vs. Accommodations",
        summary: "Proactive vs. Reactive approaches to accessibility.",
        details: [
          "Universal Design (UD): Proactive. Designing products/environments to be usable by the widest range of people from the start without adaptation.",
          "Individualized Accommodations: Reactive. Specific modifications for one person to overcome design shortcomings in a specific case.",
          "Inclusive Design / Design for All: Similar concepts ensuring usable products for all without adaptations. 'Design for All' is common in European policies (EN 17161).",
          "Benefits: Individual independence, organizational innovation/problem solving, and macro-level GDP gains by including PWDs in the labor market.",
          "Relationship: Accessibility ensures equivalent experience; Usability ensures ease of use; UD includes everyone to the greatest extent possible."
        ],
        flashcards: [
          { front: "What is the primary difference between UD and Accommodations?", back: "UD is proactive/for everyone; Accommodations are reactive/for specific individuals." },
          { front: "Which European standard supports 'Design for All'?", back: "EN 17161:2019." },
          { front: "Does adopting UD principles prevent the use of assistive devices?", back: "No, but it can reduce the extent or need for them." }
        ]
      },
      {
        id: "d2-7-principles",
        title: "7 Principles of Universal Design",
        summary: "The framework developed by Ronald Mace at NCSU.",
        details: [
          "1. Equitable Use: Design is useful/marketable to people with diverse abilities. Identical means of use whenever possible.",
          "2. Flexibility in Use: Accommodates a wide range of individual preferences and abilities (e.g., left/right handed).",
          "3. Simple and Intuitive Use: Easy to understand regardless of user's experience, knowledge, or language skills.",
          "4. Perceptible Information: Communicates necessary info effectively regardless of sensory abilities (Tactile, Audio, Visual).",
          "5. Tolerance for Error: Minimizes hazards and adverse consequences of accidental actions (e.g., Undo button).",
          "6. Low Physical Effort: Can be used efficiently and comfortably with minimum fatigue.",
          "7. Size and Space for Approach and Use: Appropriate size and space for reach/manipulation regardless of user body size or mobility."
        ],
        flashcards: [
          { front: "Which principle suggests making the design appealing to all users?", back: "Principle 1: Equitable Use." },
          { front: "Which principle is addressed by providing an 'Undo' button?", back: "Principle 5: Tolerance for Error." },
          { front: "Who led the group that developed the 7 Principles in 1997?", back: "Ronald Mace (North Carolina State University)." }
        ]
      },
      {
        id: "d2-wcag-udl",
        title: "WCAG & UDL Guidelines",
        summary: "Digital accessibility and education design frameworks.",
        details: [
          "WCAG POUR: Perceivable (info presentable to senses), Operable (keyboard-only, navigable), Understandable (readable, predictable), Robust (compatible with AT).",
          "Web Benefits: Also helps users on mobile, older people, users with slow connections, and those in situational limitations (bright sun).",
          "UDL Engagement (The Why): Recruiting interest, sustaining effort, self-regulation.",
          "UDL Representation (The What): Options for perception, language/symbols, comprehension (building scaffolds).",
          "UDL Action & Expression (The How): Physical action, communication, executive functions.",
          "UX Core Areas: Usability (completion of task), Useful content, Desirable/Pleasurable content, Accessibility (standards), and Credibility (trust)."
        ],
        flashcards: [
          { front: "What are the 4 principles of WCAG 2.1?", back: "POUR: Perceivable, Operable, Understandable, Robust." },
          { front: "What are the 3 pillars of UDL?", back: "Engagement (Why), Representation (What), and Action & Expression (How)." },
          { front: "What does 'Robust' mean in WCAG?", back: "Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies." }
        ]
      }
    ]
  },
  {
    domain: Domain.DOMAIN_3,
    topics: [
      {
        id: "d3-intl-laws",
        title: "International & Regional Laws",
        summary: "Declarations and treaties protecting PWD rights.",
        details: [
          "Universal Declaration of Human Rights (1948): Milestone document for all, though PWDs weren't explicitly listed until later conventions.",
          "UN CRPD (2006): First legally binding international human rights instrument for PWDs. Article 9 focuses on Accessibility.",
          "Marrakesh Treaty (2013): Creates copyright exceptions for making books available in accessible formats for VIPs (Visually Impaired Persons).",
          "EU Charter: Article 21 (Non-discrimination) and Article 26 (Integration of PWDs).",
          "African Charter: Protocol focuses on harmful practices (witchcraft, abandonment) and armed conflicts.",
          "Inter-American Convention (1999): First regional binding treaty prohibiting disability discrimination."
        ],
        flashcards: [
          { front: "What does Article 9 of the CRPD cover?", back: "Accessibility." },
          { front: "What is the primary goal of the Marrakesh Treaty?", back: "To end the 'book famine' for people with print disabilities by creating copyright exceptions." },
          { front: "Is the UDHR (1948) a legally binding convention?", back: "No, it is a declaration that serves as a milestone framework." }
        ]
      },
      {
        id: "d3-national-procurement",
        title: "National Laws & Procurement",
        summary: "Specific legislative acts and purchasing standards.",
        details: [
          "UK Equality Act 2010: Protects 9 characteristics including disability. Prohibits direct, indirect, and 'arising from disability' discrimination.",
          "US ADA (1990): Civil rights law. Titles II (Public entities) and III (Public accommodations) are critical. Enforced by Dept of Justice.",
          "AODA (Ontario): First of its kind in Canada, setting clear timelines for accessibility compliance.",
          "US Section 508: Federal procurement standard for ICT. Requires comparable access to info/data for employees/public with disabilities.",
          "EU Web Accessibility Directive (2016): Requires public sector bodies to make websites/apps accessible (conformance presumed via EN 301 549).",
          "European Accessibility Act (2019): Common rules for private businesses (ATMs, smartphones, banking, e-books) applied from 2025."
        ],
        flashcards: [
          { front: "Which US law applies specifically to Federal ICT procurement?", back: "Section 508 of the Rehabilitation Act." },
          { front: "What is the enforcement mechanism for the US ADA?", back: "The US Department of Justice (Civil Rights Division) through consent decrees and settlements." },
          { front: "What is the harmonized European standard for ICT accessibility?", back: "EN 301 549." }
        ]
      },
      {
        id: "d3-org-strategies",
        title: "Organizational Integration",
        summary: "Strategies for sustaining accessibility programs.",
        details: [
          "Strategic Approach: Accessibility must be a program, not a project. Integrated into culture and process.",
          "W3C Cycle: 1. Initiate (learn, business case), 2. Plan (policy, budget), 3. Implement (skills, goals), 4. Sustain (monitor, feedback).",
          "BDF Maturity Model (1-5): 1. Informal, 2. Defined, 3. Repeatable, 4. Managed, 5. Best Practice.",
          "CMM Software Adapted: 1. Initial (ad hoc), 2. Managed (policies), 3. Defined (standard processes), 4. Quantitatively Managed, 5. Optimizing.",
          "Management Champions: Role models who engage teams, build awareness, and lead the adoption of maturity models.",
          "Procurement Best Practices: Verifying claims, checking vendor expertise, and requiring accessibility in contractual agreements."
        ],
        flashcards: [
          { front: "What are the 4 phases of the W3C organizational cycle?", back: "Initiate, Plan, Implement, and Sustain." },
          { front: "What is a 'Management Champion'?", back: "An appointee from key areas who serves as a role model and advocate for accessibility adoption." },
          { front: "What is the highest level in the Business Disability Forum maturity model?", back: "Level 5: Best Practice (Innovate, improve, and share)." }
        ]
      }
    ]
  }
];

const CompetenciesView: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<Domain>(Domain.DOMAIN_1);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(KNOWLEDGE_BASE[0].topics[0].id);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const domainData = KNOWLEDGE_BASE.find(d => d.domain === activeDomain)!;
  const topic = domainData.topics.find(t => t.id === selectedTopicId) || domainData.topics[0];

  const handleTopicChange = (id: string) => {
    setSelectedTopicId(id);
    setShowFlashcards(false);
    setCurrentFlashcardIdx(0);
    setIsFlipped(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 space-y-8 sticky top-20">
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-tight uppercase text-zinc-400 px-2">Knowledge Domains</h3>
          <div className="flex flex-col gap-1">
            {KNOWLEDGE_BASE.map(d => (
              <button
                key={d.domain}
                onClick={() => { setActiveDomain(d.domain); handleTopicChange(d.topics[0].id); }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                  activeDomain === d.domain
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {d.domain.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-tight uppercase text-zinc-400 px-2">Sub-Topics</h3>
          <div className="flex flex-col gap-1">
            {domainData.topics.map(t => (
              <button
                key={t.id}
                onClick={() => handleTopicChange(t.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                  selectedTopicId === t.id
                    ? 'bg-zinc-100 text-zinc-900 border'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full space-y-6">
        <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{topic.title}</h2>
              <p className="text-zinc-500 text-sm mt-1">{topic.summary}</p>
            </div>
            <button
              onClick={() => setShowFlashcards(!showFlashcards)}
              className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                showFlashcards 
                ? 'bg-zinc-900 text-white border-zinc-900' 
                : 'bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {showFlashcards ? 'Show Handbook' : 'Flashcards Mode'}
            </button>
          </div>

          <div className="p-8">
            {!showFlashcards ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-4">
                  {topic.details.map((detail, idx) => {
                    const [heading, ...rest] = detail.split(':');
                    return (
                      <div key={idx} className="flex gap-4 items-start p-4 rounded-lg bg-zinc-50/50 border border-zinc-100 transition-all hover:border-zinc-200">
                        <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">{idx + 1}</div>
                        <div className="space-y-1">
                          {rest.length > 0 ? (
                            <>
                              <span className="text-sm font-bold text-zinc-900 block">{heading}</span>
                              <p className="text-sm leading-relaxed text-zinc-700">{rest.join(':').trim()}</p>
                            </>
                          ) : (
                            <p className="text-sm leading-relaxed text-zinc-700">{detail}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4 space-y-12">
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full max-w-md h-72 perspective-1000 cursor-pointer group"
                >
                  <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white border border-zinc-200 rounded-2xl shadow-xl flex flex-col items-center justify-center p-10 text-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Knowledge Check</span>
                      <p className="text-xl font-bold leading-tight">{topic.flashcards[currentFlashcardIdx].front}</p>
                      <span className="mt-10 text-[10px] text-zinc-400 italic">Click to reveal answer</span>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-zinc-900 text-white border border-zinc-900 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-10 text-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">Expert Definition</span>
                      <p className="text-lg font-medium leading-relaxed">{topic.flashcards[currentFlashcardIdx].back}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <button
                    disabled={currentFlashcardIdx === 0}
                    onClick={() => { setCurrentFlashcardIdx(prev => prev - 1); setIsFlipped(false); }}
                    className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 disabled:opacity-20 transition-colors"
                  >
                    <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L6.06 8l3.72 3.72a.75.75 0 010 1.06z"></path></svg>
                  </button>
                  <div className="px-4 py-1.5 rounded-full bg-zinc-100 text-xs font-bold font-mono">
                    {currentFlashcardIdx + 1} / {topic.flashcards.length}
                  </div>
                  <button
                    disabled={currentFlashcardIdx === topic.flashcards.length - 1}
                    onClick={() => { setCurrentFlashcardIdx(prev => prev + 1); setIsFlipped(false); }}
                    className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 disabled:opacity-20 transition-colors"
                  >
                    <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default CompetenciesView;
