import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axiosInstance from '../api/axiosInstance';
import { BaseApi } from '../BaseApi';

function BrandEdit() {

    const navigation = useNavigate();
    const [image , setimage] = useState();
    const [imagepreview , setimagepreview] = useState(`${BaseApi}/uploads/${localStorage.getItem("brandimage")}`);
    const [BrandImage , setBrandImage] = useState(localStorage.getItem("brandimage"));

    const brandid = localStorage.getItem('id');
    const brandname = localStorage.getItem('brandname');


    const [formfields , setformfields] = useState({

        BrandId: brandid,
        BrandName: brandname
    });

    const handleChange = (e) => {

        const value = e.target.value;
        const name = e.target.name;

        setformfields((prev) => ({

            ...prev , [name]:value
        }))
    }

    const handleFileChange = (e) => {

        const files = e.target.files[0];

        setimage(files);
        setimagepreview(URL.createObjectURL(files));

    }


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

       
        const formdata = new FormData();

        formdata.append("BrandName" , formfields.BrandName);
        formdata.append("image" , image);
        formdata.append("BrandImage" , BrandImage);

        const res = await axiosInstance.put(`/api/admin/brand/brand-update/${brandid}`, formdata);

        if (res.data.success) {

            alert(res.data.msg);
            navigation('/brandlist');
        }

        
    } catch (error) {

        alert('There is an Error in Server')
        
    }

  }

  console.log(formfields);

  return (
    <>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
        <form onSubmit={handleSubmit}>
             <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
            <label htmlFor="" className='form-label'>BrandId</label>
            <input type="text" value={formfields.BrandId} name='BrandId' onChange={handleChange} className='form-control' readOnly />
                </div>
            </div>
            <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
                 <label htmlFor="" className='form-label'>Brand Name</label>
            <input type="text" value={formfields.BrandName} name='BrandName' required onChange={handleChange} className='form-control' />
                </div>
            </div>
             <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center flex-column gap-3'>
                <img src={imagepreview} 
                style={{width: "200px" , height: "200px", objectFit: "contain" , 
                border: "1px solid rgba(0,0,0,0.2)", padding: "10px", borderRadius: "10px"}} alt="" />
                <input type="file" accept='image/png , image/jpg , image/jpeg , image/webp' onChange={handleFileChange} />
                </div>
            </div>
            <div className='row mt-3'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
                <button type='submit' className='btn btn-success w-100'>Update</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default BrandEdit