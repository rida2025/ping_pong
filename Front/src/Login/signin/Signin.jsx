import React from 'react'

const Signin = () => {
  return (
    <div>
      <div className='container'>
        <form>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' id='username' placeholder='Enter username' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Enter password' />
          </div>
          <button type='submit' className='btn'>Sign in</button>
          <Link to='/signup'>Sign up</Link>
        </form>
      </div>
    </div>
  )
}

export default Signin
