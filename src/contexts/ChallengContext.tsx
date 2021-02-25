import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengContextData{
    level: number;
    currentExperience: number;
    experienceToNextLevel: number; 
    challengCompleted: number;
    activeChalleng: Challenge;
    levelUp: () => void;
    StartNeWChalleng: () => void;
    reseteChalleng: () => void;
    completeChalleng: () => void;
}

interface ChallengsProviderProps{
    children: ReactNode;
}

export const ChallengsContext = createContext({} as ChallengContextData);

export function ChallengsProvider({ children }:ChallengsProviderProps ) {
    const [ level, setLevel ] = useState(1);
    const [ currentExperience, setCurrentExperience ] = useState(0);
    const [ challengCompleted, setChallengCompleted ] = useState(0);

    const [ activeChalleng, setActiveChalleng ] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp(){
        setLevel(level + 1);
    }

    function StartNeWChalleng(){
        const randowChallengIndex = Math.floor(Math.random() * challenges.length)

        const challenge = challenges[randowChallengIndex];

        setActiveChalleng(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === "granted") {
            new Notification('Novo desafio 🎉🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function reseteChalleng() {
        setActiveChalleng(null);
    }

    function completeChalleng(){
        if ( ! activeChalleng ) {
            return;
        }

        const { amount } = activeChalleng;

        let finalExperience = currentExperience + amount;

        if ( finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChalleng(null);
        setChallengCompleted(challengCompleted + 1);
    }

    return(
        <ChallengsContext.Provider 
            value={{ 
                level, 
                currentExperience,
                experienceToNextLevel, 
                challengCompleted, 
                levelUp,
                StartNeWChalleng,
                activeChalleng,
                reseteChalleng ,
                completeChalleng
            }}>
            { children }
        </ChallengsContext.Provider>
    );
}
