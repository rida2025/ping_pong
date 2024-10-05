import React from 'react'
import styl from './TicTac.module.css'
import local from '../../assets/local.jpeg';
import _1vs1 from '../../assets/1vs1.jpeg';

const TicTac = () => {
  return (
    <div className={styl.TicTac}>
        <div className={styl.card}>
          <div className={styl.cardName}>
            <p >Local</p>
          </div>
          <div className={styl.Image}>
            <img src={local}/>
          </div>
        </div>
        <div className={styl.card}>
          <div className={styl.cardName}>
            <p >1 Vs 1</p>
          </div>
          <div className={styl.Image}>
            <img src={_1vs1}/>
          </div>
        </div>
    </div>
  )
}

export default TicTac
