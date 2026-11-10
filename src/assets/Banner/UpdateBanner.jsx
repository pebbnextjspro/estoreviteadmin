import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import Button from '@mui/material/Button';
import { FaCircleArrowDown } from "react-icons/fa6";


function UpdateBanner() {

        const [productid , setproductid] = useState(localStorage.getItem('id'));
    const [ProductName , setProductName] = useState(localStorage.getItem('ProductName'))
    const [heading1 , setheading1] = useState(localStorage.getItem('Heading1'))
    const [heading2 , setheading2] = useState(localStorage.getItem('Heading2'))
    const [heading3 , setheading3] = useState(localStorage.getItem('Heading3'))
    const [newprice , setnewprice] = useState(localStorage.getItem('ProductNewPrice'))
    const [oldprice , setoldprice] = useState(localStorage.getItem('ProductOldPrice'))
    const [rating , setrating] = useState(localStorage.getItem('ProductRating'))
    const [dislikes , setdislikes] = useState(localStorage.getItem('DisLikes'))
    const [likes , setlikes] = useState(localStorage.getItem('Likes'))
    const [shortdesc , setshortdesc] = useState(localStorage.getItem('ShortDesc'))
    const [bannerimage , setbannerimage] = useState(localStorage.getItem('BannerImage'))
     const [bannerid , setbannerid] = useState(localStorage.getItem('BannerId'))
     const [imagepreview , setimagepreview] = useState();
     const [image , setimage] = useState();
     console.log("bannerimage" , bannerimage)

    const [options , setoptions] = useState(false)

    const [productdata , setproductdata] = useState([]);

      const GetProductData = async () => {

        try {

            const res = await axiosInstance.get('/api/admin/products/product-list');

            if (res.data.success) {

                const array = res.data.Data;

                const sorteddata = [...array].sort((a  , b) => {

                    return a.ProductName.toLowerCase() > b.ProductName.toLowerCase() ? 1 : -1
                })

                setproductdata(sorteddata);
            } else {

                alert(res.data.msg)
            }
            
        } catch (error) {

            if (error.response) {

                alert(error.response.data.msg);
            } else {

                alert('Server is not responding')
            }
            
        }
    }

        const handleFile = (e) => {

        const file = e.target.files[0];

        const getimage = URL.createObjectURL(file);

        setimagepreview(getimage);
        setimage(file);

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

       

        try {

            const formdata = new FormData;

            formdata.append("heading1" , heading1);
            formdata.append("heading2" , heading2)
            formdata.append("heading3" , heading3)
            formdata.append("newprice" , newprice)
            formdata.append("oldprice" , oldprice)
            formdata.append("rating" , rating)
            formdata.append("likes" , likes)
            formdata.append("dislikes" , dislikes)
            formdata.append("shortdesc" , shortdesc);
            formdata.append("image" , image);
            formdata.append("productid" , productid);
            formdata.append("bannerimage" , bannerimage);
          
            const res = await axiosInstance.put(`/api/admin/banner/banner-update/${bannerid}` , formdata);

            if (res.data.success) {

                alert('Data Updated Succesfully')
            }
            
        } catch (error) {

            if (error.response) {

                alert(error.response.data.msg)
            } else {

                alert('Server is not responding')
            }
            
        }
    }


    const handleAppendData = (id,ProductNewPrice,ProductName,ProductOldPrice,
ProductRating) => {

    
        setProductName(ProductName);
        setnewprice(ProductNewPrice);
        setoldprice(ProductOldPrice);
        setrating(ProductRating);
        setproductid(id);
    }





        useEffect(() => {
    
            GetProductData();
        },[])

  return (
    <>
    <div className='p-1 mt-3'>
      <form onSubmit={handleSubmit} action="" className='d-flex flex-column gap-3 justify-content-center'>
        <label htmlFor="" className='fw-bold'>Select Product Name</label>
          {/* <select name="" id="" className='form-select'>
            
            <option value="">{ProductName}</option>
            {
                productdata.length !== 0 && productdata.map((data) => (
                    <option value="">{data.ProductName}</option>
                ))
            }
           
        </select> */}
        <div>
            <div className='position-relative' onClick={() => setoptions(!options)}>
                <input type="text" value={ProductName} className='form-control' style={{caretColor: "transparent", cursor: "pointer"}} />
                <FaCircleArrowDown className='selectarrow'/>
            </div>
           <div className={`selectul ${options ? 'active' : ''}`}>
             <ul className='d-flex flex-column gap-1'>
               {
                    productdata.length !== 0 && productdata.map((data) => (
                        <li className='list-unstyled list-group-horizontal-lg' style={{cursor: "pointer"}}
    onClick={() => handleAppendData(
        data.id,
        data.ProductNewPrice,
        data.ProductName,
    data.ProductOldPrice,
data.ProductRating)}>{data.ProductName}</li>
                    ))
                }
            </ul>
           </div>
        </div>
        <label htmlFor="" className='fw-bold'>Heading 1</label>
        <input type="text" value={heading1} className='form-control'/>
        <label htmlFor="" className='fw-bold'>Heading 2</label>
        <input type="text" value={heading2} className='form-control'/>
        <label htmlFor="" className='fw-bold'>Heading 3</label>
        <input type="text" value={heading3} className='form-control'/>
         <label htmlFor="" className='fw-bold'>New Price</label>
        <input type="text" value={newprice} className='form-control bg-dark-subtle' readOnly/>
         <label htmlFor="" className='fw-bold'>Old Price</label>
        <input type="text" value={oldprice} className='form-control bg-dark-subtle' readOnly/>
         <label htmlFor="" className='fw-bold'>Rating</label>
        <input type="text" value={rating} className='form-control bg-dark-subtle' readOnly/>
         <label htmlFor="" className='fw-bold'>Description</label>
        <textarea type="text" value={shortdesc} minLength={25} maxLength={400}
         className='form-control' onChange={(e) => setshortdesc(e.target.value)} required/>
         
         <label htmlFor="" className='fw-bold'>Likes</label>
        <input type="text" value={likes} className='form-control'/>
         <label htmlFor="" className='fw-bold'>DisLikes</label>
        <input type="text" value={dislikes} className='form-control'/>
         <label htmlFor="" className='fw-bold'>Select Image</label>
        <div className='d-flex align-items-center justify-content-center'>
           <img src={`${import.meta.env.VITE_IMAGE_LINK}${bannerimage}`} alt="" width={200} height={200} />
           <div>
            <h2>Updated Image</h2>
            <img src={imagepreview} width={100} height={100} alt="" />
           </div>
           <input type="file" onChange={handleFile} />
        </div>
        
        <Button type='submit' style={{width: "100%", height: "50px", color: "white" , background: "black"}}>Submit</Button>
        
      </form>
      
    </div>
    </>
  )
}

export default UpdateBanner
