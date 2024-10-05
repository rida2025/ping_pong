import styl from './SearchRes.module.css'
import UserImage from '../../../../assets/nouahidi.jpeg'

const SearchRes = ({user}) => {
  return (
    <div className={styl.searchCard}>
        <div className={styl.Simage}>
            <img src={UserImage }/>
        </div>
        <p >{user.name}</p>
    </div>
  )
}

export default SearchRes
