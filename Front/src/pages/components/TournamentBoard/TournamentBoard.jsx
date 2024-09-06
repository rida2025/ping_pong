import React from 'react'
import styles from './TournamentBoard.module.css'

const TournamentBoard = () => {
  return (
    <div className={styles.first}>
        <div className={styles.etaps}>
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
        </div>
        <div className={styles.etaps}>
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
        </div>
        <div className={styles.etaps}>
            <div className={styles.winPlayer}>
            <div className={styles.userImage}>
                <img src="assets/icons/mel-jira.jpeg"/>
            </div>
            <div className={styles.userName}>
                <p > mel-jira </p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default TournamentBoard
