import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
    const { 
        minutes, 
        seconds, 
        isActive, 
        hasFinished, 
        reseteCountDown, 
        startCountDown 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

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