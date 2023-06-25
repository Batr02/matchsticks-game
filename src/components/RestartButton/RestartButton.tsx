import React from 'react';
import styles from './RestartButton.module.css';

interface IRestartButtonProps {
  handleRestart: () => void;
}

const RestartButton: React.FC<IRestartButtonProps> = ({ handleRestart }) => {
  return (
    <button onClick={handleRestart} className={styles.restartButton}>
      Restart
    </button>
  );
};

export default RestartButton;
