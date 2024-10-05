import styl from './CardMatch.module.css'
import userImage from '../../../../assets/nouahidi.jpeg'

const CardMatch = () => {
  return (
    <div className={styl.CardMatch}>
        <div className={styl.Player}>
          <img src={userImage}></img>
          <p >NOUREDDINE</p>
        </div>
        <div className={styl.ScoreDate}>
          <p >2024-08-24</p>
          <p id={styl.score}>3 - 2</p>
        </div>
        <div className={styl.Player}>
          <img src={userImage}></img>
          <p >NOUREDDINE</p>
        </div>
    </div>
  )
}

export default CardMatch
