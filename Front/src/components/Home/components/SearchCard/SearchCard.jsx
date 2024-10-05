import React from 'react'
import styl from './SearchCard.module.css'
import userImage from '../../assets/nouahidi.jpeg'

const SearchCard = ({user}) => {
  return (
    <div className={styl.searchCard}>
        <div className={styl.userImage}>
            <img src={userImage}/>
        </div>
        <div className={styl.userName}>
            <p >{user.name}</p>
        </div>
    </div>
  )
}

export default SearchCard
