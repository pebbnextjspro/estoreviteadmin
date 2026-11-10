import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance';

function CreateUserComponent() {

    const [images , setimages] = useState([]);
    const [imagepreview , setimagepreview] = useState([]);
    const [loader , setloader] = useState(false);
    

    const [formfields , setformfields] = useState({

        UserName: '',
        UserPassword: '',
        UserEmail: '',
        IsActive: true,
        UserImages: ''
    })

    const handleOnChange = (e) => {

        const value = e.target.value;
        const name = e.target.name;

        setformfields((prev) => ({

            ...prev , [name]:value
        }))
    }

     const handleFiles = (e) => {

        const files = Array.from(e.target.files);
        const imagepr = files.map((file) => {

            return URL.createObjectURL(file)
        })
      
        setimages((prev) => ([
            ...prev , ...files
        ]));

        setimagepreview((prev) => ([

            ...prev , ...imagepr
        ]))
    }

    console.log(imagepreview);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setloader(true)
          

        try {


             const formdata = new FormData();

            formdata.append('UserName' , formfields.UserName);
            formdata.append('UserPassword' , formfields.UserPassword)
            formdata.append('UserEmail' , formfields.UserEmail);
            formdata.append('IsActive' , formfields.IsActive)

            images.forEach((files) => (

                formdata.append('images' , files)
            ))
         
            

            const res = await axiosInstance.post('/api/admin/users/users-create' , formdata);

            if (res.data.success) {

                alert('Data Created Succesfully')
            } else {

                alert(res.data.msg)
            }

            
        } catch (error) {

            if (error.response) {

                alert(error.response.data.msg)
            } else {

                alert('Server is not responding')
            }
            
        } finally {

            setloader(false)
        }
    }

    
   

    console.log(formfields);
    console.log(images);
   
  return (
    <>
    {loader ? <div className='d-flex align-items-center justify-content-center' style={{width: "100%" , height: "100vh"}}>
        <h1>Loading....</h1>
    </div>
     : <div>
        <form onSubmit={handleSubmit}
         className='d-flex flex-column gap-3'>
            <input type="text" className='form-control' readOnly placeholder='UserID'/>
<input type="text" className='form-control' value={formfields.UserName} placeholder='UserName'  name='UserName' onChange={handleOnChange} />
 <input type="text" className='form-control' value={formfields.UserPassword} placeholder='UserPassword'  name='UserPassword' onChange={handleOnChange} />
 <input type="text" className='form-control' value={formfields.UserEmail} placeholder='Email' name='UserEmail' onChange={handleOnChange} />
        <select className='form-select' value={formfields.IsActive} name='IsActive' onChange={handleOnChange}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <input type="file" multiple onChange={handleFiles} />
            <button className='btn btn-primary w-100' type='submit'>Submit</button>
        </form>
    </div>}
    
    </>
  )
}

export default CreateUserComponent