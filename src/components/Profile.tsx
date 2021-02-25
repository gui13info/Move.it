import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengsContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/gui13info.png" alt="Guilherme"/>
            <div>
                <strong>Guilherme Marques</strong>
                <p> 
                    <img src="icons/level.svg" alt="Level"/> 
                    Level { level }
                </p>
            </div>
        </div>
    );
}