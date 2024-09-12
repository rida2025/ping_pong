import React from 'react'
import styles from './TournamentMainboard.module.css'

const TournamentMainboard = () => {
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
        <div className={styles.matchBegin}>
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
                <div className={styles.startButton} style={{display: 'flex'}}>
                    <button>Start Match</button>
                </div>
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

            {/* left card  */}

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
