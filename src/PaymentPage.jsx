import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { FaCreditCard } from "react-icons/fa6";
import easypaisa from "./assets/images/easypaisa.png"
import jazzcash from "./assets/images/jazzcash.png"
import { IoCash } from "react-icons/io5";




function PaymentPage() {

  return (
    <div className='container-fluid paymentpagecontainer'>
      <div className='row'>
        <div className='col-md-12 col-sm-12 col-lg-12 d-flex align-items-center justify-content-center'>
            <h1>Payment Page</h1>
        </div>
      </div>

       <div className='row tablecart'>
        <div className='col-md-8 col-sm-8 col-lg-8'>
            <div className='part1 d-flex gap-3'>
               <div className='imagewrapper'>
                <img src={easypaisa} alt="" />
               </div>
                <div className='imagewrapper'>
                <img src={jazzcash} alt="" />
               </div>
               <div className='iconwrapper'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <IoCash/>
                <span>Cash Payment</span>
                </div>
               </div>
                <div className='iconwrapper'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <FaCreditCard/>
                <span>Credit/Debit Card</span>
                </div>
               </div>
            </div>
        </div>

        <div className='col-md-4 col-sm-4 col-lg-4'>
            <div className='part2 d-flex flex-column gap-3'>
                <h4>Order Summary</h4>
                <div className='border-bottom d-flex justify-content-between'>
                    <p>Subtotal(2 items and shipping fee included)</p>
                    <h6>Rs. 17,337</h6>                   
                  
                </div>
               
                <div className='d-flex border-bottom justify-content-between gap-5'>
                    <h5>Total Amount</h5>
                    <h6 className='text-danger'>Rs. 17,337</h6>
                </div>
                {/* <Button><Link to="/paymentpage" className='paymentlink'>Proceed To Checkout</Link></Button> */}
            </div>
        </div>
      </div>
    </div>
  )
}
export default PaymentPage