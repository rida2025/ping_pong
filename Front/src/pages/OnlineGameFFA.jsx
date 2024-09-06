import React, {useRef, useEffect, useState } from 'react';
import * as styles from './OnlineGame.module.css';

export default function OnlineGame() {

    const pressedKeys = useRef(new Set());
    const [ rightScore, setRightScore ] = useState(0);
    const [ leftScore, setLeftScore ] = useState(0);

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let game_width = 800;
        let game_height = 500;
        let ballx = 0;
        let bally = 0;
        let ball_radius = 0;
        let racketHeight = 0;
        let racketWidth = 0;
        let leftRacketY = 0;
        let rightRacketY = 0;
        let player_id = 0;
        let pause = 0;
        let myReq;
    
        let socket = new WebSocket('ws://10.13.10.14:8000/ws/socket-server/');
        // let socket = new WebSocket('ws://localhost:8000/ws/socket-server/');

        // Connection opened
        socket.onopen = () => {
            if (socket.readyState === WebSocket.OPEN) {
                const message = {
                    type: 'state',  // Ensure type matches what server expects
                    content: 'user connected',
                };
                socket.send(JSON.stringify(message));
                console.log('WebSocket is open now');
            } else {
                console.error('WebSocket is not open. readyState:', socket.readyState);
            }
        };
    
        // Listen for messages
        socket.onmessage = (event) => {
            // try {
                const data = JSON.parse(event.data);
                console.log('Received:', data)
                if (data.hasOwnProperty('ballx'))
                    ballx = (data.ballx / 800) * canvas.width
                if (data.hasOwnProperty('bally'))
                    bally = (data.bally / 500) * canvas.height
                if (data.hasOwnProperty('right_paddleY'))
                    rightRacketY = (data.right_paddleY / 500) * canvas.height
                if (data.hasOwnProperty('left_paddleY'))
                    leftRacketY = (data.left_paddleY / 500) * canvas.height
                if (data.hasOwnProperty('right_score'))
                    setRightScore(data.right_score)
                if (data.hasOwnProperty('left_score'))
                    setLeftScore(data.left_score)
                if (data.hasOwnProperty('racketHeight'))
                    racketHeight =  data.racketHeight
                if (data.hasOwnProperty('racketWidth'))
                    racketWidth = data.racketWidth
                if (data.hasOwnProperty('player_id'))
                    player_id = data.player_id
                if (data.hasOwnProperty('ball_radius'))
                    ball_radius = ((canvas.height / 800 + canvas.width / 500) / 2) * 15
                if (data.hasOwnProperty('resumed')) {
                    pause = 0;
                }
            // } catch (error) {
            //     console.error('Error parsing message:', error);
            // }
        };
    
        // Handle connection close
        socket.onclose = () => {
        console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };


        const drawball = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            // centerX = ((canvas.width / 2) + ballx);
            // centerY = ((canvas.height / 2) + bally);
            // ballspeed = canvas.width / (4 * 60) + bonus;
            ctx.fillStyle = 'white';

            ctx.arc(ballx, bally, ball_radius, 0, Math.PI * 2);
            ctx.fillRect(canvas.clientWidth / 2-3,0, 6, canvas.height);
            ctx.fill();
        };

        const drawLeftRacket = () => {
            ctx.fillStyle = '#00FF00';
            racketWidth = (canvas.width * 2.5 / 100);
            // if (racketWidth > 16)
            //     racketWidth = 16;
            racketHeight = (canvas.height * 20 / 100);
            ctx.fillRect(0, leftRacketY, racketWidth, racketHeight);
        }

        const drawRightRacket = () => {
            ctx.fillStyle = '#00FF00';
            racketWidth = (canvas.width * 2.5 / 100);
            // if (racketWidth > 16)
            //     racketWidth = 16;
            racketHeight = (canvas.height * 20 / 100);
            ctx.fillRect(canvas.width-racketWidth, rightRacketY, racketWidth, racketHeight);
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log('sent x');
            console.log(Array.from(pressedKeys).join(', '));
            console.log(Array.from(pressedKeys));
            if (pressedKeys.current.has('Spacebar')) {
                // leftRacketY = Math.max(leftRacketY - speed, 0);
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 'pause',
                        value: 5,
                    };
                    socket.send(JSON.stringify(message));
                    console.log('sent pause');
                    pause = 1;
                }
            }

            if (pressedKeys.current.has('w') && player_id === 1) {
                // leftRacketY = Math.max(leftRacketY - speed, 0);
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 'w',
                        value: 10,
                    };
                    socket.send(JSON.stringify(message));
                    console.log('sent w');
                    console.log('pressedKeys:', pressedKeys);
                }
            }
            else if (pressedKeys.current.has('s') && player_id === 1) {
                // leftRacketY = Math.min(leftRacketY + speed, canvas.height - racketHeight);
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 's',
                        value: 10,
                    };
                    socket.send(JSON.stringify(message));
                    console.log('sent s');
                }
            }
            if (pressedKeys.current.has('ArrowUp') && player_id === 2) {
                // rightRacketY = Math.max(rightRacketY - speed, 0);
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 'ArrowUp',
                        value: 10,
                    };
                    socket.send(JSON.stringify(message));
                    console.log('sent ArrowUp');
                }
            }
            else if (pressedKeys.current.has('ArrowDown') && player_id === 2) {
                // rightRacketY = Math.min(rightRacketY + speed, canvas.height - racketHeight);
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 'ArrowDown',
                        value: 10,
                    };
                    socket.send(JSON.stringify(message));
                    console.log('sent ArrowDown');
                }
            }
            drawball();
            drawLeftRacket();
            drawRightRacket();
            if (socket && socket.readyState === WebSocket.OPEN) {
                if (pause === 0) {
                    const message = {
                        action: 'state',
                        value: 5,
                    };
                    socket.send(JSON.stringify(message));
                }
            }

            return requestAnimationFrame(draw);
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

    return (
        <>
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
                            <h2>Reda</h2>
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
