import React, {useRef, useEffect, useState, useContext } from 'react';
import * as gamestyle from  './Game.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/Context';

export default function Game() {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!user)
            navigate("/login");
    }, [user]);

    return (
        <>
            <div className={gamestyle.parent}>
                <div className={gamestyle.container}>
                    <div className={gamestyle.game_card}>
                        <h1>Ping Pong Local</h1>
                        <Link to="/localpong"><img src="assets/evil-kermit-meme.jpeg" alt="Ping Pong Local"/></Link>
                    </div>
                    <div className={gamestyle.game_card}>
                        <h1>Ping Pong 1vs1 Online</h1>
                        <Link to="/onlinepong"><img src="assets/kermit_drink.jpeg" alt="Ping Pong 1vs1 Online"/></Link>
                    </div>
                    <div className={gamestyle.game_card}>
                        <h1>Ping Pong Tournament</h1>
                        <Link to="/tournament"><img src="assets/This_is_fine.png" alt="Ping Pong Tournament"/></Link>
                    </div>
                    <div className={gamestyle.game_card}>
                        <h1>Local Team Pong</h1>
                        <Link to="/localteampong"><img src="assets/icons/localpong.png" alt="Unknown Game"/></Link>
                    </div>
                    <div className={gamestyle.game_card}>
                        <h1>Unknown Game</h1>
                        <Link to="/unknowngame"><img src="assets/icons/localpong.png" alt="Unknown Game"/></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
