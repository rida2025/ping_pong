import React, {useRef, useEffect, useState, useContext } from 'react';
import * as styles from './AiPong.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/Context';

export default function  AiGame() {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const pressedKeys = useRef(new Set());
    const [ rightScore, setRightScore ] = useState(0);
    const [ leftScore, setLeftScore ] = useState(0);
    const [ gamestarted, setGameStarted ] = useState(false);
    const [ condition, setCondition ] = useState('N');
    const [ MESSAGE, setMessage ] = useState("message");
    const [ username, setUsername ] = useState(user.user.username);
    const [ avatar, setAvatar ] = useState(user.user.avatar);
    let socket = null;

    const leftup = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = {
                action: 'w',
                value: 10,
            };
            socket.send(JSON.stringify(message));
        }
    };

    const leftdown = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = {
                action: 's',
                value: 10,
            };
            socket.send(JSON.stringify(message));
        }
    };

    const rightup = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = {
                action: 'ArrowUp',
                value: 10,
            };
            socket.send(JSON.stringify(message));
        }
    };

    const rightdown = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = {
                action: 'ArrowDown',
                value: 10,
            };
            socket.send(JSON.stringify(message));
        }
    };

    useEffect(() => {
        const username = user.user.username;
        const avatar = user.user.avatar;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const game_width = 800;
        const game_height = 500;
        let ballx = 0;
        let bally = 0;
        let ball_radius = 0;
        let racketHeight = 0;
        let racketWidth = 0;
        let leftRacketY = 0;
        let rightRacketY = 0;
        let myReq;
        socket = new WebSocket(`ws://10.11.10.12:8000/ws/ai-game/`);

        socket.onopen = () => {
            // console.log('my name is:', username, "my avatar is:", avatar);
            if (socket.readyState === WebSocket.OPEN) {
                const message = {
                    action: 'connect',
                };
                socket.send(JSON.stringify(message));
                console.log('WebSocket is open now');
            } else {
                console.error('WebSocket is not open. readyState:', socket.readyState);
            }
        };
    
        window.leftup = leftup;
        window.leftdown = leftdown;
        window.rightup = rightup;
        window.rightdown = rightdown;
    
        socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                // console.log('Received:', data)
                if (data.message){
                    if (data.message === 'game_data'){
                        ballx = (data.ballx / game_width) * canvas.width
                        bally = (data.bally / game_height) * canvas.height
                        rightRacketY = (data.right_paddleY / game_height) * canvas.height
                        leftRacketY = (data.left_paddleY / game_height) * canvas.height
                        setRightScore(data.right_score)
                        setLeftScore(data.left_score)
                        racketHeight =  data.racketHeight
                        racketWidth = data.racketWidth
                        ball_radius = ((canvas.height / game_width + canvas.width / game_height) / 2) * 15
                    }
                }
                if (data.message){
                    if (data.message === 'game_started'){
                        setGameStarted(true);
                    }
                    else if (data.message === 'disconnected'){
                        setCondition('D');
                        socket.close();
                        setMessage("Opponent left the game");
                    }
                }
                if (data.hasOwnProperty('winner')) {
                    if (data.winner == player_id){
                        setCondition('W');
                        setMessage("You won the game");
                    }
                    socket.close();
                }
                if (data.hasOwnProperty('loser')) {
                    if (data.loser == player_id){
                        setCondition('L');
                        setMessage("You lost the game");
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
            console.log("ballx", ballx, "bally", bally, "ball_radius", ball_radius);
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
            if (pressedKeys.current.has('ArrowUp')) {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 'ArrowUp',
                        value: 10,
                    };
                    socket.send(JSON.stringify(message));
                }
            }
            else if (pressedKeys.current.has('ArrowDown')) {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    const message = {
                        action: 'ArrowDown',
                        value: 10,
                    };
                    socket.send(JSON.stringify(message));
                }
            }
            drawball();
            drawLeftRacket();
            drawRightRacket();
            const currentPath = window.location.pathname;
            if (currentPath === '/games/aipong' && condition === 'N')
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

            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close(); // Close WebSocket when the component unmounts
            }
        };
    }, []);

    useEffect(() => {
        console.log("gamestarted", gamestarted);
        if (gamestarted){
            document.getElementById('result').style.display = "none";
        }
        if (condition != 'N'){
            document.getElementById('result').style.display = "block";
        }
    }, [gamestarted, condition]);

    const handleExitClick = () => {
        navigate('/pingpong-games');
    };

    return (
        <>
            <div id="result" className={styles.result}>
                <div className={styles.centered}>
                    <div className={styles.holderx} style={{height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className={styles.message}>
                            <h4>{MESSAGE}</h4>
                            {condition !== 'D' && (
                                <>
                                    <img src={avatar}/>
                                    <h3>{username}</h3>
                                </>
                            )}
                        </div>
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
                        <img src="/assets/unknown.png" className={styles.userImg}/>
                        <div className={styles.playerInfo}>
                            <h2>Ai Player</h2>
                            <h3>score: {leftScore}</h3>
                        </div>
                    </div>
                    <div className={styles.player}>
                        <img src={avatar} className={styles.userImg}/>
                        <div className={styles.playerInfo}>
                            <h2>{username}</h2>
                            <h3>score: {rightScore}</h3>
                        </div>
                    </div>
                </div>
                <canvas id="canvas" className={styles.canvass}></canvas>
            </div>
        </>
    );
}
