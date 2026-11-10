import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axiosInstance from '../api/axiosInstance';

function BrandCreate() {

    const navigation = useNavigate()
    const [image , setimage] = useState();
    const [imagepreview , setimagepreview] = useState();

    const [formfields , setformfields] = useState({
        BrandName: ''

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
        setimagepreview(URL.createObjectURL(files))

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if(!image) {

                alert('Please Upload Image');
                return;
            }

            const formdata = new FormData();

            formdata.append("BrandName" , formfields.BrandName);

            formdata.append("image" , image);

            const res = await axiosInstance.post('/api/admin/brand/brand-create' , formdata);

            if (res.data.success) {

                alert(res.data.msg);
                navigation('/brandlist');

            } else if (res.data.success) {

                alert(res.data.msg)
            }
            
        } catch (error) {

          if (error.response) {

            alert(error.response.data.msg);
          } else {

            alert('Server Not Responding');
          }
            
        }
       
        // try {

        //      await axiosInstance.post('/api/admin/brand/brand-create' , formfields).then(() => {

        //     navigation('/brandlist')

        // })
            
        // } catch (error) {

        //     alert('somthing is wrong')

        // }
    }



  return (
    <>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
        <form onSubmit={handleSubmit}>
             <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
            <label htmlFor="" className='form-label'>BrandId</label>
            <input type="text" className='form-control' readOnly />
                </div>
            </div>
            <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
                 <label htmlFor="" className='form-label'>Brand Name</label>
            <input type="text" value={formfields.BrandName} name='BrandName' onChange={handleChange} required className='form-control' />
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
                <button type='submit' className='btn btn-success w-100'>Create</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default BrandCreate