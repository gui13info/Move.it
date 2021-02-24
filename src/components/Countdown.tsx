import { useState, useEffect, useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengContext';

import styles from '../styles/components/Countdown.module.css';

let contDownTimeout: NodeJS.Timeout;

export function Countdown(){
    const { StartNeWChalleng } = useContext(ChallengsContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsactive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

    function startCountDown(){
        setIsactive(true);
    }

    function reseteCountDown(){
        clearTimeout(contDownTimeout)
        setIsactive(false);
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0){
            contDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if(isActive && time === 0) {
            setHasFinished(true);
            setIsactive(false);
            StartNeWChalleng();
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                    disabled 
                    className={styles.CountdownButton}
                >
                    Ciclo encerrado <img src="icons/check_circle.svg" alt="Leve Up"/>
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
                            onClick={reseteCountDown}
                        >
                            Abandonar ciclo
                        </button>

                    ) : ( 
                        <button 
                            type="button" 
                            className={styles.CountdownButton}
                            onClick={startCountDown}
                        >
                            Iniciar um ciclo
                        </button>
                    ) }
                </>
            ) }

        </div>
    );
}