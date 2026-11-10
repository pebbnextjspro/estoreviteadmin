import React from 'react'

function MyPagination({numbers , handleNumber , handleIncrement , handleDecrement}) {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center gap-4'>
        <button onClick={handleDecrement} 
         className='btn btn-success'>Left</button>
        <ul className='d-flex list-unstyled gap-2 mt-3' style={{cursor: "pointer"}}>
            {numbers.map((data) => (
               <li onClick={() => handleNumber(data)}>{data}</li>
            ))}
        </ul>
        <button onClick={handleIncrement}
         className='btn btn-success'>Right</button>
    </div>
    </>
  )
}

export default MyPagination