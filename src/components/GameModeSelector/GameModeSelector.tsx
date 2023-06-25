import React from 'react';
import styles from './GameModeSelector.module.css';

interface IGameModeSelectorProps {
  gameMode: string;
  setGameMode: (gameMode: string) => void;
}

const GameModeSelector: React.FC<IGameModeSelectorProps> = ({ gameMode, setGameMode }) => {
   return (
     <div className={styles.gameModeSelector}>
       <div>
         <input
           type="radio"
           id="playerFirst"
           name="gameMode"
           value="playerFirst"
           checked={gameMode === 'playerFirst'}
           onChange={() => setGameMode('playerFirst')}
         />
         <label htmlFor="playerFirst">You first</label>
       </div>
       <div>
         <input
           type="radio"
           id="aiFirst"
           name="gameMode"
           value="aiFirst"
           checked={gameMode === 'aiFirst'}
           onChange={() => setGameMode('aiFirst')}
         />
         <label htmlFor="aiFirst">AI first</label>
       </div>
     </div>
   );
 };
 

export default GameModeSelector;
