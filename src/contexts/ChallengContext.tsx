import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallengsProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengCompleted: number;
}

export const ChallengsContext = createContext({} as ChallengContextData);

export function ChallengsProvider({ 
    children, 
    ...rest
}:ChallengsProviderProps ) {
    const [ level, setLevel ] = useState(rest.level ?? 1);
    const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [ challengCompleted, setChallengCompleted ] = useState(rest.challengCompleted ?? 0);

    const [ activeChalleng, setActiveChalleng ] = useState(null);
    const[isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengCompleted', String(challengCompleted));
    }, [level, currentExperience, challengCompleted]);

    
    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }
    
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
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
                reseteChalleng,
                completeChalleng,
                closeLevelUpModal
            }}>
            { children }

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengsContext.Provider>
    );
}
