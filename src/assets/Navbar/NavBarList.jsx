import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance';

function NavBarList() {




    const [listdata , setlistdata] = useState([]);
    const [ids , setids] = useState([]);

    const [currentpage , setcurrentpage] = useState(1);
    const [recordsperpage , setrecordsperpage] = useState(5);
    const lastindex = recordsperpage * currentpage;
    const firstindex = lastindex - recordsperpage;
    const records = listdata.slice(firstindex , lastindex);
    const pages = Math.ceil(listdata.length / recordsperpage);
    const numbers = [...Array(pages + 1).keys()].slice(1);



    const GetData = () => {

        axiosInstance.get('/api/admin/navbar/navbar-list').then((res) => {

            setlistdata(res.data.Data)
        })
    }

    useEffect(() => {

        GetData();

    },[])

const [order , setorder] = useState("ASC")

const sortingtest = (col) => {
 if (order === "ASC") {
   const getnamesor = [...listdata].sort((a , b) => (
    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  ))
  setlistdata(getnamesor);
  setorder("DSC")
 }

 else if (order === "DSC") {
  const getnamesor = [...listdata].sort((a , b) => 
  a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
  setlistdata(getnamesor);
  setorder("ASC")
 }  
}

const sortint = (col) => {

if (order === 'ASC') {

    const sorteddata = [...listdata].sort((a , b) => (

        a[col] - b[col] 

    ))

    setlistdata(sorteddata);
    setorder('DSC');
} else if (order === 'DSC') {

    const sorteddata = [...listdata].sort((a , b) => (

        b[col] - a[col]
    ))

    setlistdata(sorteddata);
    setorder('ASC')
}

}


    const handleClickPage = (id) => {

        setcurrentpage(id);
    }

    const getPagination = () => {
  const totalPages = pages;
  const current = currentpage;
  const visible = 3; // pages to show near current

  let pagination = [];

  // Always show first page
  pagination.push(1);

  // Show leading ellipsis
  if (current > visible + 2) {
    pagination.push("...");
  }

  // Show pages around current page
  for (let i = current - visible; i <= current + visible; i++) {
    if (i > 1 && i < totalPages) {
      pagination.push(i);
    }
  }

  // Show trailing ellipsis
  if (current < totalPages - (visible + 1)) {
    pagination.push("...");
  }

  // Always show last page
  if (totalPages > 1) pagination.push(totalPages);

  return pagination;
};

const handleDelete = (id) => {

    axiosInstance.delete(`/api/admin/navbar/navbar-delete/${id}`).then(() => {

        GetData();
    })
}

const handleDeleteAll = () => {

    Promise.all((ids.map((id) => {

        axiosInstance.delete(`/api/admin/navbar/navbar-delete/${id}`).then(() => {

            GetData();
        })

    })))

}

const handleChangeDelete = (e) => {

    const value = parseInt(e.target.value);
    const checked = e.target.checked;

    if (checked) {

        setids([
            ...ids , value
        ])
    } else {

        const filterdata = ids.filter((prev) => {

            return prev !== value
        })

        setids(filterdata)
    }
}


const CheckAllChange = (e) => {

    const checked = e.target.checked;

    if (checked) {

        const allids = listdata.map((ids) => {

            return ids.NavBarId;
        })

        setids(allids)
    } else {

        setids([])
    }
}



  return (
    <>
    <div className='row'>
        <div className='col-12'>
            <button className='btn btn-danger btn-lg'
            onClick={handleDeleteAll}>Delete All</button>
        </div>
    </div>
        <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-12'>
         <table className='table table-bordered table-responsive'>
            <thead>
                <tr>
                    <th><input type="checkbox" onChange={CheckAllChange} /></th>
                    <th onClick={() => sortint('SrNo')}>Sr#</th>
                    <th onClick={() => sortingtest('MainItem')}>Main Item</th>
                    <th>Sub Item</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    records?.length !== 0 && records?.map((data) => (

                        <tr>
                    <td><input type="checkbox" value={data.NavBarId}
                    checked={ids.includes(data.NavBarId)} onChange={handleChangeDelete} /></td>
                    <td>{data.SrNo}</td>
                    <td>{data.MainItem}</td>
                    <td>{data.SubItem}</td>
                    <td className='d-flex gap-2'>
                        <button className='btn btn-info'>Edit</button>
                        <button className='btn btn-primary'>View</button>
        <button className='btn btn-danger' 
        onClick={() => {if (window.confirm('Are you Sure')) {handleDelete(data.NavBarId)}}}>Delete</button>
                    </td>
                </tr>
                    ))
                }
            </tbody>
            </table>   
        </div>

    </div>
    <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-12 d-flex'>
            <button className='btn btn-primary'>Prev</button>
            <ul className='d-flex list-unstyled gap-5'>
                <ul className='d-flex list-unstyled gap-3'>
  {getPagination().map((num, index) => (
    <li
      key={index}
      onClick={() => num !== "..." && handleClickPage(num)}
      style={{
        cursor: num === "..." ? "default" : "pointer",
        fontWeight: currentpage === num ? "bold" : "normal"
      }}
    >
      {num}
    </li>
  ))}
</ul>

            </ul>
            <button className='btn btn-primary btn-lg btn'>Next</button>
            </div>
        </div>
    </>
  )
}

export default NavBarList