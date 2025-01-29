import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    fetch("https://api-gagne.leurquin.org/scores")
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  const updateScore = (player, change) => {
    const newScores = { ...scores, [player]: scores[player] + change };
    setScores(newScores);
    
    fetch("https://api-gagne.leurquin.org/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newScores),
    });
  };

  return (
    <div className="app-container">
      <h1 className="title">Score</h1>
      <h2>Echéance : 27/02/2025</h2>
      <div className="players-container responsive">
        <div className="player-card">
          <h2>Daniel</h2>
          <p className="score">{scores.player1}</p>
          <button onClick={() => updateScore("player1", -1)} className="player-button red">-1</button>
          <button onClick={() => updateScore("player1", 1)} className="player-button green">+1</button>
        </div>
        <div className="player-card">
          <h2>Solène</h2>
          <p className="score">{scores.player2}</p>
         
          <button onClick={() => updateScore("player2", -1)} className="player-button red">-1</button>
          <button onClick={() => updateScore("player2", 1)} className="player-button green">+1</button>
        </div>
      </div>
    </div>
  );
}
