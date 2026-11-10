import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Rating from '@mui/material/Rating';
import { IoMdEye } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import { IoMdCreate } from "react-icons/io";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router';
import axiosInstance from '../../api/axiosInstance'





function ProductList() {

  const [listdata , setlistdata] = useState([]);
  const [search , setsearch] = useState('');
  const [productid , setproductid] = useState([]);
  const [allids , setallids] = useState([]);

    const filtersearch = listdata.filter((data) => {

    if (search === '') {

      return data
    } else {

      return (

        data.ProductName.toLowerCase().includes(search)
      )
    }
    
  })

  const [currentpage , setcurrentpage] = useState(1);
  const [recordsperpage , setrecordsperpage] = useState(5);
  const lastindex = currentpage * recordsperpage;
  const firstindex = lastindex - recordsperpage;
  const records = filtersearch.slice(firstindex , lastindex);
  const npage = Math.ceil(filtersearch.length / recordsperpage);
  const numbers = [...Array(npage + 1).keys()]



  const handleSelectAll = (e) => {
    const checked = e.target.checked;

    if (checked) {

       const data = listdata.map((item) => {
        return item.id
       })

        setproductid(data)
    }
    else 
    {
        
        setproductid([]);
    }

   

  }


  const handleChangeId = (e) => {

    const checked = e.target.checked;
    const value =  parseInt(e.target.value);

    if (checked) {
        setproductid([
            ...productid , value
        ])}
    else
    {
        const filterdata = productid.filter((data) => {
            return data !== value
        });
        setproductid(filterdata)
    }}

const handleAllDelete = async () => {

    await Promise.all(productid.map((id) => {

        axiosInstance.delete(`/api/admin/products/product-delete/${id}`).then(()  => {
            
            GetData();
        })
    }))

}    

    


  
  
  const handleChange = (event, value) => {
    setcurrentpage(value); 
  };

  

 const GetData = () => {

  axiosInstance.get('/api/admin/products/product-list').then((res) => {

    setlistdata(res.data.Data)
  })
 }

 const handleDelete = (id) => {

axiosInstance.delete(`/api/admin/products/product-delete/${id}`).then(() => {

    GetData();
    })

 }

 const handleUpdate = (id,ProductName,ProductDescription,ProductCategory,ProductSubCategory,ProductBrand,
  ProductOldPrice,ProductNewPrice,ProductsInStock,ProductRating,ProductColor,ProductImages4,ProductWeight,
  ProductShipCharges,ProductImages1) => {

    const productimagesstring = ProductImages4 ? JSON.stringify(ProductImages4) : null;

    localStorage.setItem('id' ,id);
    localStorage.setItem('ProductName' ,ProductName )
    localStorage.setItem('ProductDescription' , ProductDescription)
    localStorage.setItem('ProductCategory' ,ProductCategory)
    localStorage.setItem('ProductSubCategory' , ProductSubCategory)
    localStorage.setItem('ProductBrand' ,ProductBrand )
    localStorage.setItem('ProductOldPrice' ,ProductOldPrice )
    localStorage.setItem('ProductNewPrice' , ProductNewPrice)
    localStorage.setItem('ProductsInStock' , ProductsInStock )
    localStorage.setItem('ProductRating' , ProductRating)
    localStorage.setItem('ProductColor' , ProductColor)
    localStorage.setItem('ProductImages4' , productimagesstring)
    localStorage.setItem('ProductWeight' , ProductWeight)
    localStorage.setItem('ProductShipCharges' , ProductShipCharges)
    localStorage.setItem('ProductImages1' , ProductImages1)



 }

 const BasedAPI = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    GetData();
  },[]);

  console.log('listdata' , listdata)

  return (
    <>
   
         <div className='container-fluid border'>
           <div className='row border mt-3'>
            <div className='col-sm-2 col-md-2 col-lg-2 border'>
          <Link to={'/productcreate'}>
            <Button className='createbtn d-flex gap-2'>
               <IoMdCreate/>
              <span>Create New</span>             
              </Button>
          </Link>
              </div>

              <div className='col-sm-2 col-md-2 col-lg-2 border'>
            <Button className='deleteallbtn d-flex gap-2' onClick={handleAllDelete}>
               <MdDelete/>
              <span>Delete All</span>             
              </Button>
              </div>


               <div className='col-sm-6 col-md-6 col-lg-6 searchbar border'>
 <input type="text" placeholder='Search Product Name / Category Name / Sub Category Name' 
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
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
            <table className="table table-responsive table-striped mt-5">
  <thead>
    <tr>
      <th><input type="checkbox"  onChange={handleSelectAll}/></th>
      <th>Sr#</th>
      <th>Product</th>
      <th>Category/SubCategory/Brand</th>
      <th>Price/Stock</th>   
      <th>Product Rating</th>
      <th>Product Color</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {records?.length !== 0 && records.map((item, index) => (

      <tr key={index}>
        <td><input type="checkbox" checked={productid.includes(item.id)}   value={item.id} onChange={handleChangeId} /></td>
        <td>{item.SrNo}</td>
        <td>
          <div className="col1 d-flex gap-3">
            <img src={`${BasedAPI}/uploads/${item.ProductImages4[0]}`} alt="" width="50" height="50" />
            <div className="d-flex flex-column">
              <span className='single-line'>{item.ProductName}</span>
              <span className='single-line'>{item.ProductDescription}</span>
            </div>
          </div>
        </td>
        
        <td>
          <span>{item.CategoryName+' / '}</span>
          <span>{item.SubCategory+' / '}</span>
          <span>{item.BrandName}</span>
        </td>
        <td>
          <span className='oldprice'>{'Rs. '+item.ProductOldPrice+' / '}</span>
          <span className='newprice'>{'Rs. '+item.ProductNewPrice+' / '}</span>          
          <span>{item.ProductsInStock}</span>
        </td>
        <td>
          <span><Rating name="read-only" value={item.ProductRating} readOnly /></span>
        </td>
        <td>
          <div style={{width: "50px" , height: "50px" , border: "1px solid rgba(0,0,0,0.1)" , background: item.ProductColor,
            borderRadius: "50%"
          }}>

          </div>
        </td>
        <td>
       <div>
         <Button><Link to="/productview"><IoMdEye className='btnview'/></Link></Button>
        <Button 
        onClick={() => handleUpdate(item.id,item.ProductName,item.ProductDescription,item.ProductCategory,item.ProductSubCategory,
        item.ProductBrand,item.ProductOldPrice,item.ProductNewPrice,item.ProductsInStock,item.ProductRating,item.ProductColor,
        item.ProductImages4,item.ProductWeight, item.ProductShipCharges,item.ProductImages1
        )}>
        <Link to={'/productupdate'}><FaEdit className='btnedit'/></Link></Button>
        <Button 
        onClick={() => {if(window.confirm('Data will be Deleted. Are you Sure?')) { handleDelete(item.id)}}}>
            <MdDelete className='btndelete'/></Button>
       </div>
        </td>
        {/* Add other <td> fields here */}
      </tr>
    ))}
  </tbody>
</table>

            </div>

          </div>

           <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center'>
           <Pagination count={npage} page={currentpage} onChange={handleChange}/>
              </div>
            </div>

            
          </div>  
            
    </>
  )
}

export default ProductList
