import React from 'react'
import styl from './CmpCard.module.css'
import { Link } from 'react-router-dom';

const CmpCard = ({isOpen, ICON, name, top, link}) => {
  return (
    <div className={styl.Card} style={{top: top}}>
        <Link to={link}><button >
            <div className={styl.icon}>
                <ICON className={styl.iconStyl}/>
            </div>
            <div className={styl.cmpName} style={{ display: isOpen ? 'flex' : 'none'}} ><p >{name}</p></div>
        </button></Link>
    </div>
  )
}

export default CmpCard
