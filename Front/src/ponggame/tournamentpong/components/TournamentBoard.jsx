import React from 'react'
import styles from './TournamentBoard.module.css'
import { useGlobalContext } from '../context/TournamentContext.jsx';

const TournamentBoard = () => {

    const { player1Name, player2Name, player3Name, player4Name, player5Name,player5Avatar, player6Name,player6Avatar, player7Name, player7Avatar } = useGlobalContext();
    
  return (
    <div className={styles.first}>
        <div className={styles.etaps}>
            <div className={styles.gameCard}>
                <div className={styles.player}>
                    <div className={styles.userImage}>
                        <img src="/assets/battlebeast.png"/>
                    </div>
                    <div className={styles.userName}>
                        <p > {player1Name} </p>
                    </div>
                </div>
                <div className={styles.vs}>
                    <p>VS</p>
                </div>
                <div className={styles.player}>
                    <div className={styles.userImage}>
                        <img src="/assets/homelander.png"/>
                    </div>
                    <div className={styles.userName}>
                        <p > {player2Name} </p>
                    </div>
                </div>
            </div>
            <div className={styles.gameCard}>
                <div className={styles.player}>
                    <div className={styles.userImage}>
                        <img src="/assets/superman.png"/>
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
                        <img src="/assets/superior.png"/>
                    </div>
                    <div className={styles.userName}>
                        <p > {player4Name} </p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.etaps}>
        <div className={styles.gameCard}>
                <div className={styles.player}>
                    <div className={styles.userImage}>
                        <img src={player5Avatar}/>
                    </div>
                    <div className={styles.userName}>
                        <p > {player5Name} </p>
                    </div>
                </div>
                <div className={styles.vs}>
                    <p>VS</p>
                </div>
                <div className={styles.player}>
                    <div className={styles.userImage}>
                        <img src={player6Avatar}/>
                    </div>
                    <div className={styles.userName}>
                        <p > {player6Name} </p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.etaps}>
            <div className={styles.winPlayer}>
            <div className={styles.userImage}>
                <img src={player7Avatar}/>
            </div>
            <div className={styles.userName}>
                <p > {player7Name} </p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default TournamentBoard
