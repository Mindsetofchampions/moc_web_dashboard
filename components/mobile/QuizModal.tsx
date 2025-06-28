// /* eslint-disable prefer-const */
// import React, { useState, useEffect, useRef } from 'react';

// interface QuizModalProps {
//   visible: boolean;
//   onClose: () => void;
//   quizId?: string;
//   onComplete: (score: number, attribute: string) => void;
// }

// interface QuizQuestion {
//   q: string;
//   o: string[];
//   a: number;
// }

// interface QuizData {
//   id: string;
//   title: string;
//   icon: string;
//   type: string;
//   attribute: string;
//   description: string;
//   timeLimitPerQuestion?: number;
//   questions?: QuizQuestion[];
//   rewards?: { points: number; gems?: number };
//   difficultySettings?: {
//     levelName: string;
//     operations: string[];
//     numRange: [number, number];
//     secondNumRange?: [number, number];
//     questionsCount: number;
//     timePerQuestion: number;
//     rewards: { points: number; gems?: number };
//   }[];
// }

// const quizDataStore: { [key: string]: QuizData } = {
//   'logic01': {
//     id: 'logic01',
//     title: 'Logic Circuit Bender',
//     icon: '🧠',
//     type: 'logic',
//     attribute: 'character',
//     description: 'Navigate the labyrinth of logic. Deduce correctly before the system overloads.',
//     timeLimitPerQuestion: 20,
//     questions: [
//       { q: "If all Blips are Zorgs, and some Zorgs are Flunks, are all Blips definitely Flunks?", o: ["Always True", "Always False", "Uncertain"], a: 2 },
//       { q: "A cyber-key unlocks either Gate A or Gate B, but not both. If Gate A is locked, Gate B must be:", o: ["Locked", "Unlocked", "Unknown"], a: 1 },
//       { q: "Three data streams: Red, Blue, Green. Red is faster than Blue. Green is slower than Blue. Which is fastest?", o: ["Red Stream", "Blue Stream", "Green Stream"], a: 0 }
//     ],
//     rewards: { points: 150, gems: 5 }
//   },
//   'math01': {
//     id: 'math01',
//     title: 'Math Attack: Velocity',
//     icon: '🧮',
//     type: 'math',
//     attribute: 'scholarship',
//     description: 'Crunch the numbers before the firewall breaches! Select your processing speed.',
//     difficultySettings: [
//       { levelName: "Cruising", operations: ['+', '-'], numRange: [1, 20], questionsCount: 5, timePerQuestion: 20, rewards: { points: 50, gems: 1 } },
//       { levelName: "Nitro", operations: ['+', '-', '*'], numRange: [1, 50], questionsCount: 10, timePerQuestion: 15, rewards: { points: 100, gems: 3 } },
//       { levelName: "Warp Speed", operations: ['+', '-'], numRange: [10, 99], secondNumRange: [1, 10], questionsCount: 15, timePerQuestion: 10, rewards: { points: 200, gems: 5 } }
//     ],
//   },
//   'health01': {
//     id: 'health01',
//     title: 'Wellness Workshop',
//     icon: '💚',
//     type: 'health',
//     attribute: 'health',
//     description: 'Optimize your biological systems. Knowledge is the foundation of peak performance.',
//     timeLimitPerQuestion: 18,
//     questions: [
//       { q: "How many hours of sleep do most adults need per night?", o: ["4-5 hours", "6-7 hours", "7-9 hours", "10+ hours"], a: 2 },
//       { q: "Which vitamin is primarily obtained from sunlight?", o: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], a: 2 },
//       { q: "What is the recommended daily water intake for adults?", o: ["4 cups", "6 cups", "8 cups", "12 cups"], a: 2 },
//       { q: "Which exercise type is best for cardiovascular health?", o: ["Weightlifting", "Aerobic", "Stretching", "Balance"], a: 1 },
//       { q: "What nutrient provides the most energy per gram?", o: ["Protein", "Carbohydrates", "Fat", "Fiber"], a: 2 }
//     ],
//     rewards: { points: 180, gems: 2 }
//   },
//   'scholar01': {
//     id: 'scholar01',
//     title: 'Knowledge Archive',
//     icon: '🎓',
//     type: 'scholar',
//     attribute: 'scholarship',
//     description: 'Dive deep into the data banks of human knowledge. Wisdom awaits the curious mind.',
//     timeLimitPerQuestion: 22,
//     questions: [
//       { q: "What is the speed of light in a vacuum?", o: ["299,792,458 m/s", "300,000,000 m/s", "186,000 mph", "Both A and C"], a: 3 },
//       { q: "Who wrote the novel '1984'?", o: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Isaac Asimov"], a: 1 },
//       { q: "What is the powerhouse of the cell?", o: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"], a: 2 },
//       { q: "In which year did the Berlin Wall fall?", o: ["1987", "1989", "1991", "1993"], a: 1 },
//       { q: "What is the largest planet in our solar system?", o: ["Saturn", "Neptune", "Jupiter", "Uranus"], a: 2 }
//     ],
//     rewards: { points: 250, gems: 4 }
//   },
//   'explore01': {
//     id: 'explore01',
//     title: 'Hidden Path Discovery',
//     icon: '🧭',
//     type: 'exploration',
//     attribute: 'exploration',
//     description: 'Venture into the unknown. Every discovery expands the boundaries of possibility.',
//     timeLimitPerQuestion: 20,
//     questions: [
//       { q: "What navigation tool uses magnetic fields to show direction?", o: ["GPS", "Compass", "Sextant", "Astrolabe"], a: 1 },
//       { q: "Which explorer is credited with first circumnavigating the globe?", o: ["Columbus", "Magellan's crew", "Vasco da Gama", "Captain Cook"], a: 1 },
//       { q: "What is the deepest part of Earth's oceans?", o: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"], a: 2 },
//       { q: "Which continent has the most countries?", o: ["Asia", "Europe", "Africa", "South America"], a: 2 },
//       { q: "What is the term for a detailed map of ocean depths?", o: ["Topographic", "Bathymetric", "Geological", "Meteorological"], a: 1 }
//     ],
//     rewards: { points: 300, gems: 4 }
//   },
//   'steward01': {
//     id: 'steward01',
//     title: 'Eco-Guardian Training',
//     icon: '🌳',
//     type: 'stewardship',
//     attribute: 'stewardship',
//     description: 'Learn to protect and nurture our shared environment. The future depends on wise guardianship.',
//     timeLimitPerQuestion: 20,
//     questions: [
//       { q: "What gas do trees absorb during photosynthesis?", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], a: 2 },
//       { q: "Which energy source is considered most environmentally friendly?", o: ["Coal", "Natural Gas", "Solar", "Nuclear"], a: 2 },
//       { q: "What percentage of Earth's water is freshwater?", o: ["1%", "3%", "10%", "25%"], a: 1 },
//       { q: "Which practice helps reduce landfill waste?", o: ["Recycling", "Composting", "Reusing", "All of the above"], a: 3 },
//       { q: "What is biodiversity?", o: ["Plant genetics", "Animal behavior", "Variety of life", "Ecosystem size"], a: 2 }
//     ],
//     rewards: { points: 220, gems: 3 }
//   }
// };

// const TIMER_RING_RADIUS = 26;
// const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * TIMER_RING_RADIUS;

// export default function QuizModal({ visible, onClose, quizId = 'logic01', onComplete }: QuizModalProps) {
//   const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
//   const [quizState, setQuizState] = useState<'intro' | 'gameplay' | 'results'>('intro');
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [playerScore, setPlayerScore] = useState(0);
//   const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [totalTimeTaken, setTotalTimeTaken] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
  
//   const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (visible && quizId) {
//       const quiz = JSON.parse(JSON.stringify(quizDataStore[quizId]));
//       if (quiz) {
//         setCurrentQuiz(quiz);
//         setQuizState('intro');
//         setCurrentQuestionIndex(0);
//         setPlayerScore(0);
//         setSelectedDifficultyIndex(0);
//         setTotalTimeTaken(0);
//         setSelectedAnswer(null);
//         setShowFeedback(false);
//       }
//     }
//   }, [visible, quizId]);

//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//     };
//   }, []);

//   const generateMathQuestions = (): QuizQuestion[] => {
//     if (!currentQuiz || currentQuiz.type !== 'math' || !currentQuiz.difficultySettings) return [];
    
//     const diffSetting = currentQuiz.difficultySettings[selectedDifficultyIndex];
//     const questions: QuizQuestion[] = [];

//     for (let i = 0; i < diffSetting.questionsCount; i++) {
//       const op = diffSetting.operations[Math.floor(Math.random() * diffSetting.operations.length)];
//       let n1 = Math.floor(Math.random() * (diffSetting.numRange[1] - diffSetting.numRange[0] + 1)) + diffSetting.numRange[0];
//       let n2_range = diffSetting.secondNumRange || diffSetting.numRange;
//       let n2 = Math.floor(Math.random() * (n2_range[1] - n2_range[0] + 1)) + n2_range[0];
//       let questionText: string;
//       let correctAnswer: number;
//       let options: number[] = [];

//       switch (op) {
//         case '+':
//           correctAnswer = n1 + n2;
//           questionText = `${n1} + ${n2} = ?`;
//           break;
//         case '-':
//           if (n1 < n2) [n1, n2] = [n2, n1];
//           correctAnswer = n1 - n2;
//           questionText = `${n1} - ${n2} = ?`;
//           break;
//         case '*':
//           correctAnswer = n1 * n2;
//           questionText = `${n1} × ${n2} = ?`;
//           break;
//         case '/':
//           if (n2 === 0) n2 = 1;
//           n1 = (Math.floor(Math.random() * Math.max(1, Math.floor(diffSetting.numRange[1] / n2))) + 1) * n2;
//           correctAnswer = n1 / n2;
//           questionText = `${n1} ÷ ${n2} = ?`;
//           break;
//         default:
//           correctAnswer = n1 + n2;
//           questionText = `${n1} + ${n2} = ?`;
//       }

//       options.push(correctAnswer);
//       let attempts = 0;
//       while (options.length < 4 && attempts < 20) {
//         let offsetMagnitude = Math.floor(Math.random() * Math.max(5, Math.abs(Math.floor(correctAnswer * 0.3)))) + 1;
//         let offset = (Math.random() > 0.5 ? 1 : -1) * offsetMagnitude;
//         if (offset === 0) offset = (Math.random() > 0.5 ? 1 : -1);
//         let wrongAnswer = correctAnswer + offset;
//         if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer) && wrongAnswer >= 0) {
//           options.push(wrongAnswer);
//         }
//         attempts++;
//       }
      
//       while (options.length < 4) {
//         options.push(Math.max(0, correctAnswer + (options.length + 1) * (options.length % 2 === 0 ? 1 : -1)));
//       }
      
//       options = [...new Set(options)].slice(0, 4);
//       if (!options.includes(correctAnswer)) {
//         options[Math.floor(Math.random() * options.length)] = correctAnswer;
//       }
      
//       // Shuffle options
//       for (let j = options.length - 1; j > 0; j--) {
//         const k = Math.floor(Math.random() * (j + 1));
//         [options[j], options[k]] = [options[k], options[j]];
//       }

//       questions.push({
//         q: questionText,
//         o: options.map(String),
//         a: options.indexOf(correctAnswer)
//       });
//     }

//     return questions;
//   };

//   const startQuiz = () => {
//     if (!currentQuiz) return;

//     let questionsToUse = currentQuiz.questions || [];
//     let timeLimitPerQuestion = currentQuiz.timeLimitPerQuestion || 15;

//     if (currentQuiz.type === 'math') {
//       questionsToUse = generateMathQuestions();
//       if (currentQuiz.difficultySettings) {
//         timeLimitPerQuestion = currentQuiz.difficultySettings[selectedDifficultyIndex].timePerQuestion;
//       }
//     }

//     setCurrentQuiz({
//       ...currentQuiz,
//       questions: questionsToUse,
//       timeLimitPerQuestion
//     });
//     setQuizState('gameplay');
//     setCurrentQuestionIndex(0);
//     setPlayerScore(0);
//     setTotalTimeTaken(0);
//     startQuestionTimer(timeLimitPerQuestion);
//   };

//   const startQuestionTimer = (duration: number) => {
//     setTimeLeft(duration);
//     setQuestionStartTime(Date.now());
//     setSelectedAnswer(null);
//     setShowFeedback(false);

//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }

//     timerIntervalRef.current = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           handleTimeout();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleTimeout = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
//     setTotalTimeTaken(prev => prev + (currentQuiz?.timeLimitPerQuestion || 15) * 1000);
//     handleAnswerFeedback(false, -1);
//   };

//   const selectAnswer = (answerIndex: number) => {
//     if (selectedAnswer !== null || !currentQuiz?.questions) return;

//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
    
//     setTotalTimeTaken(prev => prev + (Date.now() - questionStartTime));
//     const correct = answerIndex === currentQuiz.questions[currentQuestionIndex].a;
    
//     if (correct) {
//       setPlayerScore(prev => prev + 10);
//     }
    
//     handleAnswerFeedback(correct, answerIndex);
//   };

//   const handleAnswerFeedback = (correct: boolean, answerIndex: number) => {
//     setSelectedAnswer(answerIndex);
//     setIsCorrect(correct);
//     setShowFeedback(true);

//     setTimeout(() => {
//       if (currentQuestionIndex + 1 >= (currentQuiz?.questions?.length || 0)) {
//         endQuiz();
//       } else {
//         setCurrentQuestionIndex(prev => prev + 1);
//         startQuestionTimer(currentQuiz?.timeLimitPerQuestion || 15);
//       }
//     }, 1800);
//   };

//   const endQuiz = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
//     setQuizState('results');
//   };

//   const retryQuiz = () => {
//     setQuizState('intro');
//     setCurrentQuestionIndex(0);
//     setPlayerScore(0);
//     setTotalTimeTaken(0);
//     setSelectedAnswer(null);
//     setShowFeedback(false);
//   };

//   const handleQuizComplete = () => {
//     if (currentQuiz) {
//       onComplete(playerScore, currentQuiz.attribute);
//     }
//     onClose();
//   };

//   if (!visible || !currentQuiz) return null;

//   const numQuestions = currentQuiz.questions?.length || 0;
//   const correctAnswersCount = playerScore / 10;
//   const accuracy = numQuestions > 0 ? (correctAnswersCount / numQuestions) * 100 : 0;

//   const currentQuestion = currentQuiz.questions?.[currentQuestionIndex];
//   const timeLimitPerQuestion = currentQuiz.timeLimitPerQuestion || 15;
//   const elapsedRatio = (timeLimitPerQuestion - timeLeft) / timeLimitPerQuestion;
//   const strokeDashoffset = elapsedRatio * TIMER_RING_CIRCUMFERENCE;

//   const getAttributeColor = (attribute: string) => {
//     const colors = {
//       chess: '#8B4513',
//       character: '#FF1493',
//       health: '#32CD32',
//       exploration: '#FFD700',
//       scholarship: '#4169E1',
//       stewardship: '#228B22'
//     };
//     return colors[attribute as keyof typeof colors] || '#9370DB';
//   };

//   return (
//     <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[15px] saturate-150 z-[200] flex items-center justify-center" onClick={onClose}>
//       <div className="bg-gradient-to-[145deg] from-[rgba(23,22,46,0.95)] to-[rgba(75,0,130,0.5)] rounded-[25px] p-[30px_35px] w-[95%] max-w-[600px] h-auto max-h-[90vh] border-2 border-[#00FFFF] shadow-[0_0_30px_rgba(0,255,255,0.5),0_0_50px_rgba(138,43,226,0.6)] flex flex-col relative overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <button 
//           className="absolute top-5 right-5 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] text-[#A0AEC0] w-[30px] h-[30px] rounded-full text-base cursor-pointer hover:bg-[#00FFFF] hover:text-[#0D0C1D] transition-all duration-200 flex items-center justify-center z-10"
//           onClick={onClose}
//         >
//           ×
//         </button>

//         {/* Quiz Intro State */}
//         {quizState === 'intro' && (
//           <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
//             <div className="mb-5 border-b border-dashed border-[rgba(0,255,255,0.2)] pb-5 w-full">
//               <span className="text-[48px] text-[#00FFFF] drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] mb-[10px] block">{currentQuiz.icon}</span>
//               <h2 className="font-['Orbitron'] text-[28px] text-[#9370DB] mb-[5px]">{currentQuiz.title}</h2>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] text-sm font-medium border" style={{
//                 backgroundColor: `${getAttributeColor(currentQuiz.attribute)}20`,
//                 borderColor: `${getAttributeColor(currentQuiz.attribute)}50`,
//                 color: getAttributeColor(currentQuiz.attribute)
//               }}>
//                 <span>+{currentQuiz.attribute.charAt(0).toUpperCase() + currentQuiz.attribute.slice(1)} Attribute</span>
//               </div>
//             </div>
//             <p className="text-[15px] text-[#A0AEC0] leading-[1.6] mb-[25px] max-w-[90%]">{currentQuiz.description}</p>
            
//             {currentQuiz.type === 'math' && currentQuiz.difficultySettings && (
//               <div className="mb-[25px] w-full p-[15px] bg-[rgba(0,0,0,0.2)] rounded-[10px]">
//                 <label className="block mb-[10px] text-[#9370DB] font-semibold text-sm">
//                   Select Difficulty: <span className="text-[#00FFFF] font-bold">{currentQuiz.difficultySettings[selectedDifficultyIndex].levelName}</span>
//                 </label>
//                 <input 
//                   type="range" 
//                   min="0" 
//                   max={currentQuiz.difficultySettings.length - 1}
//                   value={selectedDifficultyIndex}
//                   onChange={(e) => setSelectedDifficultyIndex(parseInt(e.target.value))}
//                   className="w-[80%] h-2 bg-[rgba(138,43,226,0.3)] rounded-[5px] outline-none opacity-80 hover:opacity-100 transition-opacity cursor-pointer mt-[5px] appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:bg-[#00FFFF] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0D0C1D] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,255,0.5)] [&::-webkit-slider-thumb]:cursor-pointer"
//                 />
//               </div>
//             )}
            
//             <div className="flex justify-around w-full mb-[30px] text-sm text-[#718096]">
//               <p>Questions: <span className="text-[#E0E0E0] font-bold">
//                 {currentQuiz.type === 'math' && currentQuiz.difficultySettings 
//                   ? currentQuiz.difficultySettings[selectedDifficultyIndex].questionsCount 
//                   : currentQuiz.questions?.length || 'N/A'}
//               </span></p>
//               <p>Time Limit: <span className="text-[#E0E0E0] font-bold">
//                 {currentQuiz.type === 'math' && currentQuiz.difficultySettings 
//                   ? `${currentQuiz.difficultySettings[selectedDifficultyIndex].questionsCount * currentQuiz.difficultySettings[selectedDifficultyIndex].timePerQuestion}s`
//                   : currentQuiz.questions ? `${currentQuiz.questions.length * (currentQuiz.timeLimitPerQuestion || 15)}s` : 'N/A'}
//               </span></p>
//             </div>
//             <button 
//               className="w-full p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-[18px] font-semibold cursor-pointer hover:shadow-[0_0_20px_rgba(138,43,226,0.7)] transition-all duration-300"
//               onClick={startQuiz}
//             >
//               Start Challenge
//             </button>
//           </div>
//         )}

//         {/* Quiz Gameplay State */}
//         {quizState === 'gameplay' && currentQuestion && (
//           <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
//             <div className="flex justify-between items-center w-full py-[10px] mb-5 border-b border-[rgba(0,255,255,0.2)]">
//               <div className="text-sm text-[#A0AEC0] bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-lg">
//                 Question <span className="text-[#FF00FF] font-bold">{currentQuestionIndex + 1}</span> of <span className="text-[#FF00FF] font-bold">{numQuestions}</span>
//               </div>
//               <div className="flex items-center text-lg font-bold text-[#00FFFF] relative">
//                 <svg className="mr-2" width="60" height="60">
//                   <circle stroke="rgba(0,255,255,0.2)" strokeWidth="4" fill="transparent" r="26" cx="30" cy="30"/>
//                   <circle 
//                     stroke="#00FFFF" 
//                     strokeWidth="4" 
//                     fill="transparent" 
//                     r="26" 
//                     cx="30" 
//                     cy="30" 
//                     strokeLinecap="round" 
//                     transform="rotate(-90 30 30)"
//                     style={{
//                       strokeDasharray: `${TIMER_RING_CIRCUMFERENCE} ${TIMER_RING_CIRCUMFERENCE}`,
//                       strokeDashoffset: strokeDashoffset,
//                       transition: 'stroke-dashoffset 0.2s linear'
//                     }}
//                   />
//                 </svg>
//                 <span>{timeLeft}s</span>
//               </div>
//               <div className="text-sm text-[#A0AEC0] bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-lg">
//                 Score: <span className="text-[#FF00FF] font-bold">{playerScore}</span>
//               </div>
//             </div>

//             <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] p-[25px_20px] rounded-[15px] mb-[25px] min-h-[100px] flex items-center justify-center w-full shadow-[inset_0_0_15px_rgba(0,255,255,0.1)]">
//               <p className="text-xl font-semibold leading-[1.5] text-[#E0E0E0]">{currentQuestion.q}</p>
//             </div>

//             <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[15px] w-full mb-5">
//               {currentQuestion.o.map((option, index) => {
//                 let buttonClass = "bg-[rgba(138,43,226,0.2)] border-2 border-[#9370DB] text-[#E0E0E0] p-[15px] rounded-[12px] text-base cursor-pointer transition-all duration-200 ease-in-out text-left min-h-[60px] flex items-center";
                
//                 if (showFeedback) {
//                   buttonClass += " opacity-60 pointer-events-none";
//                   if (selectedAnswer === index) {
//                     buttonClass += isCorrect ? " !bg-[#32CD32] !border-[#32CD32] !text-white animate-[pulseCorrect_0.5s_ease]" : " !bg-[#00FFFF] !border-[#00FFFF] !text-white animate-[shakeIncorrect_0.5s_ease]";
//                   }
//                   if (!isCorrect && index === currentQuestion.a) {
//                     buttonClass += " !bg-[#32CD32] !border-[#32CD32] !text-white";
//                   }
//                 } else {
//                   buttonClass += " hover:bg-[#9370DB] hover:border-[#00FFFF] hover:text-white hover:transform hover:translate-y-[-3px] hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(138,43,226,0.6)]";
//                 }

//                 return (
//                   <button
//                     key={index}
//                     className={buttonClass}
//                     onClick={() => selectAnswer(index)}
//                     disabled={showFeedback}
//                   >
//                     {option}
//                   </button>
//                 );
//               })}
//             </div>

//             {showFeedback && (
//               <div className={`min-h-[20px] mt-[10px] font-bold text-base ${isCorrect ? 'text-[#32CD32]' : 'text-[#00FFFF]'}`}>
//                 {isCorrect ? "CORRECT! +10 POINTS" : selectedAnswer === -1 ? "TIME'S UP!" : "INCORRECT!"}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Quiz Results State */}
//         {quizState === 'results' && (
//           <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
//             <div className="mb-[25px]">
//               <span className="text-[60px] mb-[10px] block text-[#FFA500] drop-shadow-[0_0_20px_#FFA500]">
//                 {playerScore > (numQuestions * 10 * 0.6) ? '🏆' : playerScore > 0 ? '💾' : '⚠️'}
//               </span>
//               <h2 className="font-['Orbitron'] text-[30px] text-[#9370DB]">
//                 {playerScore > (numQuestions * 10 * 0.6) ? "MASTERY ACHIEVED!" : playerScore > 0 ? "CHALLENGE COMPLETE" : "TRAINING NEEDED"}
//               </h2>
//             </div>

//             <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px] w-full mb-[30px] bg-[rgba(0,0,0,0.2)] p-5 rounded-[10px]">
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Final Score</span>
//                 <span className="text-2xl font-bold text-[#FFA500]">{playerScore}</span>
//               </div>
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Correct Answers</span>
//                 <span className="text-xl font-bold text-[#E0E0E0]">{correctAnswersCount}/{numQuestions}</span>
//               </div>
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Accuracy</span>
//                 <span className="text-xl font-bold text-[#E0E0E0]">{accuracy.toFixed(0)}%</span>
//               </div>
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Time Taken</span>
//                 <span className="text-xl font-bold text-[#E0E0E0]">{(totalTimeTaken / 1000).toFixed(1)}s</span>
//               </div>
//             </div>

//             {playerScore > 0 && (
//               <div className="mb-[25px] p-[15px] bg-[rgba(255,0,255,0.1)] border border-[#FF00FF] rounded-[10px] w-full">
//                 <h3 className="text-[#FF00FF] font-['Orbitron'] mb-2">Attribute Growth!</h3>
//                 <p className="text-[#E0E0E0]">
//                   {currentQuiz.attribute.charAt(0).toUpperCase() + currentQuiz.attribute.slice(1)} +{Math.floor(playerScore * 0.1)} | Credits +{playerScore * 10} | XP +{playerScore}
//                 </p>
//               </div>
//             )}

//             <div className="flex gap-[15px] w-full justify-center">
//               <button 
//                 className="flex-1 max-w-[200px] p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-[15px] font-semibold cursor-pointer hover:brightness-[1.2] transition-all duration-300"
//                 onClick={retryQuiz}
//               >
//                 Retry
//               </button>
//               <button 
//                 className="flex-1 max-w-[200px] p-4 bg-[rgba(255,255,255,0.1)] border border-[rgba(0,255,255,0.2)] text-[#E0E0E0] rounded-[15px] text-[15px] font-semibold cursor-pointer hover:bg-[rgba(255,255,255,0.15)] hover:border-[#00FFFF] transition-all duration-300"
//                 onClick={handleQuizComplete}
//               >
//                 Complete
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect, useRef } from 'react';

// interface QuizModalProps {
//   visible: boolean;
//   onClose: () => void;
//   quizId?: string;
//   quests: any[];
//   onComplete: (score: number, questId: string) => void;
// }

// interface QuizQuestion {
//   q: string;
//   o: string[];
//   a: number;
// }

// interface QuizData {
//   id: string;
//   title: string;
//   icon: string;
//   type: string;
//   attribute: string;
//   description: string;
//   timeLimitPerQuestion?: number;
//   questions?: QuizQuestion[];
//   rewards?: { points: number; gems?: number };
//   difficultySettings?: {
//     levelName: string;
//     operations: string[];
//     numRange: [number, number];
//     secondNumRange?: [number, number];
//     questionsCount: number;
//     timePerQuestion: number;
//     rewards: { points: number; gems?: number };
//   }[];
// }

// const quizDataStore: { [key: string]: QuizData } = {
//   'logic01': {
//     id: 'logic01',
//     title: 'Logic Circuit Bender',
//     icon: '🧠',
//     type: 'logic',
//     attribute: 'character',
//     description: 'Navigate the labyrinth of logic. Deduce correctly before the system overloads.',
//     timeLimitPerQuestion: 20,
//     questions: [
//       { q: "If all Blips are Zorgs, and some Zorgs are Flunks, are all Blips definitely Flunks?", o: ["Always True", "Always False", "Uncertain"], a: 2 },
//       { q: "A cyber-key unlocks either Gate A or Gate B, but not both. If Gate A is locked, Gate B must be:", o: ["Locked", "Unlocked", "Unknown"], a: 1 },
//       { q: "Three data streams: Red, Blue, Green. Red is faster than Blue. Green is slower than Blue. Which is fastest?", o: ["Red Stream", "Blue Stream", "Green Stream"], a: 0 }
//     ],
//     rewards: { points: 150, gems: 5 }
//   },
//   'math01': {
//     id: 'math01',
//     title: 'Math Attack: Velocity',
//     icon: '🧮',
//     type: 'math',
//     attribute: 'scholarship',
//     description: 'Crunch the numbers before the firewall breaches! Select your processing speed.',
//     difficultySettings: [
//       { levelName: "Cruising", operations: ['+', '-'], numRange: [1, 20], questionsCount: 5, timePerQuestion: 20, rewards: { points: 50, gems: 1 } },
//       { levelName: "Nitro", operations: ['+', '-', '*'], numRange: [1, 50], questionsCount: 10, timePerQuestion: 15, rewards: { points: 100, gems: 3 } },
//       { levelName: "Warp Speed", operations: ['+', '-'], numRange: [10, 99], secondNumRange: [1, 10], questionsCount: 15, timePerQuestion: 10, rewards: { points: 200, gems: 5 } }
//     ],
//   },
//   'health01': {
//     id: 'health01',
//     title: 'Wellness Workshop',
//     icon: '💚',
//     type: 'health',
//     attribute: 'health',
//     description: 'Optimize your biological systems. Knowledge is the foundation of peak performance.',
//     timeLimitPerQuestion: 18,
//     questions: [
//       { q: "How many hours of sleep do most adults need per night?", o: ["4-5 hours", "6-7 hours", "7-9 hours", "10+ hours"], a: 2 },
//       { q: "Which vitamin is primarily obtained from sunlight?", o: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], a: 2 },
//       { q: "What is the recommended daily water intake for adults?", o: ["4 cups", "6 cups", "8 cups", "12 cups"], a: 2 },
//       { q: "Which exercise type is best for cardiovascular health?", o: ["Weightlifting", "Aerobic", "Stretching", "Balance"], a: 1 },
//       { q: "What nutrient provides the most energy per gram?", o: ["Protein", "Carbohydrates", "Fat", "Fiber"], a: 2 }
//     ],
//     rewards: { points: 180, gems: 2 }
//   },
//   'scholar01': {
//     id: 'scholar01',
//     title: 'Knowledge Archive',
//     icon: '🎓',
//     type: 'scholar',
//     attribute: 'scholarship',
//     description: 'Dive deep into the data banks of human knowledge. Wisdom awaits the curious mind.',
//     timeLimitPerQuestion: 22,
//     questions: [
//       { q: "What is the speed of light in a vacuum?", o: ["299,792,458 m/s", "300,000,000 m/s", "186,000 mph", "Both A and C"], a: 3 },
//       { q: "Who wrote the novel '1984'?", o: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Isaac Asimov"], a: 1 },
//       { q: "What is the powerhouse of the cell?", o: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"], a: 2 },
//       { q: "In which year did the Berlin Wall fall?", o: ["1987", "1989", "1991", "1993"], a: 1 },
//       { q: "What is the largest planet in our solar system?", o: ["Saturn", "Neptune", "Jupiter", "Uranus"], a: 2 }
//     ],
//     rewards: { points: 250, gems: 4 }
//   },
//   'explore01': {
//     id: 'explore01',
//     title: 'Hidden Path Discovery',
//     icon: '🧭',
//     type: 'exploration',
//     attribute: 'exploration',
//     description: 'Venture into the unknown. Every discovery expands the boundaries of possibility.',
//     timeLimitPerQuestion: 20,
//     questions: [
//       { q: "What navigation tool uses magnetic fields to show direction?", o: ["GPS", "Compass", "Sextant", "Astrolabe"], a: 1 },
//       { q: "Which explorer is credited with first circumnavigating the globe?", o: ["Columbus", "Magellan's crew", "Vasco da Gama", "Captain Cook"], a: 1 },
//       { q: "What is the deepest part of Earth's oceans?", o: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"], a: 2 },
//       { q: "Which continent has the most countries?", o: ["Asia", "Europe", "Africa", "South America"], a: 2 },
//       { q: "What is the term for a detailed map of ocean depths?", o: ["Topographic", "Bathymetric", "Geological", "Meteorological"], a: 1 }
//     ],
//     rewards: { points: 300, gems: 4 }
//   },
//   'steward01': {
//     id: 'steward01',
//     title: 'Eco-Guardian Training',
//     icon: '🌳',
//     type: 'stewardship',
//     attribute: 'stewardship',
//     description: 'Learn to protect and nurture our shared environment. The future depends on wise guardianship.',
//     timeLimitPerQuestion: 20,
//     questions: [
//       { q: "What gas do trees absorb during photosynthesis?", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], a: 2 },
//       { q: "Which energy source is considered most environmentally friendly?", o: ["Coal", "Natural Gas", "Solar", "Nuclear"], a: 2 },
//       { q: "What percentage of Earth's water is freshwater?", o: ["1%", "3%", "10%", "25%"], a: 1 },
//       { q: "Which practice helps reduce landfill waste?", o: ["Recycling", "Composting", "Reusing", "All of the above"], a: 3 },
//       { q: "What is biodiversity?", o: ["Plant genetics", "Animal behavior", "Variety of life", "Ecosystem size"], a: 2 }
//     ],
//     rewards: { points: 220, gems: 3 }
//   }
// };

// const TIMER_RING_RADIUS = 26;
// const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * TIMER_RING_RADIUS;

// export default function QuizModal({ visible, onClose, quizId = 'logic01', quests, onComplete }: QuizModalProps) {
//   const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
//   const [quizState, setQuizState] = useState<'intro' | 'gameplay' | 'results'>('intro');
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [playerScore, setPlayerScore] = useState(0);
//   const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [totalTimeTaken, setTotalTimeTaken] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
  
//   const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (visible && quizId) {
//       // First check if it's a backend quest
//       const backendQuest = quests.find(q => q.id === quizId);
      
//       if (backendQuest) {
//         // Transform backend quest to quiz format
//         const transformedQuiz: QuizData = {
//           id: backendQuest.id,
//           title: backendQuest.title || backendQuest.name || 'Unknown Quest',
//           icon: backendQuest.icon || getAttributeIcon(backendQuest.attribute),
//           type: backendQuest.type || 'custom',
//           attribute: backendQuest.attribute || 'character',
//           description: backendQuest.description || 'Complete this challenge to earn rewards!',
//           timeLimitPerQuestion: backendQuest.timeLimit || 20,
//           questions: backendQuest.questions || generateDefaultQuestions(backendQuest.attribute),
//           rewards: { 
//             points: backendQuest.xpReward || 100, 
//             gems: backendQuest.coinReward ? Math.floor(backendQuest.coinReward / 100) : 2 
//           }
//         };
//         setCurrentQuiz(transformedQuiz);
//       } else {
//         // Use static quiz data
//         const quiz = JSON.parse(JSON.stringify(quizDataStore[quizId]));
//         if (quiz) {
//           setCurrentQuiz(quiz);
//         }
//       }
      
//       setQuizState('intro');
//       setCurrentQuestionIndex(0);
//       setPlayerScore(0);
//       setSelectedDifficultyIndex(0);
//       setTotalTimeTaken(0);
//       setSelectedAnswer(null);
//       setShowFeedback(false);
//     }
//   }, [visible, quizId, quests]);

//   const getAttributeIcon = (attribute: string) => {
//     const icons = {
//       character: '🎭',
//       health: '💚',
//       exploration: '🧭',
//       scholarship: '🎓',
//       stewardship: '🌳'
//     };
//     return icons[attribute as keyof typeof icons] || '🎯';
//   };

//   const generateDefaultQuestions = (attribute: string): QuizQuestion[] => {
//     // Generate some basic questions based on attribute
//     const defaultQuestions: { [key: string]: QuizQuestion[] } = {
//       character: [
//         { q: "What is the most important trait of a leader?", o: ["Intelligence", "Integrity", "Charisma", "Strength"], a: 1 },
//         { q: "How should you handle a disagreement?", o: ["Avoid it", "Fight", "Listen and discuss", "Give up"], a: 2 }
//       ],
//       health: [
//         { q: "What is essential for good health?", o: ["Fast food", "Exercise", "Screen time", "Stress"], a: 1 },
//         { q: "How much water should you drink daily?", o: ["1 cup", "4 cups", "8 cups", "16 cups"], a: 2 }
//       ],
//       exploration: [
//         { q: "What tool helps with navigation?", o: ["Hammer", "Compass", "Spoon", "Calculator"], a: 1 },
//         { q: "What should you bring when exploring?", o: ["Map", "TV", "Chair", "Bed"], a: 0 }
//       ],
//       scholarship: [
//         { q: "What is 2 + 2?", o: ["3", "4", "5", "6"], a: 1 },
//         { q: "What is the capital of France?", o: ["London", "Paris", "Berlin", "Rome"], a: 1 }
//       ],
//       stewardship: [
//         { q: "How can you help the environment?", o: ["Litter", "Recycle", "Waste water", "Cut trees"], a: 1 },
//         { q: "What is renewable energy?", o: ["Coal", "Oil", "Solar", "Gas"], a: 2 }
//       ]
//     };

//     return defaultQuestions[attribute] || defaultQuestions.character;
//   };

//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//     };
//   }, []);

//   const generateMathQuestions = (): QuizQuestion[] => {
//     if (!currentQuiz || currentQuiz.type !== 'math' || !currentQuiz.difficultySettings) return [];
    
//     const diffSetting = currentQuiz.difficultySettings[selectedDifficultyIndex];
//     const questions: QuizQuestion[] = [];

//     for (let i = 0; i < diffSetting.questionsCount; i++) {
//       const op = diffSetting.operations[Math.floor(Math.random() * diffSetting.operations.length)];
//       let n1 = Math.floor(Math.random() * (diffSetting.numRange[1] - diffSetting.numRange[0] + 1)) + diffSetting.numRange[0];
//       let n2_range = diffSetting.secondNumRange || diffSetting.numRange;
//       let n2 = Math.floor(Math.random() * (n2_range[1] - n2_range[0] + 1)) + n2_range[0];
//       let questionText: string;
//       let correctAnswer: number;
//       let options: number[] = [];

//       switch (op) {
//         case '+':
//           correctAnswer = n1 + n2;
//           questionText = `${n1} + ${n2} = ?`;
//           break;
//         case '-':
//           if (n1 < n2) [n1, n2] = [n2, n1];
//           correctAnswer = n1 - n2;
//           questionText = `${n1} - ${n2} = ?`;
//           break;
//         case '*':
//           correctAnswer = n1 * n2;
//           questionText = `${n1} × ${n2} = ?`;
//           break;
//         case '/':
//           if (n2 === 0) n2 = 1;
//           n1 = (Math.floor(Math.random() * Math.max(1, Math.floor(diffSetting.numRange[1] / n2))) + 1) * n2;
//           correctAnswer = n1 / n2;
//           questionText = `${n1} ÷ ${n2} = ?`;
//           break;
//         default:
//           correctAnswer = n1 + n2;
//           questionText = `${n1} + ${n2} = ?`;
//       }

//       options.push(correctAnswer);
//       let attempts = 0;
//       while (options.length < 4 && attempts < 20) {
//         let offsetMagnitude = Math.floor(Math.random() * Math.max(5, Math.abs(Math.floor(correctAnswer * 0.3)))) + 1;
//         let offset = (Math.random() > 0.5 ? 1 : -1) * offsetMagnitude;
//         if (offset === 0) offset = (Math.random() > 0.5 ? 1 : -1);
//         let wrongAnswer = correctAnswer + offset;
//         if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer) && wrongAnswer >= 0) {
//           options.push(wrongAnswer);
//         }
//         attempts++;
//       }
      
//       while (options.length < 4) {
//         options.push(Math.max(0, correctAnswer + (options.length + 1) * (options.length % 2 === 0 ? 1 : -1)));
//       }
      
//       options = [...new Set(options)].slice(0, 4);
//       if (!options.includes(correctAnswer)) {
//         options[Math.floor(Math.random() * options.length)] = correctAnswer;
//       }
      
//       // Shuffle options
//       for (let j = options.length - 1; j > 0; j--) {
//         const k = Math.floor(Math.random() * (j + 1));
//         [options[j], options[k]] = [options[k], options[j]];
//       }

//       questions.push({
//         q: questionText,
//         o: options.map(String),
//         a: options.indexOf(correctAnswer)
//       });
//     }

//     return questions;
//   };

//   const startQuiz = () => {
//     if (!currentQuiz) return;

//     let questionsToUse = currentQuiz.questions || [];
//     let timeLimitPerQuestion = currentQuiz.timeLimitPerQuestion || 15;

//     if (currentQuiz.type === 'math') {
//       questionsToUse = generateMathQuestions();
//       if (currentQuiz.difficultySettings) {
//         timeLimitPerQuestion = currentQuiz.difficultySettings[selectedDifficultyIndex].timePerQuestion;
//       }
//     }

//     setCurrentQuiz({
//       ...currentQuiz,
//       questions: questionsToUse,
//       timeLimitPerQuestion
//     });
//     setQuizState('gameplay');
//     setCurrentQuestionIndex(0);
//     setPlayerScore(0);
//     setTotalTimeTaken(0);
//     startQuestionTimer(timeLimitPerQuestion);
//   };

//   const startQuestionTimer = (duration: number) => {
//     setTimeLeft(duration);
//     setQuestionStartTime(Date.now());
//     setSelectedAnswer(null);
//     setShowFeedback(false);

//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }

//     timerIntervalRef.current = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           handleTimeout();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleTimeout = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
//     setTotalTimeTaken(prev => prev + (currentQuiz?.timeLimitPerQuestion || 15) * 1000);
//     handleAnswerFeedback(false, -1);
//   };

//   const selectAnswer = (answerIndex: number) => {
//     if (selectedAnswer !== null || !currentQuiz?.questions) return;

//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
    
//     setTotalTimeTaken(prev => prev + (Date.now() - questionStartTime));
//     const correct = answerIndex === currentQuiz.questions[currentQuestionIndex].a;
    
//     if (correct) {
//       setPlayerScore(prev => prev + 10);
//     }
    
//     handleAnswerFeedback(correct, answerIndex);
//   };

//   const handleAnswerFeedback = (correct: boolean, answerIndex: number) => {
//     setSelectedAnswer(answerIndex);
//     setIsCorrect(correct);
//     setShowFeedback(true);

//     setTimeout(() => {
//       if (currentQuestionIndex + 1 >= (currentQuiz?.questions?.length || 0)) {
//         endQuiz();
//       } else {
//         setCurrentQuestionIndex(prev => prev + 1);
//         startQuestionTimer(currentQuiz?.timeLimitPerQuestion || 15);
//       }
//     }, 1800);
//   };

//   const endQuiz = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
//     setQuizState('results');
//   };

//   const retryQuiz = () => {
//     setQuizState('intro');
//     setCurrentQuestionIndex(0);
//     setPlayerScore(0);
//     setTotalTimeTaken(0);
//     setSelectedAnswer(null);
//     setShowFeedback(false);
//   };

//   const handleQuizComplete = () => {
//     if (currentQuiz && quizId) {
//       onComplete(playerScore, quizId);
//     }
//     onClose();
//   };

//   if (!visible || !currentQuiz) return null;

//   const numQuestions = currentQuiz.questions?.length || 0;
//   const correctAnswersCount = playerScore / 10;
//   const accuracy = numQuestions > 0 ? (correctAnswersCount / numQuestions) * 100 : 0;

//   const currentQuestion = currentQuiz.questions?.[currentQuestionIndex];
//   const timeLimitPerQuestion = currentQuiz.timeLimitPerQuestion || 15;
//   const elapsedRatio = (timeLimitPerQuestion - timeLeft) / timeLimitPerQuestion;
//   const strokeDashoffset = elapsedRatio * TIMER_RING_CIRCUMFERENCE;

//   const getAttributeColor = (attribute: string) => {
//     const colors = {
//       chess: '#8B4513',
//       character: '#FF1493',
//       health: '#32CD32',
//       exploration: '#FFD700',
//       scholarship: '#4169E1',
//       stewardship: '#228B22'
//     };
//     return colors[attribute as keyof typeof colors] || '#9370DB';
//   };

//   return (
//     <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[15px] saturate-150 z-[200] flex items-center justify-center" onClick={onClose}>
//       <div className="bg-gradient-to-[145deg] from-[rgba(23,22,46,0.95)] to-[rgba(75,0,130,0.5)] rounded-[25px] p-[30px_35px] w-[95%] max-w-[600px] h-auto max-h-[90vh] border-2 border-[#00FFFF] shadow-[0_0_30px_rgba(0,255,255,0.5),0_0_50px_rgba(138,43,226,0.6)] flex flex-col relative overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <button 
//           className="absolute top-5 right-5 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] text-[#A0AEC0] w-[30px] h-[30px] rounded-full text-base cursor-pointer hover:bg-[#00FFFF] hover:text-[#0D0C1D] transition-all duration-200 flex items-center justify-center z-10"
//           onClick={onClose}
//         >
//           ×
//         </button>

//         {/* Quiz Intro State */}
//         {quizState === 'intro' && (
//           <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
//             <div className="mb-5 border-b border-dashed border-[rgba(0,255,255,0.2)] pb-5 w-full">
//               <span className="text-[48px] text-[#00FFFF] drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] mb-[10px] block">{currentQuiz.icon}</span>
//               <h2 className="font-['Orbitron'] text-[28px] text-[#9370DB] mb-[5px]">{currentQuiz.title}</h2>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] text-sm font-medium border" style={{
//                 backgroundColor: `${getAttributeColor(currentQuiz.attribute)}20`,
//                 borderColor: `${getAttributeColor(currentQuiz.attribute)}50`,
//                 color: getAttributeColor(currentQuiz.attribute)
//               }}>
//                 <span>+{currentQuiz.attribute.charAt(0).toUpperCase() + currentQuiz.attribute.slice(1)} Attribute</span>
//               </div>
//             </div>
//             <p className="text-[15px] text-[#A0AEC0] leading-[1.6] mb-[25px] max-w-[90%]">{currentQuiz.description}</p>
            
//             {currentQuiz.type === 'math' && currentQuiz.difficultySettings && (
//               <div className="mb-[25px] w-full p-[15px] bg-[rgba(0,0,0,0.2)] rounded-[10px]">
//                 <label className="block mb-[10px] text-[#9370DB] font-semibold text-sm">
//                   Select Difficulty: <span className="text-[#00FFFF] font-bold">{currentQuiz.difficultySettings[selectedDifficultyIndex].levelName}</span>
//                 </label>
//                 <input 
//                   type="range" 
//                   min="0" 
//                   max={currentQuiz.difficultySettings.length - 1}
//                   value={selectedDifficultyIndex}
//                   onChange={(e) => setSelectedDifficultyIndex(parseInt(e.target.value))}
//                   className="w-[80%] h-2 bg-[rgba(138,43,226,0.3)] rounded-[5px] outline-none opacity-80 hover:opacity-100 transition-opacity cursor-pointer mt-[5px] appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:bg-[#00FFFF] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0D0C1D] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,255,0.5)] [&::-webkit-slider-thumb]:cursor-pointer"
//                 />
//               </div>
//             )}
            
//             <div className="flex justify-around w-full mb-[30px] text-sm text-[#718096]">
//               <p>Questions: <span className="text-[#E0E0E0] font-bold">
//                 {currentQuiz.type === 'math' && currentQuiz.difficultySettings 
//                   ? currentQuiz.difficultySettings[selectedDifficultyIndex].questionsCount 
//                   : currentQuiz.questions?.length || 'N/A'}
//               </span></p>
//               <p>Time Limit: <span className="text-[#E0E0E0] font-bold">
//                 {currentQuiz.type === 'math' && currentQuiz.difficultySettings 
//                   ? `${currentQuiz.difficultySettings[selectedDifficultyIndex].questionsCount * currentQuiz.difficultySettings[selectedDifficultyIndex].timePerQuestion}s`
//                   : currentQuiz.questions ? `${currentQuiz.questions.length * (currentQuiz.timeLimitPerQuestion || 15)}s` : 'N/A'}
//               </span></p>
//             </div>
//             <button 
//               className="w-full p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-[18px] font-semibold cursor-pointer hover:shadow-[0_0_20px_rgba(138,43,226,0.7)] transition-all duration-300"
//               onClick={startQuiz}
//             >
//               Start Challenge
//             </button>
//           </div>
//         )}

//         {/* Quiz Gameplay State */}
//         {quizState === 'gameplay' && currentQuestion && (
//           <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
//             <div className="flex justify-between items-center w-full py-[10px] mb-5 border-b border-[rgba(0,255,255,0.2)]">
//               <div className="text-sm text-[#A0AEC0] bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-lg">
//                 Question <span className="text-[#FF00FF] font-bold">{currentQuestionIndex + 1}</span> of <span className="text-[#FF00FF] font-bold">{numQuestions}</span>
//               </div>
//               <div className="flex items-center text-lg font-bold text-[#00FFFF] relative">
//                 <svg className="mr-2" width="60" height="60">
//                   <circle stroke="rgba(0,255,255,0.2)" strokeWidth="4" fill="transparent" r="26" cx="30" cy="30"/>
//                   <circle 
//                     stroke="#00FFFF" 
//                     strokeWidth="4" 
//                     fill="transparent" 
//                     r="26" 
//                     cx="30" 
//                     cy="30" 
//                     strokeLinecap="round" 
//                     transform="rotate(-90 30 30)"
//                     style={{
//                       strokeDasharray: `${TIMER_RING_CIRCUMFERENCE} ${TIMER_RING_CIRCUMFERENCE}`,
//                       strokeDashoffset: strokeDashoffset,
//                       transition: 'stroke-dashoffset 0.2s linear'
//                     }}
//                   />
//                 </svg>
//                 <span>{timeLeft}s</span>
//               </div>
//               <div className="text-sm text-[#A0AEC0] bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-lg">
//                 Score: <span className="text-[#FF00FF] font-bold">{playerScore}</span>
//               </div>
//             </div>

//             <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] p-[25px_20px] rounded-[15px] mb-[25px] min-h-[100px] flex items-center justify-center w-full shadow-[inset_0_0_15px_rgba(0,255,255,0.1)]">
//               <p className="text-xl font-semibold leading-[1.5] text-[#E0E0E0]">{currentQuestion.q}</p>
//             </div>

//             <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[15px] w-full mb-5">
//               {currentQuestion.o.map((option, index) => {
//                 let buttonClass = "bg-[rgba(138,43,226,0.2)] border-2 border-[#9370DB] text-[#E0E0E0] p-[15px] rounded-[12px] text-base cursor-pointer transition-all duration-200 ease-in-out text-left min-h-[60px] flex items-center";
                
//                 if (showFeedback) {
//                   buttonClass += " opacity-60 pointer-events-none";
//                   if (selectedAnswer === index) {
//                     buttonClass += isCorrect ? " !bg-[#32CD32] !border-[#32CD32] !text-white animate-[pulseCorrect_0.5s_ease]" : " !bg-[#00FFFF] !border-[#00FFFF] !text-white animate-[shakeIncorrect_0.5s_ease]";
//                   }
//                   if (!isCorrect && index === currentQuestion.a) {
//                     buttonClass += " !bg-[#32CD32] !border-[#32CD32] !text-white";
//                   }
//                 } else {
//                   buttonClass += " hover:bg-[#9370DB] hover:border-[#00FFFF] hover:text-white hover:transform hover:translate-y-[-3px] hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(138,43,226,0.6)]";
//                 }

//                 return (
//                   <button
//                     key={index}
//                     className={buttonClass}
//                     onClick={() => selectAnswer(index)}
//                     disabled={showFeedback}
//                   >
//                     {option}
//                   </button>
//                 );
//               })}
//             </div>

//             {showFeedback && (
//               <div className={`min-h-[20px] mt-[10px] font-bold text-base ${isCorrect ? 'text-[#32CD32]' : 'text-[#00FFFF]'}`}>
//                 {isCorrect ? "CORRECT! +10 POINTS" : selectedAnswer === -1 ? "TIME'S UP!" : "INCORRECT!"}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Quiz Results State */}
//         {quizState === 'results' && (
//           <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
//             <div className="mb-[25px]">
//               <span className="text-[60px] mb-[10px] block text-[#FFA500] drop-shadow-[0_0_20px_#FFA500]">
//                 {playerScore > (numQuestions * 10 * 0.6) ? '🏆' : playerScore > 0 ? '💾' : '⚠️'}
//               </span>
//               <h2 className="font-['Orbitron'] text-[30px] text-[#9370DB]">
//                 {playerScore > (numQuestions * 10 * 0.6) ? "MASTERY ACHIEVED!" : playerScore > 0 ? "CHALLENGE COMPLETE" : "TRAINING NEEDED"}
//               </h2>
//             </div>

//             <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px] w-full mb-[30px] bg-[rgba(0,0,0,0.2)] p-5 rounded-[10px]">
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Final Score</span>
//                 <span className="text-2xl font-bold text-[#FFA500]">{playerScore}</span>
//               </div>
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Correct Answers</span>
//                 <span className="text-xl font-bold text-[#E0E0E0]">{correctAnswersCount}/{numQuestions}</span>
//               </div>
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Accuracy</span>
//                 <span className="text-xl font-bold text-[#E0E0E0]">{accuracy.toFixed(0)}%</span>
//               </div>
//               <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
//                 <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Time Taken</span>
//                 <span className="text-xl font-bold text-[#E0E0E0]">{(totalTimeTaken / 1000).toFixed(1)}s</span>
//               </div>
//             </div>

//             {playerScore > 0 && (
//               <div className="mb-[25px] p-[15px] bg-[rgba(255,0,255,0.1)] border border-[#FF00FF] rounded-[10px] w-full">
//                 <h3 className="text-[#FF00FF] font-['Orbitron'] mb-2">Attribute Growth!</h3>
//                 <p className="text-[#E0E0E0]">
//                   {currentQuiz.attribute.charAt(0).toUpperCase() + currentQuiz.attribute.slice(1)} +{Math.floor(playerScore * 0.1)} | Credits +{playerScore * 10} | XP +{playerScore}
//                 </p>
//               </div>
//             )}

//             <div className="flex gap-[15px] w-full justify-center">
//               <button 
//                 className="flex-1 max-w-[200px] p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-[15px] font-semibold cursor-pointer hover:brightness-[1.2] transition-all duration-300"
//                 onClick={retryQuiz}
//               >
//                 Retry
//               </button>
//               <button 
//                 className="flex-1 max-w-[200px] p-4 bg-[rgba(255,255,255,0.1)] border border-[rgba(0,255,255,0.2)] text-[#E0E0E0] rounded-[15px] text-[15px] font-semibold cursor-pointer hover:bg-[rgba(255,255,255,0.15)] hover:border-[#00FFFF] transition-all duration-300"
//                 onClick={handleQuizComplete}
//               >
//                 Complete
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




























/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';

interface QuizModalProps {
  visible: boolean;
  onClose: () => void;
  quizId?: string;
  quests: any[];
  onComplete: (score: number, questId: string) => void;
}

interface QuizQuestion {
  q: string;
  o: string[];
  a: number;
}

interface QuizData {
  id: string;
  title: string;
  icon: string;
  type: string;
  attribute: string;
  description: string;
  timeLimitPerQuestion?: number;
  questions?: QuizQuestion[];
  rewards?: { points: number; gems?: number };
  difficultySettings?: {
    levelName: string;
    operations: string[];
    numRange: [number, number];
    secondNumRange?: [number, number];
    questionsCount: number;
    timePerQuestion: number;
    rewards: { points: number; gems?: number };
  }[];
}

const TIMER_RING_RADIUS = 26;
const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * TIMER_RING_RADIUS;

export default function QuizModal({ visible, onClose, quizId = 'logic01', quests, onComplete }: QuizModalProps) {
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [quizState, setQuizState] = useState<'intro' | 'gameplay' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Static quiz data for fallback
  const staticQuizData: { [key: string]: QuizData } = {
    'logic01': {
      id: 'logic01',
      title: 'Logic Circuit Bender',
      icon: '🧠',
      type: 'logic',
      attribute: 'character',
      description: 'Navigate the labyrinth of logic. Deduce correctly before the system overloads.',
      timeLimitPerQuestion: 20,
      questions: [
        { q: "If all Blips are Zorgs, and some Zorgs are Flunks, are all Blips definitely Flunks?", o: ["Always True", "Always False", "Uncertain"], a: 2 },
        { q: "A cyber-key unlocks either Gate A or Gate B, but not both. If Gate A is locked, Gate B must be:", o: ["Locked", "Unlocked", "Unknown"], a: 1 },
        { q: "Three data streams: Red, Blue, Green. Red is faster than Blue. Green is slower than Blue. Which is fastest?", o: ["Red Stream", "Blue Stream", "Green Stream"], a: 0 }
      ],
      rewards: { points: 150, gems: 5 }
    },
    'math01': {
      id: 'math01',
      title: 'Math Attack: Velocity',
      icon: '🧮',
      type: 'math',
      attribute: 'scholarship',
      description: 'Crunch the numbers before the firewall breaches! Select your processing speed.',
      difficultySettings: [
        { levelName: "Cruising", operations: ['+', '-'], numRange: [1, 20], questionsCount: 5, timePerQuestion: 20, rewards: { points: 50, gems: 1 } },
        { levelName: "Nitro", operations: ['+', '-', '*'], numRange: [1, 50], questionsCount: 10, timePerQuestion: 15, rewards: { points: 100, gems: 3 } },
        { levelName: "Warp Speed", operations: ['+', '-'], numRange: [10, 99], secondNumRange: [1, 10], questionsCount: 15, timePerQuestion: 10, rewards: { points: 200, gems: 5 } }
      ],
    },
    'health01': {
      id: 'health01',
      title: 'Wellness Workshop',
      icon: '💚',
      type: 'health',
      attribute: 'health',
      description: 'Optimize your biological systems. Knowledge is the foundation of peak performance.',
      timeLimitPerQuestion: 18,
      questions: [
        { q: "How many hours of sleep do most adults need per night?", o: ["4-5 hours", "6-7 hours", "7-9 hours", "10+ hours"], a: 2 },
        { q: "Which vitamin is primarily obtained from sunlight?", o: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], a: 2 },
        { q: "What is the recommended daily water intake for adults?", o: ["4 cups", "6 cups", "8 cups", "12 cups"], a: 2 },
        { q: "Which exercise type is best for cardiovascular health?", o: ["Weightlifting", "Aerobic", "Stretching", "Balance"], a: 1 }
      ],
      rewards: { points: 180, gems: 2 }
    }
  };

  useEffect(() => {
    if (visible && quizId) {
      // First check if it's a backend quest
      const backendQuest = quests.find(q => q.id === quizId);
      
      if (backendQuest && backendQuest.questions && Array.isArray(backendQuest.questions)) {
        // Transform backend quest to quiz format
        const transformedQuiz: QuizData = {
          id: backendQuest.id,
          title: backendQuest.title || backendQuest.name || 'Unknown Quest',
          icon: backendQuest.icon || getAttributeIcon(backendQuest.attribute),
          type: backendQuest.type?.toLowerCase() || 'custom',
          attribute: backendQuest.attribute || 'character',
          description: backendQuest.description || 'Complete this challenge to earn rewards!',
          timeLimitPerQuestion: backendQuest.timeLimit || 20,
          questions: backendQuest.questions,
          rewards: { 
            points: backendQuest.xpReward || 100, 
            gems: backendQuest.coinReward ? Math.floor(backendQuest.coinReward / 100) : 2 
          }
        };
        setCurrentQuiz(transformedQuiz);
      } else {
        // Use static quiz data
        const quiz = JSON.parse(JSON.stringify(staticQuizData[quizId] || staticQuizData['logic01']));
        setCurrentQuiz(quiz);
      }
      
      setQuizState('intro');
      setCurrentQuestionIndex(0);
      setPlayerScore(0);
      setSelectedDifficultyIndex(0);
      setTotalTimeTaken(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setUserAnswers([]);
    }
  }, [visible, quizId, quests]);

  const getAttributeIcon = (attribute: string) => {
    const icons = {
      character: '🎭',
      health: '💚',
      exploration: '🧭',
      scholarship: '🎓',
      stewardship: '🌳'
    };
    return icons[attribute as keyof typeof icons] || '🎯';
  };

  const generateDefaultQuestions = (attribute: string): QuizQuestion[] => {
    const defaultQuestions: { [key: string]: QuizQuestion[] } = {
      character: [
        { q: "What is the most important trait of a leader?", o: ["Intelligence", "Integrity", "Charisma", "Strength"], a: 1 },
        { q: "How should you handle a disagreement?", o: ["Avoid it", "Fight", "Listen and discuss", "Give up"], a: 2 }
      ],
      health: [
        { q: "What is essential for good health?", o: ["Fast food", "Exercise", "Screen time", "Stress"], a: 1 },
        { q: "How much water should you drink daily?", o: ["1 cup", "4 cups", "8 cups", "16 cups"], a: 2 }
      ],
      exploration: [
        { q: "What tool helps with navigation?", o: ["Hammer", "Compass", "Spoon", "Calculator"], a: 1 },
        { q: "What should you bring when exploring?", o: ["Map", "TV", "Chair", "Bed"], a: 0 }
      ],
      scholarship: [
        { q: "What is 2 + 2?", o: ["3", "4", "5", "6"], a: 1 },
        { q: "What is the capital of France?", o: ["London", "Paris", "Berlin", "Rome"], a: 1 }
      ],
      stewardship: [
        { q: "How can you help the environment?", o: ["Litter", "Recycle", "Waste water", "Cut trees"], a: 1 },
        { q: "What is renewable energy?", o: ["Coal", "Oil", "Solar", "Gas"], a: 2 }
      ]
    };

    return defaultQuestions[attribute] || defaultQuestions.character;
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const generateMathQuestions = (): QuizQuestion[] => {
    if (!currentQuiz || currentQuiz.type !== 'math' || !currentQuiz.difficultySettings) return [];
    
    const diffSetting = currentQuiz.difficultySettings[selectedDifficultyIndex];
    const questions: QuizQuestion[] = [];

    for (let i = 0; i < diffSetting.questionsCount; i++) {
      const op = diffSetting.operations[Math.floor(Math.random() * diffSetting.operations.length)];
      let n1 = Math.floor(Math.random() * (diffSetting.numRange[1] - diffSetting.numRange[0] + 1)) + diffSetting.numRange[0];
      let n2_range = diffSetting.secondNumRange || diffSetting.numRange;
      let n2 = Math.floor(Math.random() * (n2_range[1] - n2_range[0] + 1)) + n2_range[0];
      let questionText: string;
      let correctAnswer: number;
      let options: number[] = [];

      switch (op) {
        case '+':
          correctAnswer = n1 + n2;
          questionText = `${n1} + ${n2} = ?`;
          break;
        case '-':
          if (n1 < n2) [n1, n2] = [n2, n1];
          correctAnswer = n1 - n2;
          questionText = `${n1} - ${n2} = ?`;
          break;
        case '*':
          correctAnswer = n1 * n2;
          questionText = `${n1} × ${n2} = ?`;
          break;
        case '/':
          if (n2 === 0) n2 = 1;
          n1 = (Math.floor(Math.random() * Math.max(1, Math.floor(diffSetting.numRange[1] / n2))) + 1) * n2;
          correctAnswer = n1 / n2;
          questionText = `${n1} ÷ ${n2} = ?`;
          break;
        default:
          correctAnswer = n1 + n2;
          questionText = `${n1} + ${n2} = ?`;
      }

      options.push(correctAnswer);
      let attempts = 0;
      while (options.length < 4 && attempts < 20) {
        let offsetMagnitude = Math.floor(Math.random() * Math.max(5, Math.abs(Math.floor(correctAnswer * 0.3)))) + 1;
        let offset = (Math.random() > 0.5 ? 1 : -1) * offsetMagnitude;
        if (offset === 0) offset = (Math.random() > 0.5 ? 1 : -1);
        let wrongAnswer = correctAnswer + offset;
        if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer) && wrongAnswer >= 0) {
          options.push(wrongAnswer);
        }
        attempts++;
      }
      
      while (options.length < 4) {
        options.push(Math.max(0, correctAnswer + (options.length + 1) * (options.length % 2 === 0 ? 1 : -1)));
      }
      
      options = [...new Set(options)].slice(0, 4);
      if (!options.includes(correctAnswer)) {
        options[Math.floor(Math.random() * options.length)] = correctAnswer;
      }
      
      // Shuffle options
      for (let j = options.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [options[j], options[k]] = [options[k], options[j]];
      }

      questions.push({
        q: questionText,
        o: options.map(String),
        a: options.indexOf(correctAnswer)
      });
    }

    return questions;
  };

  const startQuiz = () => {
    if (!currentQuiz) return;

    let questionsToUse = currentQuiz.questions || [];
    let timeLimitPerQuestion = currentQuiz.timeLimitPerQuestion || 15;

    if (currentQuiz.type === 'math') {
      questionsToUse = generateMathQuestions();
      if (currentQuiz.difficultySettings) {
        timeLimitPerQuestion = currentQuiz.difficultySettings[selectedDifficultyIndex].timePerQuestion;
      }
    } else if (!questionsToUse || questionsToUse.length === 0) {
      // Generate default questions if none exist
      questionsToUse = generateDefaultQuestions(currentQuiz.attribute);
    }

    setCurrentQuiz({
      ...currentQuiz,
      questions: questionsToUse,
      timeLimitPerQuestion
    });
    setQuizState('gameplay');
    setCurrentQuestionIndex(0);
    setPlayerScore(0);
    setTotalTimeTaken(0);
    setUserAnswers([]);
    startQuestionTimer(timeLimitPerQuestion);
  };

  const startQuestionTimer = (duration: number) => {
    setTimeLeft(duration);
    setQuestionStartTime(Date.now());
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeout = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTotalTimeTaken(prev => prev + (currentQuiz?.timeLimitPerQuestion || 15) * 1000);
    handleAnswerFeedback(false, -1);
  };

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !currentQuiz?.questions) return;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    setTotalTimeTaken(prev => prev + (Date.now() - questionStartTime));
    const correct = answerIndex === currentQuiz.questions[currentQuestionIndex].a;
    
    if (correct) {
      setPlayerScore(prev => prev + 10);
    }

    // Store the user's answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    
    handleAnswerFeedback(correct, answerIndex);
  };

  const handleAnswerFeedback = (correct: boolean, answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    // If timeout occurred, still store the answer as -1 (no answer)
    if (answerIndex === -1) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = -1;
      setUserAnswers(newAnswers);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 >= (currentQuiz?.questions?.length || 0)) {
        endQuiz();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        startQuestionTimer(currentQuiz?.timeLimitPerQuestion || 15);
      }
    }, 1800);
  };

  const endQuiz = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setQuizState('results');
  };

  const retryQuiz = () => {
    setQuizState('intro');
    setCurrentQuestionIndex(0);
    setPlayerScore(0);
    setTotalTimeTaken(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setUserAnswers([]);
  };

  const handleQuizComplete = async () => {
    if (currentQuiz && quizId) {
      // Check if this is a backend quest
      const backendQuest = quests.find(q => q.id === quizId);
      
      if (backendQuest) {
        // For backend quests, send the answers array for server-side scoring
        try {
          const response = await fetch('/api/student/quests/complete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              questId: quizId,
              answers: userAnswers,
              timeSpent: Math.floor(totalTimeTaken / 1000)
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // The API will handle the profile updates
            onComplete(data.completion.score, quizId);
          } else {
            console.error('Failed to complete quest on server');
            // Fallback to client-side completion
            onComplete(playerScore, quizId);
          }
        } catch (error) {
          console.error('Error completing quest:', error);
          // Fallback to client-side completion
          onComplete(playerScore, quizId);
        }
      } else {
        // For static quests, use the original client-side scoring
        onComplete(playerScore, quizId);
      }
    }
    onClose();
  };

  if (!visible || !currentQuiz) return null;

  const numQuestions = currentQuiz.questions?.length || 0;
  const correctAnswersCount = playerScore / 10;
  const accuracy = numQuestions > 0 ? (correctAnswersCount / numQuestions) * 100 : 0;

  const currentQuestion = currentQuiz.questions?.[currentQuestionIndex];
  const timeLimitPerQuestion = currentQuiz.timeLimitPerQuestion || 15;
  const elapsedRatio = (timeLimitPerQuestion - timeLeft) / timeLimitPerQuestion;
  const strokeDashoffset = elapsedRatio * TIMER_RING_CIRCUMFERENCE;

  const getAttributeColor = (attribute: string) => {
    const colors = {
      chess: '#8B4513',
      character: '#FF1493',
      health: '#32CD32',
      exploration: '#FFD700',
      scholarship: '#4169E1',
      stewardship: '#228B22'
    };
    return colors[attribute as keyof typeof colors] || '#9370DB';
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[15px] saturate-150 z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="bg-gradient-to-[145deg] from-[rgba(23,22,46,0.95)] to-[rgba(75,0,130,0.5)] rounded-[25px] p-[30px_35px] w-[95%] max-w-[600px] h-auto max-h-[90vh] border-2 border-[#00FFFF] shadow-[0_0_30px_rgba(0,255,255,0.5),0_0_50px_rgba(138,43,226,0.6)] flex flex-col relative overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-5 right-5 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] text-[#A0AEC0] w-[30px] h-[30px] rounded-full text-base cursor-pointer hover:bg-[#00FFFF] hover:text-[#0D0C1D] transition-all duration-200 flex items-center justify-center z-10"
          onClick={onClose}
        >
          ×
        </button>

        {/* Quiz Intro State */}
        {quizState === 'intro' && (
          <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
            <div className="mb-5 border-b border-dashed border-[rgba(0,255,255,0.2)] pb-5 w-full">
              <span className="text-[48px] text-[#00FFFF] drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] mb-[10px] block">{currentQuiz.icon}</span>
              <h2 className="font-['Orbitron'] text-[28px] text-[#9370DB] mb-[5px]">{currentQuiz.title}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] text-sm font-medium border" style={{
                backgroundColor: `${getAttributeColor(currentQuiz.attribute)}20`,
                borderColor: `${getAttributeColor(currentQuiz.attribute)}50`,
                color: getAttributeColor(currentQuiz.attribute)
              }}>
                <span>+{currentQuiz.attribute.charAt(0).toUpperCase() + currentQuiz.attribute.slice(1)} Attribute</span>
              </div>
            </div>
            <p className="text-[15px] text-[#A0AEC0] leading-[1.6] mb-[25px] max-w-[90%]">{currentQuiz.description}</p>
            
            {currentQuiz.type === 'math' && currentQuiz.difficultySettings && (
              <div className="mb-[25px] w-full p-[15px] bg-[rgba(0,0,0,0.2)] rounded-[10px]">
                <label className="block mb-[10px] text-[#9370DB] font-semibold text-sm">
                  Select Difficulty: <span className="text-[#00FFFF] font-bold">{currentQuiz.difficultySettings[selectedDifficultyIndex].levelName}</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max={currentQuiz.difficultySettings.length - 1}
                  value={selectedDifficultyIndex}
                  onChange={(e) => setSelectedDifficultyIndex(parseInt(e.target.value))}
                  className="w-[80%] h-2 bg-[rgba(138,43,226,0.3)] rounded-[5px] outline-none opacity-80 hover:opacity-100 transition-opacity cursor-pointer mt-[5px] appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:bg-[#00FFFF] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0D0C1D] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,255,0.5)] [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            )}
            
            <div className="flex justify-around w-full mb-[30px] text-sm text-[#718096]">
              <p>Questions: <span className="text-[#E0E0E0] font-bold">
                {currentQuiz.type === 'math' && currentQuiz.difficultySettings 
                  ? currentQuiz.difficultySettings[selectedDifficultyIndex].questionsCount 
                  : currentQuiz.questions?.length || 'N/A'}
              </span></p>
              <p>Time Limit: <span className="text-[#E0E0E0] font-bold">
                {currentQuiz.type === 'math' && currentQuiz.difficultySettings 
                  ? `${currentQuiz.difficultySettings[selectedDifficultyIndex].questionsCount * currentQuiz.difficultySettings[selectedDifficultyIndex].timePerQuestion}s`
                  : currentQuiz.questions ? `${currentQuiz.questions.length * (currentQuiz.timeLimitPerQuestion || 15)}s` : 'N/A'}
              </span></p>
            </div>
            <button 
              className="w-full p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-[18px] font-semibold cursor-pointer hover:shadow-[0_0_20px_rgba(138,43,226,0.7)] transition-all duration-300"
              onClick={startQuiz}
            >
              Start Challenge
            </button>
          </div>
        )}

        {/* Quiz Gameplay State */}
        {quizState === 'gameplay' && currentQuestion && (
          <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
            <div className="flex justify-between items-center w-full py-[10px] mb-5 border-b border-[rgba(0,255,255,0.2)]">
              <div className="text-sm text-[#A0AEC0] bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-lg">
                Question <span className="text-[#FF00FF] font-bold">{currentQuestionIndex + 1}</span> of <span className="text-[#FF00FF] font-bold">{numQuestions}</span>
              </div>
              <div className="flex items-center text-lg font-bold text-[#00FFFF] relative">
                <svg className="mr-2" width="60" height="60">
                  <circle stroke="rgba(0,255,255,0.2)" strokeWidth="4" fill="transparent" r="26" cx="30" cy="30"/>
                  <circle 
                    stroke="#00FFFF" 
                    strokeWidth="4" 
                    fill="transparent" 
                    r="26" 
                    cx="30" 
                    cy="30" 
                    strokeLinecap="round" 
                    transform="rotate(-90 30 30)"
                    style={{
                      strokeDasharray: `${TIMER_RING_CIRCUMFERENCE} ${TIMER_RING_CIRCUMFERENCE}`,
                      strokeDashoffset: strokeDashoffset,
                      transition: 'stroke-dashoffset 0.2s linear'
                    }}
                  />
                </svg>
                <span>{timeLeft}s</span>
              </div>
              <div className="text-sm text-[#A0AEC0] bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-lg">
                Score: <span className="text-[#FF00FF] font-bold">{playerScore}</span>
              </div>
            </div>

            <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] p-[25px_20px] rounded-[15px] mb-[25px] min-h-[100px] flex items-center justify-center w-full shadow-[inset_0_0_15px_rgba(0,255,255,0.1)]">
              <p className="text-xl font-semibold leading-[1.5] text-[#E0E0E0]">{currentQuestion.q}</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[15px] w-full mb-5">
              {currentQuestion.o.map((option, index) => {
                let buttonClass = "bg-[rgba(138,43,226,0.2)] border-2 border-[#9370DB] text-[#E0E0E0] p-[15px] rounded-[12px] text-base cursor-pointer transition-all duration-200 ease-in-out text-left min-h-[60px] flex items-center";
                
                if (showFeedback) {
                  buttonClass += " opacity-60 pointer-events-none";
                  if (selectedAnswer === index) {
                    buttonClass += isCorrect ? " !bg-[#32CD32] !border-[#32CD32] !text-white animate-[pulseCorrect_0.5s_ease]" : " !bg-[#00FFFF] !border-[#00FFFF] !text-white animate-[shakeIncorrect_0.5s_ease]";
                  }
                  if (!isCorrect && index === currentQuestion.a) {
                    buttonClass += " !bg-[#32CD32] !border-[#32CD32] !text-white";
                  }
                } else {
                  buttonClass += " hover:bg-[#9370DB] hover:border-[#00FFFF] hover:text-white hover:transform hover:translate-y-[-3px] hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(138,43,226,0.6)]";
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => selectAnswer(index)}
                    disabled={showFeedback}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`min-h-[20px] mt-[10px] font-bold text-base ${isCorrect ? 'text-[#32CD32]' : 'text-[#00FFFF]'}`}>
                {isCorrect ? "CORRECT! +10 POINTS" : selectedAnswer === -1 ? "TIME'S UP!" : "INCORRECT!"}
              </div>
            )}
          </div>
        )}

        {/* Quiz Results State */}
        {quizState === 'results' && (
          <div className="flex flex-col items-center text-center w-full animate-[fadeInState_0.5s_ease-out]">
            <div className="mb-[25px]">
              <span className="text-[60px] mb-[10px] block text-[#FFA500] drop-shadow-[0_0_20px_#FFA500]">
                {playerScore > (numQuestions * 10 * 0.6) ? '🏆' : playerScore > 0 ? '💾' : '⚠️'}
              </span>
              <h2 className="font-['Orbitron'] text-[30px] text-[#9370DB]">
                {playerScore > (numQuestions * 10 * 0.6) ? "MASTERY ACHIEVED!" : playerScore > 0 ? "CHALLENGE COMPLETE" : "TRAINING NEEDED"}
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px] w-full mb-[30px] bg-[rgba(0,0,0,0.2)] p-5 rounded-[10px]">
              <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
                <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Final Score</span>
                <span className="text-2xl font-bold text-[#FFA500]">{playerScore}</span>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
                <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Correct Answers</span>
                <span className="text-xl font-bold text-[#E0E0E0]">{correctAnswersCount}/{numQuestions}</span>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
                <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Accuracy</span>
                <span className="text-xl font-bold text-[#E0E0E0]">{accuracy.toFixed(0)}%</span>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] p-[15px] rounded-lg border border-[rgba(0,255,255,0.2)]">
                <span className="block text-[13px] text-[#A0AEC0] mb-[5px]">Time Taken</span>
                <span className="text-xl font-bold text-[#E0E0E0]">{(totalTimeTaken / 1000).toFixed(1)}s</span>
              </div>
            </div>

            {playerScore > 0 && (
              <div className="mb-[25px] p-[15px] bg-[rgba(255,0,255,0.1)] border border-[#FF00FF] rounded-[10px] w-full">
                <h3 className="text-[#FF00FF] font-['Orbitron'] mb-2">Attribute Growth!</h3>
                <p className="text-[#E0E0E0]">
                  {currentQuiz.attribute.charAt(0).toUpperCase() + currentQuiz.attribute.slice(1)} +{Math.floor(playerScore * 0.1)} | Credits +{playerScore * 10} | XP +{playerScore}
                </p>
              </div>
            )}

            <div className="flex gap-[15px] w-full justify-center">
              <button 
                className="flex-1 max-w-[200px] p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-[15px] font-semibold cursor-pointer hover:brightness-[1.2] transition-all duration-300"
                onClick={retryQuiz}
              >
                Retry
              </button>
              <button 
                className="flex-1 max-w-[200px] p-4 bg-[rgba(255,255,255,0.1)] border border-[rgba(0,255,255,0.2)] text-[#E0E0E0] rounded-[15px] text-[15px] font-semibold cursor-pointer hover:bg-[rgba(255,255,255,0.15)] hover:border-[#00FFFF] transition-all duration-300"
                onClick={handleQuizComplete}
              >
                Complete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}