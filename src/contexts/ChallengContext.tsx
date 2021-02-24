import { createContext, useState, ReactNode } from 'react';
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
}

interface ChallengsProviderProps{
    children: ReactNode
}

export const ChallengsContext = createContext({} as ChallengContextData);

export function ChallengsProvider({ children }:ChallengsProviderProps ) {
    const [ level, setLevel ] = useState(1);
    const [ currentExperience, setCurrentExperience ] = useState(0);
    const [ challengCompleted, setChallengCompleted ] = useState(0);

    const [ activeChalleng, setActiveChalleng ] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp(){
        setLevel(level + 1);
    }

    function StartNeWChalleng(){
        const randowChallengIndex = Math.floor(Math.random() * challenges.length)

        const challenge = challenges[randowChallengIndex];

        setActiveChalleng(challenge);
    }

    function reseteChalleng() {
        setActiveChalleng(null);
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
                reseteChalleng 
            }}>
            { children }
        </ChallengsContext.Provider>
    );
}
