import React, { useState } from 'react';
import styles from './TournamentMainboard.module.css'
import { useGlobalContext } from '../context/TournamentContext.jsx';
import Match from './Match.jsx';

const TournamentMainboard = () => {

    const { player1Name, player2Name, player3Name, player4Name, player5Name, player6Name, player7Name, gameStatus, setGameStatus} = useGlobalContext();

    // const [showGame, setShowGame] = useState(false);

     const startgame = () => {
        setGameStatus(true);
     };

  return (
    <div className={styles.last}>
        <div className={styles.play}>
            <div className={styles.matchBegin}>
                <div className={styles.startCard}>
                    {/* left card*/}
                    <div className={styles.gameCard}>
                        <div className={styles.player}>
                        <div className={styles.userImage}>
                            <img src="assets/icons/mel-jira.jpeg"/>
                        </div>
                        <div className={styles.userName}>
                            <p> {player1Name} </p>
                        </div>
                    </div>
                    <div className={styles.vs}>
                        <p>VS</p>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.userImage}>
                            <img src="assets/icons/mel-jira.jpeg"/>
                        </div>
                        <div className={styles.userName}>
                            <p > {player2Name} </p>
                        </div>
                    </div>
                    </div>
                    {/* incase if already played it i should not display start */}
                    <div className={styles.startButton}>
                        <button onClick={startgame}>Start Match</button>
                    </div>
                    {gameStatus && <Match type="left"/>}
                    {/* incase if already played it should display this*/}
                    <div className={styles.youWin} style={{display: 'none'}}>
                        <div className={styles.str}>
                            <p >WIN</p>
                        </div>
                        <div className={styles.userWin}>
                            <div className={styles.userImage}>
                                <img src="assets/icons/mel-jira.jpeg"/>
                            </div>
                            <div className={styles.userName}>
                                <p > {player5Name} </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* left card end*/}

                {/* right card  */}

                <div className={styles.startCard}>
                    <div className={styles.gameCard}>
                        <div className={styles.player}>
                        <div className={styles.userImage}>
                            <img src="assets/icons/mel-jira.jpeg"/>
                        </div>
                        <div className={styles.userName}>
                            <p > {player3Name} </p>
                        </div>
                    </div>
                    <div className={styles.vs}>
                        <p>VS</p>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.userImage}>
                            <img src="assets/icons/mel-jira.jpeg"/>
                        </div>
                        <div className={styles.userName}>
                            <p > {player4Name} </p>
                        </div>
                    </div>
                    </div>
                    <div className={styles.startButton} style={{display: 'none'}}>
                        <button>Start Match</button>
                    </div>
                    <div className={styles.youWin} style={{display: 'flex'}}>
                        <div className={styles.str}>
                            <p >WIN</p>
                        </div>
                        <div className={styles.userWin}>
                            <div className={styles.userImage}>
                                <img src="assets/icons/mel-jira.jpeg"/>
                            </div>
                            <div className={styles.userName}>
                                <p > {player6Name} </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right card  end */}

            </div>
            {/* <div className={styles.matchFinal}>
                <div className={styles.finalCard}>
                    <h1 >FINAL MATCH</h1>
                    <div className={styles.gameCard}>
                        <div className={styles.player}>
                        <div className={styles.userImage}>
                            <img src="assets/icons/mel-jira.jpeg"/>
                        </div>
                        <div className={styles.userName}>
                            <p > mel-jira </p>
                        </div>
                    </div>
                    <div className={styles.vs}>
                        <p>VS</p>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.userImage}>
                            <img src="assets/icons/mel-jira.jpeg"/>
                        </div>
                        <div className={styles.userName}>
                            <p > mel-jira </p>
                        </div>
                    </div>
                    </div>
                    <div className={styles.winer}>
                        <h2 >WINER</h2>
                        <div className={styles.player}>
                        <div className={styles.userImage}>
                            <img src="assets/icons/mel-jira.jpeg"/>
                        </div>
                        <div className={styles.userName}>
                            <p > {player7Name} </p>
                        </div>
                    </div>
                    </div>
                    <div className={styles.startButton}>
                        <button>Start Match</button>
                    </div>
                </div>
            </div> */}
        </div>
    <div className={styles.Button}>
        <button onClick={() => window.location.reload()}>Restart</button>
    </div>
</div>
  )
}

export default TournamentMainboard
