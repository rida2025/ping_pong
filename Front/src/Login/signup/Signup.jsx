import React from 'react'

const Signup = () => {

    const onSubmitForm = (e) => {
        e.preventDefault();
        // perform form validation and submission logic here
      }
  return (
    <div>
      <div className='container'>
        <form onSubmit={onSubmitForm}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' id='username' placeholder='Enter username' />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Enter email' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Enter password' />
          </div>
          <button type='submit' className='btn'>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
