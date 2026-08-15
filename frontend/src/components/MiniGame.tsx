import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';

const questions = [
  {
    text: "A post claims that holding your breath for 10 seconds can test if you have a lung infection. Is this reliable?",
    answer: false,
    explanation: "Medical experts and the WHO have confirmed this is a myth. Always rely on clinical tests."
  },
  {
    text: "An article uses a generic stock photo of a crowd and claims it's from a protest that happened today. Is this suspicious?",
    answer: true,
    explanation: "Reverse image searching often reveals that photos are from years ago or entirely different events."
  },
  {
    text: "A news headline ends with three exclamation marks and uses ALL CAPS. Does this indicate high credibility?",
    answer: false,
    explanation: "Sensationalist formatting is a common tactic of clickbait and fake news sites to generate emotional reactions."
  },
  {
    text: "A breaking news tweet links to a well-known, established news organization's verified website. Is this generally more trustworthy?",
    answer: true,
    explanation: "Established news organizations have editorial standards and fact-checking processes."
  }
];

export function MiniGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setGameFinished(false);
  };

  return (
    <section id="games" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-0"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Test Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Instincts</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Can you spot the red flags of misinformation? Play our quick Fact or Fiction game.
            </p>
          </motion.div>
        </div>

        <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!gameFinished ? (
              <motion.div
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex flex-col items-center"
              >
                <div className="w-full flex justify-between items-center mb-8 text-sm text-gray-400 font-mono">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-medium text-center mb-8 text-gray-200">
                  {questions[currentQuestionIndex].text}
                </h3>

                {!showExplanation ? (
                  <div className="flex gap-4 w-full justify-center">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="px-8 py-3 rounded-xl font-medium bg-white/5 border border-white/10 hover:bg-success/20 hover:border-success/50 hover:text-success transition-all duration-300 w-32"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="px-8 py-3 rounded-xl font-medium bg-white/5 border border-white/10 hover:bg-danger/20 hover:border-danger/50 hover:text-danger transition-all duration-300 w-32"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className={`flex items-center gap-2 text-lg font-bold mb-4 ${selectedAnswer === questions[currentQuestionIndex].answer ? 'text-success' : 'text-danger'}`}>
                      {selectedAnswer === questions[currentQuestionIndex].answer ? (
                        <><CheckCircle className="w-6 h-6" /> Correct!</>
                      ) : (
                        <><XCircle className="w-6 h-6" /> Incorrect</>
                      )}
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-gray-300 text-center mb-6 w-full">
                      {questions[currentQuestionIndex].explanation}
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="btn-primary w-full max-w-xs"
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-8"
              >
                <Trophy className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-3xl font-bold mb-2">Game Over!</h3>
                <p className="text-xl text-gray-300 mb-8">
                  You scored <span className="text-primary font-bold">{score}</span> out of {questions.length}
                </p>
                
                <p className="text-gray-400 mb-8 max-w-md">
                  {score === questions.length 
                    ? "Perfect! You have a great eye for spotting misinformation." 
                    : score >= questions.length / 2 
                      ? "Not bad! But there's always room to improve your media literacy." 
                      : "Looks like you might need TruthScan more often! Stay vigilant out there."}
                </p>

                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
