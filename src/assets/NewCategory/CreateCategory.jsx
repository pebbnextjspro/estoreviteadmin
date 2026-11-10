import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router';

function CreateCategory() {

    const navigation = useNavigate();
    const [images , setimages] = useState('');
    const [imagepreview , setimagepreview] = useState();
    const [formfields , setformfields] = useState({

        CategoryName: '',
        CategoryColor: '',
    });

    const handleChange = (e) => {

        const value = e.target.value;
        const name = e.target.name;

        setformfields((prev) => ({
            ...prev , [name] : value
        }))
    }

const handleFiles = (e) => {

    const file = e.target.files[0];

    setimages(file);
    setimagepreview(URL.createObjectURL(file));
}

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (images === '') {

            alert("Please Upload Image");
            return;
        }

        const formdata = new FormData();

        formdata.append("CategoryName" , formfields.CategoryName);
        formdata.append("CategoryColor" , formfields.CategoryColor);

        formdata.append("image" , images);

        const res = await axiosInstance.post('/api/admin/category/category-create' , formdata);

        if (res.data.success) {

            alert(res.data.msg);
            navigation('/categorylist')
            
        }
        
    } catch (error) {

        if (error.response) {            

            alert(error.response.data.msg);
        } else {

            alert("Server is Not Responding");
        }
        
    }
}
  return (
    <>
     <div className='container-fluid'>
   <form onSubmit={handleSubmit}>
     <div className='row mb-4 mt-4'>
    <div className='col-sm-12 col-md-12 col-lg-12'>
        <label for="categoryname" class="form-label">Category Name</label>
  <input type="text" value={formfields.CategoryName} name='CategoryName' onChange={handleChange}
   class="form-control"  placeholder="Category Name"></input>
        </div>
         <div className='col-sm-12 col-md-12 col-lg-12'>
        <label for="categorycolor" class="form-label">CategoryColor</label>
  <input type="text" value={formfields.CategoryColor} name='CategoryColor' onChange={handleChange} 
  class="form-control"  placeholder="Category Color"></input>
        </div>
        <div className='row mt-4'>
        <div className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center'>
       <div className='imagewrapper d-flex flex-column gap-3'>
      <div style={{width: "200px" , height: "200px"}}>
          <img src={imagepreview} 
        style={{width: "100%" , height: "100%" , objectFit: "contain"}} alt="" />
      </div>
        <input type="file" accept='image/jpeg , image/png ,image/jpg' onChange={handleFiles} />
       </div>
        </div>
        </div>
          <div className='row mt-4'>
        <div className='col-sm-12 col-md-12 col-lg-12'>
      <button type='submit' className='btn btn-primary w-100'>Create Category</button>
        </div>
        </div>
        </div>
   </form>
    </div>
    </>
  )
}

export default CreateCategory