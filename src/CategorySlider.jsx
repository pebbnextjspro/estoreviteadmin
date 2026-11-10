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


function CategorySlider() {
  return (
    <>
            <div className='row category border'>
        <div className='col-md-12 col-sm-12 col-lg-12 categorycontainer'>
            <Swiper navigation={{
          clickable: true,
        }} modules={[Navigation]}  slidesPerView={3}
        spaceBetween={10}
        className="mySwiper">
        <SwiperSlide>          
         <Button>turn up the heat</Button>
            </SwiperSlide>
            <SwiperSlide>          
         <Button>Starter</Button>
            </SwiperSlide>
            <SwiperSlide>          
         <Button>Some What Local</Button>
            </SwiperSlide>
            <SwiperSlide>          
         <Button>Pizza Deals</Button>
            </SwiperSlide>
            <SwiperSlide>          
         <Button>Zinger Deals</Button>
            </SwiperSlide>
            <SwiperSlide>          
         <Button>Burger Deals</Button>
            </SwiperSlide> 
           </Swiper>
      </div>
    </div>

    </>
  )
}

export default CategorySlider
