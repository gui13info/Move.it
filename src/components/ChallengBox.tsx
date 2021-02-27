import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengBox.module.css';

export function ChallengeBox(){
    const { activeChalleng, reseteChalleng, completeChalleng } = useContext(ChallengsContext);
    const { reseteCountDown } = useContext(CountdownContext)

    function handleChallengeSuceeded(){
        completeChalleng();
        reseteCountDown();
    }

    function handleChallengeFailed(){
        reseteChalleng();
        reseteCountDown();
    }

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
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={styles.challengSucceededButton}
                            onClick={handleChallengeSuceeded}
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