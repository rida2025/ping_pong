import React from 'react'
import styles from './MainTournament.module.css'
import { useGlobalContext } from '../context/TournamentContext.jsx';

const starttournament = () => {
    const {setTournamentStart } = useGlobalContext();
    setTournamentStart('yes');
}

const MainTournament = () => {
    return (
        <div className={styles.last}>
            <div className={styles.play}>
                <div className={styles.starting}>
                    <div className={styles.cnt}>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 1"/>
                        </div>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 2"/>
                        </div>
                    </div>
                    <div className={styles.cnt}>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 3"/>
                        </div>
                        <div className={styles.inp}>
                            <input type="text" placeholder="Player 4"/>
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