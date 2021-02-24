import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengContext';

import styles from '../styles/components/CompletedChallengs.module.css';

export function CompletedChallengs(){
    const { challengCompleted } = useContext(ChallengsContext);

    return(
        <div className={styles.completedChallengsContainer}>
            <span>Desafios completos</span>
            <span>{challengCompleted}</span>
        </div>
    );
}