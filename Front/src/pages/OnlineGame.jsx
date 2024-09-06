import React, {useRef, useEffect, useState } from 'react';
import * as styles from './OnlineGame.module.css';
import { useNavigate } from 'react-router-dom';


function getOrCreateName() {
    const storedName = localStorage.getItem('username');
    
    if (storedName) {
        return storedName;
    } else {
        const newName = generateRandomName();
        localStorage.setItem('username', newName);
        return newName;
    }
}

function generateRandomName() {
    const firstNames = ["Mohammed", "Reda", "Hassan", "Bilal", "Khalid", "Nour", "Eddine"];
    const lastNames = ["Jirari", "Jirari","Sobane", "Eddinaoui", "Bouychou", "Ouahidi", "Ouahidi"];
    
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName}${randomLastName}`;
}

export default function  OnlineGame() {

    const pressedKeys = useRef(new Set());
    const [ rightScore, setRightScore ] = useState(0);
    const [ leftScore, setLeftScore ] = useState(0);
    const [ gamestarted, setGameStarted ] = useState(false);
    const [ condition, setCondition ] = useState('N');
    const [ MESSAGE, setMessage ] = useState("message");

    useEffect(() => {
        const username = getOrCreateName();
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
        let myReq;
        let pause = 0;
        let socket = new WebSocket('ws://10.13.10.16:8000/ws/socket-server/');

        socket.onopen = () => {
            console.log('my name is', username);
            if (socket.readyState === WebSocket.OPEN) {
                const message = {
                    action: 'connect',
                    username: username,
                    level: 1,
                };
                socket.send(JSON.stringify(message));
                console.log('WebSocket is open now');
            } else {
                console.error('WebSocket is not open. readyState:', socket.readyState);
            }
        };
    
        socket.onmessage = (event) => {
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
                if (data.hasOwnProperty('player_id1') && data.player_id1 === username){
                    player_id = 1;
                    console.log('myplayer id is 1');
                }
                if (data.hasOwnProperty('player_id2') && data.player_id2 === username){
                    player_id = 2;
                    console.log('myplayer id is 2');
                }
                if (data.hasOwnProperty('ball_radius'))
                    ball_radius = ((canvas.height / 800 + canvas.width / 500) / 2) * 15
                if (data.hasOwnProperty('message')) {
                    if (data.message === 'Game_started')
                        setGameStarted(true);
                    else if (data.message === 'disconnected'){
                        setCondition('D');
                        socket.close();
                        setMessage("Opponent left the game");
                        console.log("Opponent left the game");
                    }
                }
                if (data.hasOwnProperty('winner')) {
                    console.log("winner", data.winner, player_id);
                    if (data.winner == player_id){
                        setCondition('W');
                        setMessage("You won the game");
                        console.log("You won the game");
                    }
                    socket.close();
                }
                if (data.hasOwnProperty('loser')) {
                    console.log("loser", data.loser, player_id);
                    if (data.loser == player_id){
                        setCondition('L');
                        setMessage("You lost the game");
                        console.log("You lost the game");
                    }
                    socket.close();
                }
        };
    
        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        const drawball = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            ctx.fillStyle = 'white';

            ctx.arc(ballx, bally, ball_radius, 0, Math.PI * 2);
            ctx.fillRect(canvas.clientWidth / 2-3,0, 6, canvas.height);
            ctx.fill();
        };

        const drawLeftRacket = () => {
            ctx.fillStyle = '#00FF00';
            racketWidth = (canvas.width * 2.5 / 100);
            racketHeight = (canvas.height * 20 / 100);
            ctx.fillRect(0, leftRacketY, racketWidth, racketHeight);
        }

        const drawRightRacket = () => {
            ctx.fillStyle = '#00FF00';
            racketWidth = (canvas.width * 2.5 / 100);
            racketHeight = (canvas.height * 20 / 100);
            ctx.fillRect(canvas.width-racketWidth, rightRacketY, racketWidth, racketHeight);
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (pressedKeys.current.has('w') && player_id === 1) {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 'w',
                        value: 10,
                    };
                    socket.send(JSON.stringify(message));
                    console.log('sent w');
                }
            }
            else if (pressedKeys.current.has('s') && player_id === 1) {
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
                        value: 1,
                    };
                    socket.send(JSON.stringify(message));
                }
            }
            const currentPath = window.location.pathname;
            if (currentPath === '/onlinepong' && condition === 'N')
                return requestAnimationFrame(draw);
            else
                return cancelAnimationFrame(myReq);
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

    useEffect(() => {
        console.log('condition', condition, 'gamestarted', gamestarted);
        if (gamestarted){
            document.getElementById('matchmaking').style.display = "none";
            document.getElementById('result').style.display = "none";
            console.log('condition',    condition);
        }
        if (condition != 'N'){
            document.getElementById('result').style.display = "block";
            console.log('who the result',    condition);
        }
        if (!gamestarted && condition === 'N')
            document.getElementById('matchmaking').style.display = "block";
    }, [gamestarted, condition]);

    const navigate = useNavigate();

    const handleExitClick = () => {
        navigate('/'); // Redirects to the home page
    };

    return (
        <>
            <div id="matchmaking" className={styles.matchmaking}>
                <div className={styles.centered}>
                    <div className={styles.holderx}>
                        <div className={styles.leftplayer}>
                            <img src="assets/icons/mel-jira.jpeg" className={styles.userImg}/>
                            <h4>Your Name</h4>
                        </div>
                        <div className={styles.vs}>
                            <img src="assets/loading.gif" className={styles.loadingGif}/>
                            <p>VS</p>
                        </div>
                        <div className={styles.leftplayer}>
                            <img src="assets/icons/mel-jira.jpeg" className={styles.userImg}/>
                            <h4>Your Name</h4>
                        </div>
                    </div>
                    <div className={styles.buttoncontainer}>
                        <div className={styles.Button}>
                            <button onClick={handleExitClick}>Exit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="result" className={styles.result}>
                <div className={styles.centered}>
                    <div className={styles.holderx} style={{height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <h4>{MESSAGE}</h4>
                        <div className={styles.buttoncontainer}>
                        <div className={styles.Button}>
                            <button onClick={handleExitClick}>Exit</button>
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
                            <h3>score: {leftScore}</h3>
                        </div>
                    </div>
                    <div className={styles.player}>
                        <img src="assets/icons/mel-jira.jpeg" className={styles.userImg}/>
                        <div className={styles.playerInfo}>
                            <h2>Reda</h2>
                            <h3>score: {rightScore}</h3>
                        </div>
                    </div>
                </div>
                <canvas id="canvas" className={styles.canvass}></canvas>
            </div>
        </>
    );
}
