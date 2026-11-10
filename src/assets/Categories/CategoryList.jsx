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
import axiosInstance from '../../api/axiosInstance'



function CategoryList() {
    const [search , setsearch] = useState('');

     const [listdata , setlistdata] = useState([]);

    const [pagenumber , setpagenumber] = useState(1);
    const [recordsperpage , setrecordsperpage] = useState(5);
    const lastindex = pagenumber * recordsperpage;
    const firstindex = lastindex - recordsperpage;
    const records = listdata.slice(firstindex , lastindex);
    const pages = Math.ceil(listdata.length / recordsperpage);
    const nopages = [...Array(pages + 1).keys()];

const handleChange = (event, value) => {
    setpagenumber(value);
  };

  const [productid , setproductid] = useState([]);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;

    if (checked) {

        const checkedata = listdata.map((item) => {
            return (item.id)
        })

        setproductid(checkedata)
    }
    else 
    {
        setproductid([]);
    }
  }

  const handleDeleteMulti = (e) => {
    const checked = e.target.checked;
    const value = parseInt(e.target.value);

    if(checked) {

        setproductid([...productid , value])
    }
    else 
    {
        const filterdata = productid.filter((data) => {
            return data !== value
        })
        setproductid(filterdata);
    }

  }

  console.log(productid)
    

    const GetData = () => {      

        axiosInstance.get('/api/admin/category/category-list').then((res) => {

            setlistdata(res.data.Data)
        })      
    }

    const handleDelete = (id) => {
axiosInstance.delete(`/api/admin/category/category-delete/${id}`).then(() => {

    GetData();
})

    }

    const handleDeleteAll = async () => {

        await Promise.all(productid.map((item) => {

            axiosInstance.delete(`/api/admin/category/category-delete/${item}`).then(() => {

    GetData();
})

        }))
        
    }

  useEffect(() => {

            GetData();
        },[])


  return (
    <div className='container-fluid'>
         <div className='row mt-3'>
                    <div className='col-sm-2 col-md-2 col-lg-2 '>
                    <Button className='createbtn d-flex gap-2'>
                       <IoMdCreate/>
                      <span>Create New</span>             
                      </Button>
                      </div>
        
                      <div className='col-sm-2 col-md-2 col-lg-2 '>
                    <Button className='deleteallbtn d-flex gap-2' onClick={handleDeleteAll}>
                       <MdDelete/>
                      <span>Delete All</span>             
                      </Button>
                      </div>
        
        
                       <div className='col-sm-6 col-md-6 col-lg-6 searchbar '>
         <input type="text" placeholder='Search Category Name' value={search} onChange={(e) => setsearch(e.target.value)}
         />
                        
                      </div>
        
                     
                      <div className='col-sm-2 col-md-2 col-lg-2 boxcontainer'>
                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small" className='myselectbox'>
              <InputLabel id="demo-select-small-label">Records Per Page</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                valu={recordsperpage}
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
         <div className='row mt-4'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
      <table className='table table-responsive table-dark table-bordered'>
        <thead>
        <tr>
            <th><input type="checkbox" onChange={handleSelectAll} /></th>
            <th>Sr#</th>
            <th>Category Name</th>
            <th>Category URL</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {
            records.filter((item) => {
                return search.toLowerCase() === '' ? item : item.CategoryName.toLowerCase().includes(search)
            }).map((item , index) => (<tr key={item.id}>
                <td><input type="checkbox" checked={productid.includes(item.id)}  value={item.id} onChange={handleDeleteMulti} /></td>
                <td>{item.SrNo}</td>
                <td>{item.CategoryName}</td>
                <td>{item.CategoryImgUrl}</td>
                 <td className='d-flex align-items-center justify-content-center gap-3'>
    <Button className='actionbtns'><Link to="/productview"><IoMdEye className='btnviewdark'/></Link></Button>
    <Button className='actionbtns'><FaEdit className='btneditdark'/></Button>
    <Button className='actionbtns'
     onClick={() => {if (window.confirm('Are you')) { return handleDelete(item.id)}}} >
        <MdDelete  className='btndeletedark'/></Button></td>
            </tr>))
            }
        </tbody>
      </table>
    </div>
    </div>
    <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center'>
                <Pagination count={pages} page={pagenumber} onChange={handleChange} color="primary" />
                </div>
            </div>
    </div>
  )
}

export default CategoryList
