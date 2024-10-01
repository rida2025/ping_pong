import React from 'react'
import styles from './StartTournament.module.css'
import TournamentBoard from './TournamentBoard'
import StartingPage from './InputPage.jsx'
import AfterStart from './TournamentMainboard'
import { useGlobalContext } from '../context/TournamentContext.jsx';

const StartTournament = () => {
  const { TournamentStart } = useGlobalContext();
  return (
    <div className={styles.tournament}>
      <div className={styles.content}>
        <TournamentBoard />
        {TournamentStart === 'no' ? <StartingPage /> : <AfterStart />}
      </div>
    </div>
  )
}

export default StartTournament