import React from 'react'
import styles from './Tournament.module.css'
import TournamentBoard from './components/TournamentBoard/TournamentBoard'
import TournamentMainboard from './components/TournamentMainboard/TournamentMainboard'

const Tournament = () => {
  return (
    <div className={styles.tournament}>
        <div className={styles.content}>
            <TournamentBoard />
            <TournamentMainboard />
        </div>
    </div>
  )
}

export default Tournament
