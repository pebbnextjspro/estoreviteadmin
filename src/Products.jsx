import React, { useState } from 'react'
import slider1 from "../src/assets/images/slide1.png"
import { Button } from '@mui/material'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




function Products() {

    const [wishactive , setwishactive] = useState(false);

  return (
   <>
   <div className='row products border'>
        <div className='col-md-12 col-sm-12 col-lg-12 productcontainer'>
            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>

            <div className='productwrapper'>
            <div className='imgwrapper'>
            <img src={slider1} alt="" />
            <div className='btnwish' onClick={() => setwishactive(!wishactive)}>
              <div className={`wishsvg ${wishactive? 'active' : ''}`}><FaHeart/></div>            
            </div>
            </div>
            <div className='content'>
            <h1>Reggy Burger</h1>
            <p>Perfectly Fried Chicken Patty with Fresh Lettuce and Sauce in a Sesame Seed Bun....</p>
            <div className='part1 d-flex align-items-center gap-4'>
                <h3 className="price">Rs. 300</h3>
                <Button>Starting Price</Button>
            </div>
            <div className='part3'>
                <Button>+ ADD TO CART</Button>
            </div>
            </div>
            </div>
            </div>    
            </div> 

            <div className='row pagination'>
            <div className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center paginationcontainer'>
            <Stack spacing={2}>
<Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
            </div>
            </div>
   </>
  )
}

export default Products
