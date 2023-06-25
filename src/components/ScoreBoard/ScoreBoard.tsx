import React from 'react';
import styles from './ScoreBoard.module.css';

interface IScoreBoardProps  {
  scores: number[];
}

const ScoreBoard: React.FC<IScoreBoardProps> = ({ scores }) => {
   return (
     <div className={styles.scoreBoard}>
       <h2>Your score: {scores[0]}</h2>
       <h2>AI score: {scores[1]}</h2>
     </div>
   );
 };
 

export default ScoreBoard;
