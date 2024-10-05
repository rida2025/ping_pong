import React, { useContext } from 'react'
import styles from './Tournament.module.css'
import StartTournament from './components/StartTournament.jsx'
import { ContextProvider } from './context/TournamentContext.jsx';

const Tournament = () => {

  return (
    <ContextProvider>
      <StartTournament/>
    </ContextProvider>
  );
};

export default Tournament
