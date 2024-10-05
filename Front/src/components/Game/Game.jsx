import React, { useEffect, useState } from 'react';
import styl from './Game.module.css';
import _1vs1 from './assets/1vs1.jpeg';
import tic from './assets/tictac.jpeg';
import ping from './assets/ping.jpeg';
import tournoi from './assets/tournii.jpeg';
import team from './assets/tmvstm.jpeg';
import local from './assets/local.jpeg';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const Game = () => {

  return (
      <div className={styl.Game}>
        <div className={styl.content}>
          <div className={styl.head}>
            <h1>GAME</h1>
          </div>
          <div className={styl.cont}>
            <div className={styl.chouseGame}>
              <div className={styl.cardGame}>
                <div className={styl.game}>
                  <div className={styl.gameName}>
                    <p>Tic Tac Toe</p>
                  </div>
                  <Link to={"/xo-games"}><button className={styl.image} >
                    <img src={tic} alt="Tic Tac Toe" />
                  </button></Link>
                </div>
              </div>
              <div className={styl.cardGame}>
                <div className={styl.game}>
                  <div className={styl.gameName}>
                    <p>Ping Pong</p>
                  </div>
                  <Link to={"/pingpong-games"}><button className={styl.image}>
                    <img src={ping} alt="Ping Pong" />
                  </button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Game;

              {/* <div className={styl.chouseGame}>
                <div className={styl.cardGame}>
                  <div className={styl.game}>
                    <div className={styl.gameName}>
                      <p >Tic Tac Toe</p>
                    </div>
                    <div className={styl.image}>
                      <img src={tic}/>
                    </div>
                  </div>
                </div>
                <div className={styl.cardGame}>
                <div className={styl.game}>
                    <div className={styl.gameName}>
                      <p >Ping Pong</p>
                    </div>
                    <div className={styl.image}>
                      <img src={ping}/>
                    </div>
                  </div>
                </div>
              </div> */}