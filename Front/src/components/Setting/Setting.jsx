import React, { useEffect, useState } from 'react'
import styl from './Settings.module.css'
import gameSettings from './components/gameSettings/GameSettings'
import userImage from './assets/nouahidi.jpeg'
import camera from './assets/camera.svg'
import pencil from './assets/pencil.svg'
import QRCode from 'react-qr-code'
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { MdLock } from "react-icons/md";
import GameSettings from './components/gameSettings/GameSettings'


const Settings = () => {
  const [userName, setUserName] = useState('NOUREDDINE');
  const [newName, setNewName] = useState('NOUREDDINE');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [racketColor, setRacketColor] = useState('#000000');
  const [openSpeed, setOpenSpeed] = useState('none');
  const [openColors, setOpenColors] = useState('none');
  const [breakerColors, setBreakerColors] = useState('red');
  const [translate, setTranslate] = useState(5);
  const [activeSection, setActiveSection] = useState('tmp1');
  const [code, setCode] = useState(['','','','','',])
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [qrValue, setQrValue] = useState('https://tailwindcss.com/')


  const handleINputChange = (e, index) => {
    const newCode = [...code]
    newCode[index] = e.target.value.slice(-1)
    setCode(newCode)

    if (e.target.nextSibling) {
      e.target.nextSibling.focus()
    }
  }

  const handleConfirmClick = () => {
    if (code.join('').length === 5)
      setConfirmationMessage(`Code Confirmed: ${code.join('')}`)
    else
      setConfirmationMessage('Please eter a 5-digit code.')
  }

  const colors = ['red', 'green', 'yellow', 'black', 'gray', 'blue', 'white'];

  const handleRacketColorChange = (color) => {
    setRacketColor(color);
  };

  const toggleColorDisplay = () => {
    setOpenColors(prevOpen => (prevOpen === 'none' ? 'flex' : 'none'));
  };
  const togglebreakerDisplay = () => {
    setBreakerColors(breaker => (breaker === 'red' ? 'green' : 'red'));
  };

  const toggleSpeedDisplay = () => {
    setOpenSpeed(prevOpen => (prevOpen === 'none' ? 'flex' : 'none'));
  };

  const handleTableColorChange = (color) => {
    setTableColor(color);
  };

  const handlePencilClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUpdateClick = () => {
    if (newName == userName)
      setMessage('Name Not changed')
    else {
      setUserName(newName)
      setMessage('');
    }
    setIsEditing(false);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  }




  return (
    <div className={styl.Settings}>
      <div className={styl.content}>
        <div className={styl.head}><h1>SETTINGS</h1></div>

        <GameSettings />

        <hr style={{width: '90%'}}/>
        <div className={styl.last}>
          <div className={styl.TfaScrn}>
            <div className={styl.qrCode}>
              <div className={styl.qrGenerate}>
                <QRCode value={qrValue} size={298} />
                {breakerColors === 'red' && (
                <div className={styl.Qrlock}>
                  <MdLock style={{width: '25%', height: '25%'}}/>
                </div>
                )}
              </div>
              <div className={styl.qrLock}></div>
            </div>
          </div>
          <div className={styl.Tfa}>
            <div className={styl.TfaStt}>
              <div className={styl.Str}>
                <p >Two-factor authentication</p>
              </div>
              <div className={styl.sttMode}>
                <div className={styl.modeDisplay}>
                  <button onClick={togglebreakerDisplay}/>
                    <div className={styl.breaker} style={{backgroundColor: breakerColors, translate: breakerColors == 'green' ? '100%' : '0%'}}></div>
                </div>
              </div>
            </div>
            <div className={styl.TfaCode}>
              <div className={styl.inpCode}>
                  {
                    code.map((digit, index) => (
                      <input key={index} type="text" maxLength='1' value={digit} onChange={(e) => handleINputChange(e, index)} className={styl.codeInput}/>
                    ))
                  }
              </div>
              <div className={styl.confInp}>
                <button onClick={handleConfirmClick} className={styl.confirmButton}>
                  Confirm
                </button>
                {confirmationMessage && (
                  <p className={styl.confirmationMessage}>{confirmationMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
