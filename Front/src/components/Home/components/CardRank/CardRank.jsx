import React from 'react'
import styl from './CardRank.module.css'
import userImage from '../../assets/nouahidi.jpeg'

const CardRank = () => {
  return (
    <div className={styl.cardRank}>
        <div className={styl.ranking}>
            <p >1</p>
        </div>
        <hr />
        <div className={styl.user}>
            <img src={userImage}/>
            <p >NOUREDDINE</p>
        </div>
        <div className={styl.wins}>
            <p >20</p>
        </div>
        <div className={styl.lvl}>
            <p >20</p>
        </div>
    </div>
  )
}

export default CardRank

