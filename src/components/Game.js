// src/components/Game.js

import React, { useState, useEffect } from 'react';

function Game({ question, questionNumber, totalQuestions, onAnswer }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    // Üríti a beviteli mezőt és a visszajelzést minden új kérdésnél
    useEffect(() => {
        setUserAnswer('');
        setFeedback(null);
    }, [question]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer.trim()) return; // Ne engedjünk üres választ

        const isCorrect = userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

        // Visszajelzés mutatása
        setFeedback({
            correct: isCorrect,
            correctAnswer: question.answer
        });

        // Kis késleltetés, hogy a felhasználó lássa a visszajelzést
        setTimeout(() => {
            onAnswer(userAnswer);
        }, isCorrect ? 1000 : 2500); // Hibás válasznál több időt hagyunk
    };

    return (
        <div className="game-container">
            <h3>{questionNumber}. / {totalQuestions}. kérdés</h3>
            <p className="question-text">{question.question}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    autoFocus
                    ref={input => input && input.focus()}
                    disabled={feedback !== null} // Visszajelzés alatt ne lehessen írni
                />
                <button type="submit" className="btn" disabled={feedback !== null}>Válasz</button>
            </form>
            {feedback && (
                <div className="feedback">
                    {feedback.correct ? (
                        <p className="correct">Helyes!</p>
                    ) : (
                        <p>
                            <span className="incorrect">Nem helyes.</span>
                            <span className="correct"> A helyes válasz: {feedback.correctAnswer}</span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Game;