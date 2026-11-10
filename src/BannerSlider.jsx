import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from "@mui/material";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";
import slider1 from "../src/assets/images/slide1.png"
import slider2 from "../src/assets/images/slide2.jpg"
import slider3 from "../src/assets/images/slide3.jpg"


function BannerSlider() {
  return (
    <>
            <div className='row banner border'>
        <div className='col-md-12 col-sm-12 col-lg-12 bannercontainer'>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>          
          <div className="d-flex align-items-center justify-content-between">
             <div className="content">
            <h1>Crispy Chicken</h1>
            <div className="part2 d-flex justify-content-start align-items-center flex-column">
              <div className="d-flex align-items-center gap-2">
              <h3 className="price">Rs. 300</h3>
              <Button>Order Now</Button>
              </div>
            </div>
            </div>
            <div className="imagewrapper">
           <img src={slider1} alt=""/>                       
            </div>            
          </div>
            </SwiperSlide> 
          <SwiperSlide>          
          <div className="d-flex align-items-center justify-content-between">
             <div className="content">
            <h1>Crispy Chicken</h1>
            <div className="part2 d-flex justify-content-start align-items-center flex-column">
              <div className="d-flex align-items-center gap-2">
              <h3 className="price">Rs. 300</h3>
              <Button>Order Now</Button>
              </div>
            </div>
            </div>
            <div className="imagewrapper">
           <img src={slider1} alt=""/>                       
            </div>            
          </div>
            </SwiperSlide>

<SwiperSlide>          
          <div className="d-flex align-items-center justify-content-between">
             <div className="content">
            <h1>Crispy Chicken</h1>
            <div className="part2 d-flex justify-content-start align-items-center flex-column">
              <div className="d-flex align-items-center gap-2">
              <h3 className="price">Rs. 300</h3>
              <Button>Order Now</Button>
              </div>
            </div>
            </div>
            <div className="imagewrapper">
           <img src={slider1} alt=""/>                       
            </div>            
          </div>
            </SwiperSlide>
            
          
      </Swiper>
      </div>
    </div>

    </>
  )
}

export default BannerSlider
