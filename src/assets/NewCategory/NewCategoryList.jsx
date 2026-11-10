import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import Pagination from '@mui/material/Pagination';
import { BiSort } from "react-icons/bi";
import { Link } from 'react-router';


function NewCategoryList() {

  /////Start States////////////////

    const [listdata , setlistdata] = useState([]);
    const [loading , setloading] = useState(false);
    const [search , setsearch] = useState('');
   
////Start CheckBox Logic///////////

 const [ids , setids] = useState([]);

    const handleCheckBox = (e) => {

        const value = parseInt(e.target.value);
        const checked = e.target.checked;

       if (checked) {

         setids([
            ...ids , value
        ])
       } else {

        const filteredids = ids.filter((data) => {

            return data !== value
        })

        setids(filteredids)
       }

    }

    const handleOnChangeAllDelete = (e) => {

        const checked = e.target.checked;

        if (checked) {

            const getallids = records.map((data) => {

                return data.id;
            })

            setids(getallids);
        } else {

            setids([])
        }
    }


///End CheckBox Logic//////////
  /////End States//////////////////

  /////////////Start Pagination ////////////////////

        const filtersearch = listdata.filter((data) => {

       if (search === '') {

        return data;
       } else {

        return (

            data.CategoryName.toLowerCase().includes(search)
        )
       }       
    });

    const [currentpage , setcurrentpage] = useState(1);
    const [recordsperpage , setrecordsperpage] = useState(3);
    const lastindex = currentpage * recordsperpage;
    const firstindex = lastindex - recordsperpage;
    const records = filtersearch.slice(firstindex , lastindex);
    const pages = Math.ceil(filtersearch.length / recordsperpage);
    //const numbers = [...Array(pages + 1).keys()];

    const handlePagination = (event, value) => {
    setcurrentpage(value);
  };


  /////////////End Pagination /////////////////////

  ///////////Start Sorting //////////////////////

  const [order , setorder] = useState("ASC")

  const handleSortString = (col) => {

   if (order === "ASC") {

     const sorteddata = [...listdata].sort((a , b) => (

        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
     ))

    setlistdata(sorteddata);
    setorder("DSC");
    
   } else  if (order === "DSC") {

     const sorteddata = [...listdata].sort((a , b) => (

        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
     ))

    setlistdata(sorteddata);
    setorder("ASC");
   }}

  ///////////End Sorting ////////////////////// 
const handleDeleteAll = () => {

   if (window.confirm("Are Your Sure!")) {

     Promise.all((ids.map((data) => {

        axiosInstance.delete(`/api/admin/category/category-delete/${data}`).then((res) => {

            GetData();

        })

    })))

    setids([]);
    setcurrentpage(1);
   } else {

    setids([])
   }
}

    const GetData = async () => {

        try {

            const res = await axiosInstance.get('/api/admin/category/category-list');

            setlistdata(res.data.Data)
            
        } catch (error) {
            
            console.log(error);
        }
    }

    const handleEdit = (id, CategoryName , CategoryImgUrl , CategoryColor) => {

        localStorage.setItem("id" , id);
        localStorage.setItem("CategoryName" , CategoryName)
        localStorage.setItem("CategoryImgUrl", CategoryImgUrl);
        localStorage.setItem("CategoryColor" , CategoryColor);

    }

    const handleDelete = async (id) => {

        setloading(true)

        try {

            const res = await axiosInstance.delete(`/api/admin/category/category-delete/${id}`);

            if (res.data.success) {

                alert(res.data.msg);
                GetData();
            }
            
        } catch (error) {

            if (error.response) {

                alert(error.response.data.msg);

            } else {

                alert('Server is Not Responding')
            }
            
        } finally {

            setloading(false)
        }
    }

    useEffect(() => {

        GetData();

    },[])

  return (
    <>
    {loading && <h1>Loading...</h1>}
  <div className='container-fluid'>
    <div className='row mb-4 mt-4 border'>
    <div className='col-sm-6 col-md-6 col-lg-6'>
        <div>
             <div class="form-group">
    <input type="email"  class="form-control" id="exampleInputEmail1"
    onChange={(e) => setsearch(e.target.value)} aria-describedby="emailHelp" placeholder="Search Items"/>
  </div>
        </div>
        </div>
        <div className='col-sm-2 col-md-2 col-lg-2 d-flex align-items-center justify-content-end gap-3'>
<select value={recordsperpage} onChange={(e) => setrecordsperpage(e.target.value)} 
class="form-select" aria-label="Default select example">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="100">100</option>
</select>
        </div>
        <div className='col-sm-4 col-md-4 col-lg-4 d-flex align-items-center justify-content-end gap-3'>
            <Link to={'/createcategory'}><button className='btn btn-success'>Create Category</button></Link>
             <button onClick={handleDeleteAll} className='btn btn-danger'>Delete All</button>
        </div>
         
    </div>
    <div className='row'>
    <div className='col-sm-12 col-md-12 col-lg-12'>
  <table className='table table-responsive table-bordered table-dark
   table-striped align-middle text-center'>
        <thead>
            <tr>
                <th><input type="checkbox" onChange={handleOnChangeAllDelete} checked={ids.length === 0 ? false : true} /></th>
                <th>Sr#</th>
                <th className='text-start'>
                   <div className='d-flex justify-content-between align-items-center'>
                     <span>Category Name</span>
                <BiSort onClick={() => handleSortString("CategoryName")} style={{cursor: "pointer"}}/>
                   </div>
                    </th>
                <th>Category Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
           {
            records?.length !== 0 && records?.map((data ,index) => (
                 <tr>
                <td><input type="checkbox" checked={ids.includes(data.id)} value={data.id} onChange={handleCheckBox} /></td>
                <td>{index + 1}</td>
                <td className='text-start'>{data.CategoryName}</td>
                <td><img src={`http://localhost:4000/uploads/${data.CategoryImgUrl}`}
                style={{width: "50px" , height: "50px" , objectFit: "cover" , borderRadius: "10px" , 
                border: "1px solid #fff"}} alt="" /></td>
                <td>
                    <div className="d-flex gap-2 justify-content-center align-items-center">
    <Link to={'/updatecategory'}><button className='btn btn-primary fw-bold' 
    onClick={() => handleEdit(data.id, data.CategoryName , data.CategoryImgUrl , data.CategoryColor)}>Edit</button></Link>
    <button className='btn btn-success fw-bold'>View</button>
    <button
      onClick={() => {
        if (window.confirm('Are You Sure!')) {
          handleDelete(data.id);
        }
      }}
      className='btn btn-danger fw-bold'
    >
      Delete
    </button>
  </div>
                </td>
            </tr>
            ))
           }
        </tbody>
    </table>
    </div>
    </div>
     <div className='row mt-3'>
    <div className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center'>
              <Pagination count={pages} page={currentpage}  color="primary" onChange={handlePagination} />
        </div>
    </div>
  </div>
    </>
  )
}

export default NewCategoryList