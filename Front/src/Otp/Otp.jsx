// import styles from './Otp.module.css';
// import { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Otp = () => {
//   const [otp, setOTP] = useState('');

//   const getOTPValue = () => {
//     if (otp.length < 5) {
//       toast.error('Invalid OTP',{
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       console.log('Please enter 5 digit OTP');
//       return;
//     }
//     toast.success('OTP Verified Successfully',{
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//     console.log('OTP Value:', otp);
//   };

//   return (
//     <>
//     <ToastContainer />
//     <div className={styles.container}>
//       <div className={styles.otpMessage}>
//         <h2>Enter the OTP sent to your school email address</h2>
//       </div>
//       <div className={styles.otpInputContainer}>
//         <input
//           type="text"
//           className={styles.otpInput}
//           maxLength={5}
//           value={otp}
//           onChange={(e) => setOTP(e.target.value)}
//           placeholder='Enter OTP'
//           />
//       </div>
//       <button onClick={getOTPValue} className={styles.button}>
//         Verify OTP
//       </button>
//     </div>
//     </>
//   );
// };

// export default Otp;



import React, { useState, useRef, useEffect } from 'react';
import './Otp.css';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleConfirm = () => {
    const otpCode = otp.join('');
    console.log('Confirmed OTP:', otpCode);
    // Here you would typically send the OTP to your backend for verification
  };

  return (
    <div className="otp-container">
      <div className="otp-content">
        <h2 className="otp-title">Enter Your OTP</h2>
        <div className="otp-input">
          {otp.map((data, index) => {
            return (
              <input
                className="otp-box"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
                ref={input => inputRefs.current[index] = input}
              />
            );
          })}
        </div>
        <button className="otp-button" onClick={handleConfirm}>
          Confirm OTP
        </button>
      </div>
    </div>
  );
};

export default Otp;