import React, { useState, useEffect, useCallback } from 'react';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import ActionButtons from '../ActionButtons/ActionButtons';
import RestartButton from '../RestartButton/RestartButton';
import GameModeSelector from '../GameModeSelector/GameModeSelector';
import styles from './Game.module.css';

const Game: React.FC = () => {
  const [matches, setMatches] = useState(25); // Number of remaining matches
  const [scores, setScores] = useState([0, 0]); // Each player's scores
  const [player, setPlayer] = useState(0); // Who's playing now
  const [winner, setWinner] = useState(''); // Winner
  const [gameMode, setGameMode] = useState('playerFirst'); // Gamemode
  const [isGameStarted, setIsGameStarted] = useState(false); // game state

  // Action performed when the player takes the matches
  const handleTakeMatches = useCallback((num: number) => {
    setMatches(prev => prev - num);
    setScores(prev => {
      const newScores = [...prev];
      newScores[player] += num;
      return newScores;
    });
    setPlayer(prev => (prev + 1) % 2);
  }, [player]);

  // Game strategy for AI
  const computerStrategy = useCallback(() => {
    let matchesToTake: number;
  
    if (matches === 1) {
      matchesToTake = 1;
    } else if (matches <= 3) {
      matchesToTake = (scores[1] + matches) % 2 === 0 ? matches : matches - 1;
    } else if (matches === 4) {
      matchesToTake = (scores[1] + 3) % 2 === 0 ? 3 : 2;
    } else if (matches === 5) {
      matchesToTake = (scores[1] + 2) % 2 === 0 ? 2 : 1;
    } else {
      const residue = matches % 4;
  
      if (residue !== 0) {
        matchesToTake = residue;
      } else {
        const potentialMatchesToTake = Math.floor(Math.random() * 3) + 1;
        matchesToTake = (scores[1] + potentialMatchesToTake) % 2 === 0 
          ? potentialMatchesToTake 
          : potentialMatchesToTake - 1;
      }
    }
  
    return matchesToTake;
  }, [matches, scores]);
  


// Determining the winner by the number of matches
  useEffect(() => {
    if (matches === 0) {
      const winner = scores[0] % 2 === 0 ? 'Player' : 'AI';
      setWinner(winner);
    }
  }, [matches, scores]);

// AI makes a move after a pause of 1 second
  useEffect(() => {
    if (player === 1 && matches > 0 && isGameStarted) {
      setTimeout(() => handleTakeMatches(computerStrategy()), 1000);
    }
  }, [player, matches, handleTakeMatches, isGameStarted, computerStrategy]);

  // Restarting the game
  useEffect(() => {
    if (isGameStarted) {
      setMatches(25);
      setScores([0, 0]);
      setPlayer(gameMode === 'playerFirst' ? 0 : 1);
      setWinner('');
    }
  }, [gameMode, isGameStarted]);

  const handleRestart = () => {
    setIsGameStarted(false);
  };

  return (
    <div className={styles.gameContainer}>
      <h1>Matchsticks Game</h1>
      {!isGameStarted && (
         <div className={styles.gameModeContainer}>
            <GameModeSelector gameMode={gameMode} setGameMode={setGameMode} />
            <button className={styles.gameModeButton} onClick={() => setIsGameStarted(true)}>Start Game</button>
         </div>
      )}

      {isGameStarted && (
        <div>
          <ScoreBoard scores={scores} />
          <div className={styles.gameStatus}>
            <div>{Array.from({length: matches}).map((_, index) => '🔥')}</div>
            <h2>{matches} match{matches !== 1 ? 'es' : ''} left</h2>
          </div>
          {winner === '' && player === 0 && <ActionButtons matches={matches} handleTakeMatches={handleTakeMatches} />}
          {winner !== '' && <h2 className={styles.gameStatus}>{winner} wins!</h2>}
          <RestartButton handleRestart={handleRestart} />
        </div>
      )}
    </div>
  );
};

export default Game;

