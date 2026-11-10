import React, { useRef, useState } from 'react'

function Test() {

    const [value , setvalue] = useState();
    const sliderref = useRef();


    const handleIncrement = (e) => {

        const value = parseInt(e.target.value);

       if (value < 100) {

         setvalue(value + 1);
       }

        sliderref.current.style.width = `${value}%`
    }
  return (
   <>
    <div className='barcontainer d-flex flex-column gap-3'>
       <div className='backslidebar'>
        <div className='slider' ref={sliderref}>        
        </div>
       </div>
        <button onClick={handleIncrement}>Increment</button>
        <input type="number" value={value} onChange={handleIncrement} />
        </div>
   </>
  )
}

export default Test