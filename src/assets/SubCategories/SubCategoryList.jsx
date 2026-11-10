import React, { useEffect, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { IoMdCreate } from "react-icons/io";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../../api/axiosInstance';

function SubCategoryList() {

  const [listdata , setlistdata] = useState([]);
    const [subcategoryid , setsubcategoryid] = useState([]);
    const [search , setsearch] = useState();

  const [currentpage , setcurrentpage] = useState(1);
  const [recordsperpage , setrecordsperpage] = useState(5);
  const lastindex = currentpage * recordsperpage;
  const firstindex = lastindex - recordsperpage;
  const records = listdata.slice(firstindex , lastindex);
  const pages = Math.ceil(listdata.length / recordsperpage);
  const numbers = [...Array(pages + 1).keys()];

   const handleChange = (event, value) => {
    setcurrentpage(value);
  };


    

    const GetData = () => {

      axiosInstance.get('/api/admin/subcategory/subcategory-list').then((res) => {

        setlistdata(res.data.Data);
      })
    }

    const handleDelete = (id) => {

      axiosInstance.delete(`/api/admin/subcategory/subcategory-delete/${id}`).then(() => {
        GetData();
      })
    }

    const handleMultiDelete = (e) => {

      const checked = e.target.checked;
      const value = parseInt(e.target.value);

      if (checked) {

        setsubcategoryid([
          ...subcategoryid , value
        ])        
      }
      else 
      {
        const filterdata = subcategoryid.filter((data) => {
          return data !== value;
        })
        setsubcategoryid(filterdata);
      }
    }

    const handleDeleteAll = async () => {

      await Promise.all(subcategoryid.map((id) => {

        axiosInstance.delete(`/api/admin/subcategory/subcategory-delete/${id}`).then(() => {
        GetData();
      })
      }))

    }

    const handleAllSelect = (e) => {

      const checked = e.target.checked;

      if (checked) {

        const alldata = listdata.map((item, index) => {
          return (item.id)
        })
        setsubcategoryid(alldata)
      }
      else
      {
        setsubcategoryid([]);
      }
    }

    const handleEdit = (id , SubCategory , CategoryID)  => {

      localStorage.setItem("id" , id);
      localStorage.setItem("SubCategory" , SubCategory);
      localStorage.setItem("CategoryID" , CategoryID);
    }

    useEffect(() => {

      GetData();

    },[])


  return (
    <div className='container-fluid '>

       <div className='row d-flex align-items-center justify-content-center mt-3'>
                  <div className='col-sm-2 col-md-2 col-lg-2 '>
                 <Link to={'/subcategorycreate'}> <Button className='createbtn d-flex gap-2'>
                     <IoMdCreate/>
                    <span>Create New</span>             
                    </Button></Link>
                    </div>
      
                    <div className='col-sm-2 col-md-2 col-lg-2 '>
                  <Button className='deleteallbtn d-flex gap-2' onClick={handleDeleteAll}>
                     <MdDelete/>
                    <span>Delete All</span>             
                    </Button>
                    </div>
      
      
                     <div className='col-sm-6 col-md-6 col-lg-6 searchbar '>
       <input type="text" placeholder='Search Category Name / Sub Category Name'
       value={search} onChange={(e) => setsearch(e.target.value)} />                      
                    </div>
      
                   
                    <div className='col-sm-2 col-md-2 col-lg-2 boxcontainer'>
                      <FormControl sx={{ m: 1, minWidth: 200 }} size="small" className='myselectbox'>
            <InputLabel id="demo-select-small-label">Records Per Page</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
             value={recordsperpage}
              label="Age"
             onChange={(e) => setrecordsperpage(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
                      </div>
                  </div>
      <div className='row mt-3'>
            <div className='col-sm-12 col-md-12 col-lg-12 '>
      <table className='table table-responsive table-dark table-bordered'>
        <thead>
            <tr>
            <th><input type="checkbox" onChange={handleAllSelect} /></th>
            <th>Sr#</th>
            <th>Sub Category</th>
            <th>Category Name</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
           {
            records.map((item , index) => ( <tr key={item.id}>
            <td><input type="checkbox" checked={subcategoryid.includes(item.id)} value={item.id} onChange={handleMultiDelete} /></td>
            <td>{item.SrNo}</td>
            <td>{item.SubCategory}</td>
            <td>{item.CategoryName}</td>
             <td className='d-flex align-items-center justify-content-center gap-3'>
    <Button className='actionbtns'><Link to="/productview"><IoMdEye className='btnviewdark'/></Link></Button>
    <Link to={'/subcategoryupdate'}><Button 
    onClick={() => handleEdit(item.id , item.SubCategory  , item.CategoryID)} className='actionbtns'><FaEdit className='btneditdark'/></Button></Link>
    <Button className='actionbtns' onClick={() => {if(window.confirm('Row Will be Deleted. Are You Sure?')) handleDelete(item.id)}}>
        <MdDelete  className='btndeletedark'/></Button></td>
            </tr>))
           }
        </tbody>
      </table>
    </div>
    </div>
      <div className='row  mt-3'>
            <div className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center '>
              <Pagination count={pages} page={currentpage} onChange={handleChange} color="primary" />
              </div>
            </div>
    
    </div>
  )
}

export default SubCategoryList
