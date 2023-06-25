import React from 'react';
import styles from './ActionButtons.module.css';

interface IActionButtonsProps {
  matches: number;
  handleTakeMatches: (num: number) => void;
}

const ActionButtons: React.FC<IActionButtonsProps> = ({ matches, handleTakeMatches }) => (
  <div>
    {[1, 2, 3].map(num => 
      matches - num >= 0 ? 
        <button className={styles.actionButton} key={num} onClick={() => handleTakeMatches(num)}>Take {num} match{num > 1 ? 'es' : ''}</button> 
        : null
    )}
  </div>
);

export default ActionButtons;

