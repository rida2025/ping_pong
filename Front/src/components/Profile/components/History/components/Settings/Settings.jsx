import styl from './Settings.module.css'
import Add from '../../../../assets/Add.svg'
import Chat from '../../../../assets/Chat.svg'
import Block from '../../../../assets/Block.svg'

const Settings = () => {
  return (
    <div className={styl.settings}>
        <div className={styl.settCont}>
          <div className={styl.Card}>
            <div className={styl.Img}>
                <button >
                    <img src={Add}></img>
                </button>
            </div>
            <div className={styl.NAme}>
              <p >Add Friend</p>
            </div>
          </div>
          <div className={styl.Card}>
            <div className={styl.Img}>
                <button >
                    <img src={Chat}></img>
                </button>
            </div>
             <div className={styl.NAme}>
              <p >Chat</p>
            </div>
          </div>
          <div className={styl.Card}>
            <div className={styl.Img}>
                <button >
                    <img src={Block}></img>
                </button>
            </div>
             <div className={styl.NAme}>
              <p >Blocke</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Settings
