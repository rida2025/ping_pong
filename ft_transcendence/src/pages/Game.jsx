import React, { useContext, useEffect, useState } from 'react';
import * as styles from './Game.module.css';
import { useFetcher } from 'react-router-dom';

function Game() {
    

    const [ballradius, setBallRadius] = useState(0);
    const [leftbar, setLeftBar] = useState(0);
    const [rightbar, setRightBar] = useState(0);
    const [leftScore, setLeftScore] = useState(0);
    const [rightScore, setRightScore] = useState(0);
    const [leftRacketY, setLeftRacketY] = useState(0);
    const [rightRacketY, setRightRacketY] = useState(0);
    let centerX = 0;
    let centerY = 0;
    let racketHeight = 0;
    let racketWidth = 0;

    const draw = (ctx, canvas) => {

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawBall(ctx, canvas);
        drawRightBar(ctx, canvas);
        drawLeftBar(ctx, canvas);
        // requestAnimationFrame(draw);
    }

    const drawLeftBar = (ctx, canvas) => {
        // Draw the LeftBar
        ctx.fillStyle = '#00FF00'; // Red color
        let width = (canvas.width * 2.5 / 100);
        if (width > 16)
            width = 16;
        racketHeight = (canvas.height * 20 / 100);
        racketWidth = width;
        ctx.fillRect(0, leftRacketY, width, (canvas.height * 20 / 100)); // Fill the circle
    };
    
    const drawRightBar = (ctx, canvas) => {
        // Draw the RightBar
        // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#00FF00'; // Red color
        let width = (canvas.width * 2.5 / 100);
        if (width > 16)
            width = 16;
        racketHeight = (canvas.height * 20 / 100);
        racketWidth = width;
        ctx.fillRect(canvas.width-width, rightRacketY, width, (canvas.height * 20 / 100)); // Fill the circle
    };
    
    const drawBall = (ctx, canvas) => {
        // Draw the ball
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        centerX = canvas.clientWidth / 2;
        centerY = canvas.clientHeight / 2;
        setBallRadius(Math.min(centerX, centerY) * 0.05);
        // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.beginPath();
        ctx.arc(centerX, centerY, ballradius, 0, Math.PI * 2); // Draw the circle
        ctx.fillStyle = '#ff0000'; // Red color
        ctx.fill(); // Fill the circle
        ctx.closePath(); // Close the path
    };

    useEffect(() => {
        const canvas = document.getElementById('canvas') ;
        const ctx = canvas.getContext('2d');
        // Function to draw the ball

        draw(ctx, canvas);

        const handleResize = () => {
            draw(ctx, canvas);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    
    }, [ballradius, leftbar, rightbar]);

    
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            const step = 55; // Racket movement step size
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
    
            if (key === 'w' && leftRacketY > 0) {
                console.log("w");
                setLeftRacketY(prevY => Math.max(prevY - step, 0));
                draw(ctx, canvas);
            } else if (key === 's' && leftRacketY < canvas.height - racketHeight) {
                console.log("s");
                setLeftRacketY(prevY => Math.min(prevY + step, canvas.height - racketHeight));
                draw(ctx, canvas);
            } if (key === 'ArrowUp' && rightRacketY > 0) {
                console.log("ArrowUp");
                setRightRacketY(prevY => Math.max(prevY - step, 0));
                draw(ctx, canvas);
            } else if (key === 'ArrowDown' && rightRacketY < canvas.height - racketHeight) {
                console.log("ArrowDown");
                setRightRacketY(prevY => Math.min(prevY + step, canvas.height - racketHeight));
                draw(ctx, canvas);
            }
        };
        const handleKeyUp = (event) => {
            const { key } = event;
            const step = 55; // Racket movement step size
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
    
            if (key === 'w' && leftRacketY > 0) {
                console.log("w");
                setLeftRacketY(prevY => Math.max(prevY - step, 0));
                draw(ctx, canvas);
            } else if (key === 's' && leftRacketY < canvas.height - racketHeight) {
                console.log("s");
                setLeftRacketY(prevY => Math.min(prevY + step, canvas.height - racketHeight));
                draw(ctx, canvas);
            } if (key === 'ArrowUp' && rightRacketY > 0) {
                console.log("ArrowUp");
                setRightRacketY(prevY => Math.max(prevY - step, 0));
                draw(ctx, canvas);
            } else if (key === 'ArrowDown' && rightRacketY < canvas.height - racketHeight) {
                console.log("ArrowDown");
                setRightRacketY(prevY => Math.min(prevY + step, canvas.height - racketHeight));
                draw(ctx, canvas);
            }
        };
        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [leftRacketY, rightRacketY]);
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

export default Game;