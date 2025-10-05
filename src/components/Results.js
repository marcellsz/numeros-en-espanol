// src/components/Results.js

import React from 'react';

function Results({ results, onRestart }) {
    const correctCount = results.filter(r => r.isCorrect).length;
    const totalCount = results.length;
    const percentage = totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(0) : 0;

    return (
        <div className="results-container">
            <h2>Játék vége!</h2>
            <h3>Eredmény: {correctCount} / {totalCount} ({percentage}%)</h3>
            <button onClick={onRestart} className="btn">Új játék</button>
            <table>
                <thead>
                <tr>
                    <th>Kérdés</th>
                    <th>Válaszod</th>
                    <th>Helyes válasz</th>
                </tr>
                </thead>
                <tbody>
                {results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.question}</td>
                        <td className={result.isCorrect ? 'correct' : 'incorrect'}>
                            {result.userAnswer}
                        </td>
                        <td>
                            {!result.isCorrect && (
                                <span className="correct">{result.correctAnswer}</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Results;