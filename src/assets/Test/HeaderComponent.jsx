import React from 'react'
import { Link } from 'react-router'

function HeaderComponent({search , handleChangeSearch , handleDeleteALL}) {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center gap-2'>
        <Link to={'/createuser'}><button className='btn btn-secondary'>Create User</button></Link>
        <input type="text" value={search} onChange={handleChangeSearch} style={{width: "80%"}} />
        <button onClick={handleDeleteALL}
         className='btn btn-danger'>Delete All</button>
    </div>
    </>
  )
}

export default HeaderComponent