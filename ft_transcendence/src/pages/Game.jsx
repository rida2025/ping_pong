import React, { useEffect, useRef } from 'react';
import * as styles from './Game.module.css';

function Game() {
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        resizeCanvas(canvas, ctx);
        let ballx = 200;
        let bally = 200;
        let ballRadius = 25;
        let dx = 2;
        let dy = 2;

        function gameUpdate() {
            // Update the ball's position
            ballx += dx;
            bally += dy;

            // Bounce the ball off the edges of the canvas
            if (ballx + ballRadius > canvas.width || ballx - ballRadius < 0) {
                dx = -dx;
            }
            if (bally + ballRadius > canvas.height || bally - ballRadius < 0) {
                dy = -dy;
            }
        }

        function gameDraw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(ballx, bally, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
            ctx.closePath();
        }

        function gameLoop() {
            gameUpdate();
            gameDraw();
            window.requestAnimationFrame(gameLoop);
        }

        gameLoop();

        const handleResize = () => {
            resizeCanvas(canvas, ctx);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function resizeCanvas(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div className={styles.gameContainer}>
            <canvas id="canvas" className={styles.canvass}></canvas>
        </div>
    );
}

export default Game;