import React, { useState } from 'react';
import styles from './MainTournament.module.css'
import { useGlobalContext } from '../context/TournamentContext.jsx';

const MainTournament = () => {
    const { setPlayer1Name, setPlayer2Name, setPlayer3Name, setPlayer4Name, setTournamentStart } = useGlobalContext();

    const [player1Input, setPlayer1Input] = useState('');
    const [player2Input, setPlayer2Input] = useState('');
    const [player3Input, setPlayer3Input] = useState('');
    const [player4Input, setPlayer4Input] = useState('');

    const starttournament = () => {
        setPlayer1Name(player1Input);
        setPlayer2Name(player2Input);
        setPlayer3Name(player3Input);
        setPlayer4Name(player4Input);
        setTournamentStart('yes'); // Update the context to indicate the tournament has started
      };

    return (
        <div className={styles.last}>
            <div className={styles.play}>
                <div className={styles.starting}>
                    <div className={styles.cnt}>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 1"  onChange={(e) => setPlayer1Input(e.target.value)}/>
                        </div>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 2"  onChange={(e) => setPlayer2Input(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.cnt}>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 3"  onChange={(e) => setPlayer3Input(e.target.value)}/>
                        </div>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 4"  onChange={(e) => setPlayer4Input(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.Button}>
                <button onClick={starttournament}>Start</button>
            </div>
        </div>
    )
}

export default MainTournament