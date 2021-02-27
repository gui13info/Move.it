import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallengs } from "../components/CompletedChallengs";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengsProvider } from '../contexts/ChallengContext';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengsProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengCompleted={props.challengCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div >
              <Profile />
              <CompletedChallengs />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengCompleted } = ctx.req.cookies;
  
  return{
    props : {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengCompleted: Number(challengCompleted)
    }
  }
}