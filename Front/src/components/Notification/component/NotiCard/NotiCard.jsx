import styl from './NotiCard.module.css'
import userImage from '../../assets/nouahidi.jpeg'
import True from '../../assets/true.svg'
import False from '../../assets/false.svg'

const NotiCard = ({request}) => {
  return (
    <div className={styl.notiCard}> 
        <div className={styl.userimage}>
            <img src={userImage}></img>
        </div>
        <div className={styl.Sender}>
            <p >noureddine {request}</p>
        </div>
        <div className={styl.Icon}>
            <button >
                <img src={True}></img>
            </button>
            <button >
                <img src={False}></img>
            </button>
        </div>
    </div>
  )
}

export default NotiCard
