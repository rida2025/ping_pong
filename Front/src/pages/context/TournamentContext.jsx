import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export const ContextProvider = ({ children }) => {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player3Name, setPlayer3Name] = useState('Player 3');
  const [player4Name, setPlayer4Name] = useState('Player 4');
  const [player5Name, setPlayer5Name] = useState('Unknown');
  const [player6Name, setPlayer6Name] = useState('Unkonwn');
  const [player7Name, setPlayer7Name] = useState('Unkonwn');

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player3Score, setPlayer3Score] = useState(0);
  const [player4Score, setPlayer4Score] = useState(0);
  
  const [TournamentStart, setTournamentStart] = useState('no');
  const [leftgameStatus, setLeftGameStatus] = useState('waiting');
  const [rightgameStatus, setRightGameStatus] = useState('waiting');
  const [finalgameStatus, setFinalGameStatus] = useState('waiting');

  return (
    <AppContext.Provider // Fixed this part to use AppContext.Provider
      value={{
        player1Name,
        setPlayer1Name,
        player2Name,
        setPlayer2Name,
        player3Name,
        setPlayer3Name,
        player4Name,
        setPlayer4Name,
        player1Score,
        setPlayer1Score,
        player2Score,
        setPlayer2Score,
        player3Score,
        setPlayer3Score,
        player4Score,
        setPlayer4Score,
        TournamentStart,
        setTournamentStart,
        leftgameStatus,
        setLeftGameStatus,
        rightgameStatus,
        setRightGameStatus,
        finalgameStatus,
        setFinalGameStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Optional helper hook to use the context more easily
export const useGlobalContext = () => {
  return useContext(AppContext);
};