import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengContext';

import styles from '../styles/components/ChallengBox.module.css';

export function ChallengBox(){
    const { activeChalleng, reseteChalleng } = useContext(ChallengsContext);


    return(
        <div className={styles.challengBoxContainer}>
            { activeChalleng ? (
                <div className={styles.challengActive}>
                    <header>Ganhe { activeChalleng.amount } xp</header>

                    <main>
                        <img src={`icons/${activeChalleng.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{ activeChalleng.description }</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={styles.challengFailedButton}
                            onClick={reseteChalleng}
                        >
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={styles.challengSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            ) } 
        </div>
    );
}