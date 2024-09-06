import React, {useRef, useEffect, useState } from 'react';
import * as styles from './LocalGame.module.css';
import { useNavigate } from 'react-router-dom';

export default function LocalGame() {

    const pressedKeys = useRef(new Set());
    const [rightScore, setRightScore] = useState(0);
    const [leftScore, setLeftScore] = useState(0);
    const [condition, setCondition] = useState('R');
    const [winner, setWinner] = useState('jow shmo');
    const [winner_score, setScore] = useState(-1);

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let centerX = 0;
        let centerY = 0;
        let ballx = 0;
        let bally = 0;
        let speed = 12;
        let ballspeed = 1;
        let balldirectionX = 1;
        let balldirectionY = 1;
        let racketHeight = 0;
        let racketWidth = 0;
        let leftRacketY = 0;
        let rightRacketY = 0;
        let bonus = 0;
        let myReq;
        let left_score = 0;
        let right_score = 0;
        let mycondition = 'R';

        const drawball = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            centerX = ((canvas.width / 2) + ballx);
            centerY = ((canvas.height / 2) + bally);
            ballspeed = canvas.width / (4 * 60) + bonus;
            ctx.fillStyle = 'white';
            ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
            ctx.fillRect(canvas.clientWidth / 2-3,0, 6, canvas.height);
            ctx.fill();
        };

        const drawLeftRacket = () => {
            ctx.fillStyle = '#00FF00';
            racketWidth = (canvas.width * 2.5 / 100);
            if (racketWidth > 16)
                racketWidth = 16;
            racketHeight = (canvas.height * 20 / 100);
            ctx.fillRect(0, leftRacketY, racketWidth, racketHeight);
        }

        const drawRightRacket = () => {
            ctx.fillStyle = '#00FF00';
            racketWidth = (canvas.width * 2.5 / 100);
            if (racketWidth > 16)
                racketWidth = 16;
            racketHeight = (canvas.height * 20 / 100);
            ctx.fillRect(canvas.width-racketWidth, rightRacketY, racketWidth, racketHeight);
        }

        const gamelogic = () => {
            ballx += (ballspeed + bonus) * balldirectionX;
            bally += (ballspeed + bonus) * balldirectionY;
            if (rightRacketY <= ((canvas.height / 2) + bally + 15) && rightRacketY + racketHeight >= ((canvas.height / 2) + bally - 15) && ((canvas.width / 2) + ballx + 15) >= (canvas.width - racketWidth)) {
                let offset = ((canvas.height / 2) + bally) - (rightRacketY + racketHeight / 2);
                offset = offset / (racketHeight / 2);
                ballx = (canvas.width / 2 ) - racketWidth - 15 - 1;
                balldirectionX *= -1;
                balldirectionY = offset;
                if (bonus > 2)
                    bonus = 2;
                bonus++;
            }
            else if (leftRacketY <= ((canvas.height / 2) + bally + 15) && leftRacketY + racketHeight >= ((canvas.height / 2) + bally - 15) && ((canvas.width / 2) + ballx - 15) <= (0 + racketWidth)) {
                let offset = ((canvas.height / 2) + bally) - (leftRacketY + racketHeight / 2);
                offset = offset / (racketHeight / 2);
                ballx = -(canvas.width / 2 ) + racketWidth + 15;
                balldirectionX *= -1;
                balldirectionY = offset;
                if (bonus > 2)
                    bonus = 2;
                bonus++;
            }
            else if (((canvas.height / 2) + bally - 15) <= 0) {
                bally = -(canvas.height / 2) - -16;
                balldirectionY *= -1;
            }
            else if (((canvas.height / 2) + bally + 15) >= canvas.height){
                bally = (canvas.height / 2) - 16;
                balldirectionY *= -1;
            }
            else if ((canvas.width / 2) - 15 < ballx) {
                ballx = 0;
                bally = 0;
                balldirectionX = -1;
                balldirectionY = Math.random() * 2 - 1;
                setLeftScore(prevScore => prevScore + 1);
                left_score++;
                if (left_score >= 3){
                    setCondition('S');
                    mycondition = 'S';
                    document.getElementById('result').style.display = "block";
                    setWinner("Mohammed");
                    setScore(3);
                }
            } else if (-(canvas.width / 2) + 15 > ballx) {
                ballx = 0;
                bally = 0;
                balldirectionX = 1;
                balldirectionY = Math.random() * 2 - 1;
                setRightScore(prevScore => prevScore + 1);
                right_score++;
                if (right_score >= 3){
                    setCondition('S');
                    mycondition = 'S';
                    document.getElementById('result').style.display = "block";
                    setWinner("Local friend");
                    setScore(3);
                }
            }
        };

        const draw = () => {
            if (mycondition === 'S') {
                cancelAnimationFrame(myReq);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (pressedKeys.current.has('w')) {
                leftRacketY = Math.max(leftRacketY - speed, 0);
            }
            else if (pressedKeys.current.has('s')) {
                leftRacketY = Math.min(leftRacketY + speed, canvas.height - racketHeight);
            }
            if (pressedKeys.current.has('ArrowUp')) {
                rightRacketY = Math.max(rightRacketY - speed, 0);
            }
            else if (pressedKeys.current.has('ArrowDown')) {
                rightRacketY = Math.min(rightRacketY + speed, canvas.height - racketHeight);
            }
            drawball();
            drawLeftRacket();
            drawRightRacket();
            gamelogic();
            console.log('condition', condition);
            if (condition === 'R')
            {
                return requestAnimationFrame(draw);
            }else
            {
                return cancelAnimationFrame(myReq);
            }
        };

        const handleKeyDown = (event) => {
            pressedKeys.current.add(event.key);
        };

        const handleKeyUp = (event) => {
            pressedKeys.current.delete(event.key);
        };

        myReq = requestAnimationFrame(draw);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(myReq);
        };
    }, []);

    const navigate = useNavigate();

    const handleExitClick = () => {
        navigate('/'); // Redirects to the home page
    };
    return (
        <>
            <div id="result" className={styles.result}>
                <div className={styles.centered}>
                    <div className={styles.holderx}>
                        <div className={styles.holderx}>
                            <h4>Winner {winner} by {winner_score}</h4>
                            <div className={styles.buttoncontainer}>
                                <div className={styles.Button}>
                                    <button onClick={handleExitClick}>Exit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className={styles.gameContainer}>
                <div className={styles.topgame}>
                    <div className={styles.player}>
                        <img src="assets/icons/mel-jira.jpeg" className={styles.userImg}/>
                        <div className={styles.playerInfo}>
                            <h2>Mohammed</h2>
                            <p>use W to move up && S to move down</p>
                            <h3>score: {leftScore}</h3>
                        </div>
                    </div>
                    <div className={styles.player}>
                        <img src="assets/icons/mel-jira.jpeg" className={styles.userImg}/>
                        <div className={styles.playerInfo}>
                            <h2>Local friend</h2>
                            <p>use ↑ to move up && ↓ to move down</p>
                            <h3>score: {rightScore}</h3>
                        </div>
                    </div>
                </div>
                <canvas id="canvas" className={styles.canvass}></canvas>
            </div>
        </>
    );
}
