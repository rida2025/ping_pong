import React from 'react'
import styles from './TournamentMainboard.module.css'
import { useGlobalContext } from '../context/TournamentContext.jsx';

const TournamentMainboard = () => {

    const { player1Name, player2Name, player3Name, player4Name, player5Name, player6Name, player7Name, setLeftGameStatus, setRightGameStatus, setFinalGameStatus,
     } = useGlobalContext();

    const startleftgame = () => {
        const { leftgameStatus, setLeftGameStatus} = useGlobalContext();
        setLeftGameStatus('started');
    }

    const startrightgame = () => { 
        setRightGameStatus('started');
    }

    const startfinalgame = () => {
        setFinalGameStatus('started');
    }

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
                    {/* incase if already played it i should not display start */}
                    <div className={styles.startButton} style={{display: 'flex'}}>
                        <button onClick={startleftgame}>Start Match</button>
                    </div>
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
                                <p > mel-jira </p>
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
                                <p > mel-jira </p>
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
                            <p > mel-jira </p>
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
        <button>Restart</button>
    </div>
</div>
  )
}

export default TournamentMainboard
