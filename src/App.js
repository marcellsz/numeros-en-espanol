// src/App.js

import React, { useState } from 'react';
import Settings from './components/Settings';
import Game from './components/Game';
import Results from './components/Results';
import { numberToSpanish } from './utils/numberConverter';
import './App.css';

function App() {
    // 'settings', 'playing', 'finished'
    const [gameState, setGameState] = useState('settings');
    const [settings, setSettings] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const generateQuestions = (gameSettings) => {
        const newQuestions = [];
        const usedNumbers = new Set();
        const { min, max, count, mode } = gameSettings;

        while (newQuestions.length < count) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!usedNumbers.has(num)) {
                usedNumbers.add(num);
                const spanishWord = numberToSpanish(num);
                if (mode === 'num-to-word') {
                    newQuestions.push({ question: num.toString(), answer: spanishWord });
                } else {
                    newQuestions.push({ question: spanishWord, answer: num.toString() });
                }
            }
        }
        return newQuestions;
    };

    const handleStartGame = (gameSettings) => {
        setSettings(gameSettings);
        setQuestions(generateQuestions(gameSettings));
        setCurrentQuestionIndex(0);
        setResults([]);
        setGameState('playing');
    };

    const handleAnswerSubmit = (userAnswer) => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

        setResults([...results, {
            question: currentQuestion.question,
            userAnswer: userAnswer,
            correctAnswer: currentQuestion.answer,
            isCorrect: isCorrect,
        }]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameState('finished');
        }
    };

    const handleRestart = () => {
        setGameState('settings');
    };

    return (
        <div className="app-container">
            <h1>Spanyol Számok Gyakorló 🇪🇸</h1>
            {gameState === 'settings' && <Settings onStart={handleStartGame} />}
            {gameState === 'playing' && (
                <Game
                    question={questions[currentQuestionIndex]}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    onAnswer={handleAnswerSubmit}
                />
            )}
            {gameState === 'finished' && <Results results={results} onRestart={handleRestart} />}
        </div>
    );
}

export default App;