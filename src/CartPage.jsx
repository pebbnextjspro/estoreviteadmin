import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router';



function CartPage() {

const [pricevalue , setpricevalue] = useState(1);
// const decreasePrice = () => {

//     setpricevalue(1--)
// }    

const increasePrice = () => {

    setpricevalue(pricevalue + 1)
}  

const decreasePrice = () => {

    if(pricevalue!==1) {

        setpricevalue(pricevalue - 1)
    }

}  

useEffect(() => {
    setTimeout(() => {
      window.scrollTo(5, 5);
    }, 0);
  }, []);

  return (
    <div className='container-fluid cartpagecontainer'>
      <div className='row'>
        <div className='col-md-12 col-sm-12 col-lg-12 d-flex align-items-center justify-content-center'>
            <h1>Cart Page</h1>
        </div>
      </div>

       <div className='row tablecart'>
        <div className='col-md-8 col-sm-8 col-lg-8'>
            <div className='part1'>
                <table className='table table-responsive align-middle'>
                <thead>
                    <tr>
                        
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Delete</th>
                        <th><input type="checkbox" /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>
                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                     <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                      <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>

                    <tr>                        
                         <td className='tdimage d-flex align-items-center gap-3 align-middle'>
                            <div className='imagewrapper'>
                            <img src="https://jthemes.net/themes/wp/testo/wp-content/themes/testo/images/logo.png" alt="" />
                            </div>
                            <span>Double Burger</span>
                        </td>
                        <td>Rs. 300</td>
                        <td className='tdprice'>
                            <Button><MdKeyboardArrowLeft onClick={decreasePrice}/></Button>
                            <input type="text" value={pricevalue} onChange={(e) => setpricevalue(e.target.value)} />
                            <Button><MdKeyboardArrowRight onClick={increasePrice}/></Button>
                        </td>
                        <td>Rs. 300</td>
                        <td className='deleteicon'><Button><AiFillDelete/></Button></td>
                        <td><input type="checkbox" /></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>

        <div className='col-md-4 col-sm-4 col-lg-4 '>
            <div className='part2 d-flex flex-column gap-3'>
                <h4>Card Total</h4>
                <div className='border-bottom'>
                    <h6>Address</h6>
                    <p>House no 123 . Stresst No 234 Lahore Punjab Pakistan. POSTAL Code 54900</p>
                    <Link>Change Address</Link>
                </div>
                <div className='d-flex border-bottom justify-content-between gap-5'>
                    <h5>Subtotal</h5>
                    <h6>Rs. 500</h6>
                </div>
                <div className='d-flex border-bottom justify-content-between gap-5'>
                    <h5>Shipping Fee</h5>
                    <h6>Rs. 100</h6>
                </div>
                <div className='d-flex border-bottom justify-content-between gap-5'>
                    <h5>Total</h5>
                    <h6>Rs. 600</h6>
                </div>
                <Button><Link to="/paymentpage" className='paymentlink'>Proceed To Checkout</Link></Button>
            </div>
        </div>
      </div>
    </div>
  )
}
export default CartPage