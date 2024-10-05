import styl from './GameSettings.module.css'
import React, { useEffect, useState } from 'react'
import userImage from '../../assets/nouahidi.jpeg'
import camera from '../../assets/camera.svg'
import pencil from '../../assets/pencil.svg'
import QRCode from 'react-qr-code'
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const GameSettings = () => {

    const [userName, setUserName] = useState('NOUREDDINE');
    const [newName, setNewName] = useState('NOUREDDINE');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [racketColor, setRacketColor] = useState('#000000');
    const [tableColor, setTableColor] = useState('white');
    const [openSpeed, setOpenSpeed] = useState('none');
    const [openColors, setOpenColors] = useState('none');
    const [breakerColors, setBreakerColors] = useState('red');
    const [speed, setSpeed] = useState(1);
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
    <div className={styl.first}>
        <div className={styl.change}>
        <div className={styl.Image}>
            <div className={styl.image}>
              <img src={userImage} alt="User" />
              <div className={styl.icon}>
                  <button>
                  <img src={camera} alt="Camera" />
                  </button>
              </div>
            </div>
        </div>
        <div className={styl.Name}>
            {
            !isEditing ? (
                <div className={styl.displayMode}>
                <span>{userName}</span>
                <button onClick={handlePencilClick}>
                    <img src={pencil}/>
                </button>
                </div>
            ) : (
                <div className={styl.editMode}>
                <input type="text" value={userName} onChange={handleInputChange} />
                </div>
            )
            }
            <button onClick={handleUpdateClick} className={styl.Button}>Update</button>
            {message && <p className={styl.message}>{message}</p>}
        </div>
        </div>
        <div className={styl.settingGame}>
        <div className={styl.colorDisplay}>
            <p>Racket Color</p>
            <div className={styl.changeColor} style={{display: openColors}}>
            <div className={styl.colors}>
                {colors.map((color) => (
                <div key={color} className={styl.colorCircle} style={{ backgroundColor: color }} onClick={() => handleRacketColorChange(color)}></div>
                ))}
            </div>
            <div className={styl.racket} style={{ backgroundColor: racketColor }}></div>
            </div>
            <hr />
            <div className={styl.Arrow}>
            <button onClick={toggleColorDisplay}>
                <MdOutlineKeyboardDoubleArrowDown className={styl.ArrowStyl} style={{transform: openColors === 'flex' ? 'rotate(180deg)' : 'rotate(0deg)',transition: 'transform 0.3s ease'}}/>
            </button>
            </div>
        </div>
        <div className={styl.speedDisplay}>
            <p>Racket Speed</p>
            <div className={styl.racketSpeed} style={{display: openSpeed}}>
            <div className={styl.tmp}>
                <div className={styl.chooseSpeed}>
                <button onClick={() => setTranslate(5)}>.</button>
                <button onClick={() => setTranslate(50)}>.</button>
                <button onClick={() => setTranslate(100)}>.</button>
                <button onClick={() => setTranslate(150)}>.</button>
                </div>
                <div className={styl.speedCircle} style={{translate: translate}}></div>
            </div>
            <div className={styl.speedNumber}>
                <p >.1</p>
                <p >.2</p>
                <p >.3</p>
                <p >.4</p>
            </div>
            </div>
            <hr />
            <div className={styl.Arrow}>
            <button onClick={toggleSpeedDisplay}>
                <MdOutlineKeyboardDoubleArrowDown className={styl.ArrowStyl} style={{transform: openSpeed === 'flex' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}}/>
            </button>
            </div>
        </div>
        </div>
        <div className={styl.settingGame2}>
        <div className={styl.ButtonChange}>
            <div className={styl.buttonCard}>
            <button onClick={() => setActiveSection('tmp1')}><p >Change Color</p></button>
            </div>
            <div className={styl.buttonCard}>
            <button onClick={() => setActiveSection('tmp2')}><p >Change Speed</p></button>
            </div>
        </div>
        <div className={styl.cont}>
        {activeSection === 'tmp1' && (
            <div className={styl.tmp1}>
            <div className={styl.changeColor}>
                <div className={styl.colors}>
                {colors.map((color) => (
                    <div key={color} className={styl.colorCircle} style={{ backgroundColor: color }} onClick={() => handleRacketColorChange(color)}></div>
                ))}
                </div>
                <div className={styl.racket} style={{ backgroundColor: racketColor }}></div>
            </div>
            </div>
        )}
        {activeSection === 'tmp2' && (
            <div className={styl.tmp2}>
            <div className={styl.racketSpeed}>
                <div className={styl.tmp}>
                <div className={styl.chooseSpeed}>
                    <button onClick={() => setTranslate(5)}>.</button>
                    <button onClick={() => setTranslate(50)}>.</button>
                    <button onClick={() => setTranslate(100)}>.</button>
                    <button onClick={() => setTranslate(150)}>.</button>
                </div>
                <div className={styl.speedCircle} style={{translate: translate}}></div>
                </div>
                <div className={styl.speedNumber}>
                <p >.1</p>
                <p >.2</p>
                <p >.3</p>
                <p >.4</p>
                </div>
            </div>
            </div>
        )}
        </div>
        </div>
    </div>
  )
}

export default GameSettings;
