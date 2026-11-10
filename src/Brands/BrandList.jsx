import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import Pagination from '@mui/material/Pagination';
import { BiSort } from "react-icons/bi";
import { Link } from 'react-router';
import { BaseApi } from '../BaseApi';



function BrandList() {

    const [listdata , setlistdata] = useState([]);
    const [search , setsearch] = useState('');
    const [ids , setids] = useState([]);

    const handleSelect = (e) => {

        const value = parseInt(e.target.value);
        const checked = e.target.checked;

        if (checked) {

            setids([

                ...ids , value
            ])
        } else {

            const filterids = ids.filter((data) => {

                return data !== value;
            })

            setids(filterids);
        }
    }


    const filtersearch = listdata.filter((data) => {

        if (search === '') {

            return data;
        } else {

            return (
                data.BrandName.toLowerCase().includes(search) ||
                data.SrNo.toString().includes(search)
            )}
        
    })


    const [currentpage , setcurrentpage] = useState(1);
    const [recordsperpage , setrecordsperpage] = useState(3);
    const lastindex = currentpage * recordsperpage;
    const firstindex = lastindex - recordsperpage;
    const records = filtersearch.slice(firstindex , lastindex);
    const pages = Math.ceil(filtersearch.length / recordsperpage);
    const numbers = [...Array(pages).keys()];


    
    /////////////////////start pagination///////////////////


    const GetData = () => {

        axiosInstance.get('api/admin/brand/brand-list').then((res) => {           
            setlistdata(res.data.Data);
        })
    }


    useEffect(() => {

        GetData();

    },[])

    const handlePagination = (event, value) => {

    setcurrentpage(value);
  };

  const handleDelete = (id) => {

    axiosInstance.delete(`/api/admin/brand/brand-delete/${id}`).then(() => {

        GetData();
    })
  }

  const [order , setorder] = useState('ASC')

  const handleSortString = (col) => {

    if (order === 'ASC') {

        const sorteddata = [...listdata].sort((a , b) => (

            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1

        ))

        setlistdata(sorteddata);
        setorder('DSC');
    } 
    
    if (order === 'DSC') {

        const sorteddata = [...listdata].sort((a , b) => (

            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        ))

        setlistdata(sorteddata);
        setorder('ASC')
    }
    
  }

  const handleDeleteAll = () => {

    Promise.all((ids.map((data) => {

        axiosInstance.delete(`/api/admin/brand/brand-delete/${data}`).then(() => {

        GetData();
    })
    })))
  }

  const handleDeleteComp = (e) => {

    const checked = e.target.checked;

    if (checked) {

        const getallids = records.map((data) => {

            return data.BrandId;
        })

        setids(getallids)
    } else {

        setids([])
    }
  }

const handleEditClick = (id , brandname , BrandImage) => {

    localStorage.setItem('id' , id);
    localStorage.setItem('brandname', brandname);
    localStorage.setItem('brandimage' , BrandImage)
}
  return (
    <>
   <div className='container-fluid'>
    <div className='mb-3 mt-3'>
        <div>
            <button className='btn btn-danger' onClick={handleDeleteAll}>Delete All</button>
            <Link to={'/brandcreate'}><button className='btn btn-success ms-4'>Create New</button></Link>
        </div>
    </div>
     <div className='row mb-3'>
     <div className='col-sm-12 col-md-12 col-lg-12'>
        <input type="text" className='input-group' value={search} onChange={(e) => setsearch(e.target.value)} />
        </div>
     </div>
     <div className='row'>
     <div className='col-sm-12 col-md-12 col-lg-12'>
        <table className='table table-responsive table-striped table-bordered text-center align-middle'>
            <thead>
                <tr>
                    <th><input type="checkbox" onChange={handleDeleteComp} /></th>
                    <th>
                        <div className='d-flex justify-content-between'>
                     <span>Sr No</span>
                        <BiSort style={{cursor: "pointer"}}/>
                        </div>                       
                    </th>
                     <th>
                        <div className='d-flex justify-content-between'>
                     <span>Brand Name</span>
                        <BiSort style={{cursor: "pointer"}} onClick={() => handleSortString('BrandName')}/>
                        </div>                       
                    </th>
                    <th>BrandImage</th>
                   
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    records?.length !== 0 && records?.map((data , index) => (
                        <tr key={data.BrandId}>
                    <td><input type="checkbox" checked={ids.includes(data.BrandId)} value={data.BrandId} onChange={handleSelect} /></td>
                    <td>{index + 1}</td>
                    <td>{data.BrandName}</td>
                    <td>
                        <img src={`${BaseApi}/uploads/${data.BrandImage}`}
                        style={{width: "50px" , height: "50px", objectFit: "contain" , 
                border: "1px solid rgba(0,0,0,0.2)", padding: "10px", borderRadius: "10px"}} alt="" />
                    </td>
                    <td>
                        <div className='d-flex gap-2 align-items-center justify-content-center'>
                            <button className='btn btn-primary'>View</button>
                        <Link to={'/brandedit'}><button className='btn btn-info'
                        onClick={() => handleEditClick(data.BrandId , data.BrandName , data.BrandImage)}>Edit</button></Link>
                        <button className='btn btn-danger' 
                        onClick={() => {
                            if (window.confirm('Are You Sure')) {

                                handleDelete(data.BrandId);
                            }
                        }}>Delete</button>
                        </div>
                    </td>
                </tr>
                    ))
                }
            </tbody>
        </table>
     </div>
    </div>
    <div>
        <div>
    <Pagination count={pages} page={currentpage} color="primary" onChange={handlePagination} />
        </div>
    </div>
   </div>
    </>
  )
}

export default BrandList