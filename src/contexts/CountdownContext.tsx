import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengsContext } from './ChallengContext';

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    reseteCountDown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let contDownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps){
    const { StartNeWChalleng } = useContext(ChallengsContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsactive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown(){
        setIsactive(true);
    }

    function reseteCountDown(){
        clearTimeout(contDownTimeout)
        setIsactive(false);
        setHasFinished(false);
        setTime(25 * 60)
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
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountDown,
                reseteCountDown
            }}>
            { children }
        </CountdownContext.Provider>
    );
}