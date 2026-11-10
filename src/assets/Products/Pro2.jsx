import React, { useState } from 'react'
import { ImGlass } from 'react-icons/im';
import axiosInstance from '../../api/axiosInstance';

function Pro2() {

    const [loading , setloading] = useState(false)
    const [images , setimages] = useState([])
    const [formfields , setformfields] = useState({
        ProductName: ''
    })

    const handleChange = (e) => {

        const value = e.target.value;
        const name = e.target.name;

        setformfields((prev) => ({

            ...prev ,  [name] : value
        }))
    }

    const handleFiles = (e) => {

        const files = Array.from(e.target.files);   

       const filetype = files.find((f) => (f.type === "image/jpeg" || f.type === "image/png" ));
        const filesize = files.find((f) => (f.size < 37000 ));

       
        console.log(filesize.size);

        if (filetype && filesize && images.length < 6) {

             setimages((prev) => ([

            ...prev , ...files
        ]))



        } else {

            
       alert('Attach an jpeg File');


        }


    }

    const handleDeleteImage = (filename) => {

        const imagefilter = images.filter((data) => {

            return data.name !== filename
        })

        setimages(imagefilter)
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        setloading(true);

        try {

             const formdata = new FormData();

       formdata.append("ProductName" , formfields.ProductName);

       images.forEach((file) => (
        formdata.append("images" , file)
       ));

       const res = await axiosInstance.post('/api/admin/products/product-create2' , formdata);

      alert(res.data.msg)

            
        } catch (error) {

            if (error.response) {

                alert(error.response.data.msg)
            } else {

                alert('Server is not Responding')
            }
        } finally {

            setloading(false);
        }}

console.log(formfields);
console.log(images);

  return (

    <>
    <div>
        {
            loading && <h1>Loading...</h1>
        }
    </div>
   <div>
    <form onSubmit={handleSubmit}>
         <input type="text" value={formfields.ProductName} name="ProductName" onChange={handleChange} />
    <input type="file" multiple onChange={handleFiles} />
    <input type="submit" />
    </form>
   </div>
   <div>
    {
        images.map((file) => (
            <div>
                <img src={URL.createObjectURL(file)} alt="" />
                <span onClick={() => handleDeleteImage(file.name)}>X</span>
            </div>           
        ))
    }
   </div>
    </>
  )
}

export default Pro2