import styl from './Notification.module.css'
import NotiCard from './component/NotiCard/NotiCard'

const Notification = () => {
  return (
    <div className={styl.Notification}>
        <div className={styl.content}>
            <div className={styl.head}><h1>NOTIFICATION</h1></div>
            <div className={styl.cont}>
                <hr className={styl.line}/>
                <div className={styl.noti}>
                    <div className={styl.Request}>
                        <div className={styl.title}>
                            <h3 >Pending request</h3>
                        </div>
                        <div className={styl.card}>
                            <NotiCard request={'sent you request friend'}/>
                        </div>
                    </div>
                    <div className={styl.Request}>
                        <div className={styl.title}>
                            <h3 >Game request</h3>
                        </div>
                        <div className={styl.card}>
                            <NotiCard request={'invit you for game'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification
