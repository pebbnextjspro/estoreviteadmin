import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router';

function SubCategoryCreate() {

    const navigation = useNavigate();
    const [listcategories , setlistcategories] = useState([]);

    const GetCategory = () => {

        axiosInstance.get('/api/admin/category/category-list').then((res) => {

            setlistcategories(res.data.Data)
        })
    }

    useEffect(() => {

        GetCategory();

    },[])

    const [formfields , setformfields] = useState({

        CategoryID: '',
        SubCategory: ''
    })

    const handleChange = (e) => {

        const value = e.target.value;
        const name = e.target.name;

        setformfields((prev) => ({

            ...prev , [name] : value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (formfields.CategoryID === 'Select Category') {

                alert('Please Select Category');
                return;
            }

            const res = await axiosInstance.post('/api/admin/subcategory/subcategory-create' , formfields);

            if (res.data.success) {

                alert(res.data.msg);
                navigation('/subcategorylist');

            }
            
        } catch (error) {

            if (error.response) {

                alert(error.response.data.msg);
            } else {

                alert('Server Not Responding')
            }          
        }
        }
console.log(formfields);
  return (
   <>
    <form onSubmit={handleSubmit}>
        <select value={formfields.CategoryID} name='CategoryID'
     onChange={handleChange} class="form-select" aria-label="Default select example">
  <option selected>Select Category</option>
 {
    listcategories?.length !== 0 && listcategories?.map((data) => (
        <option value={data.id}>{data.CategoryName}</option>
    ))
 }

</select>

<div>
    <label htmlFor="" className='form-label'></label>
<input type="text" value={formfields.SubCategory} className='form-control'  name='SubCategory' onChange={handleChange} />
</div>

<div className='mt-4'>
    <button className='btn btn-primary w-100' type='submit'>Insert Data</button>
</div>
    </form>
   </>
  )
}

export default SubCategoryCreate