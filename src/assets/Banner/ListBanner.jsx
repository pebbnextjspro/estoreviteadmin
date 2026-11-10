import React, { useContext, useEffect, useState } from 'react'
import axiosInstance, { imageurl } from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { MyContext } from '../../App';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import imagefrom from '/1.jpg'
import { useNavigate } from 'react-router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  overflowY: "scroll"
};


function ListBanner() {

     const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [oldprice , setoldprice] = useState();
  const [options , setoptions] = useState(false);
  const [selectedvalue , setselectedvalue] = useState();

    const [listdata , setlistdata] = useState([]);
    const [productdata , setproductdata] = useState([]);

    const navigation = useNavigate();

    const GetProductData = async () => {

        try {

            const res = await axiosInstance.get('/api/admin/products/product-list');

            if (res.data.success) {

                const array = res.data.Data;

                const sorteddata = [...array].sort((a  , b) => {

                    return a.ProductName.toLowerCase() > b.ProductName.toLowerCase() ? 1 : -1
                })

                setproductdata(sorteddata);
            } else {

                alert(res.data.msg)
            }
            
        } catch (error) {

            if (error.response) {

                alert(error.response.data.msg);
            } else {

                alert('Server is not responding')
            }
            
        }
    }

 

  const [formfields , setformfields] = useState({

    Heading1: '#1 Our Best Product',
    Heading2: ``,
    Heading3: 'doloremque amet dicta unde ipsam quidem sed',
    NewPrice: '',
    OldPrice: '',
    Rating: '',
    ShortDesc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus esse soluta natus enim. Voluptas cumque,
     officiis impedit deleniti animi natus, doloremque amet dicta unde ipsam quidem sed eligendi dolor neque?`,
    Likes: '5',
    DisLikes: '2',
    ProductId: '',
    BannerCategory: ''
  })

  const handleOnchange = (e) => {

    const value = e.target.value;
    const name = e.target.name;

    setformfields((prev) => ({
        ...prev , [name]:value
    }))

   
  }

    const context = useContext(MyContext);

    const [image , setimage] = useState('');
    const [imagepreview , setimagepreview] = useState('');

    const handleFile = (e) => {

        const file = e.target.files[0];

        setimage(file);

       setimagepreview(URL.createObjectURL(file))

    }


    const GetData = async () => {

        context.setloader(true)

        try {
            
            const res = await axiosInstance.get('/api/admin/banner/banner-list');
            
            if(res.data.success) {

                setlistdata(res.data.Data);
            } else {

                toast(`${res.data.msg}`, {theme: "dark"});
            }
            

        } catch (error) {

            if(error.response) {

                toast(`${error.response.data.msg}`, {theme: "dark"});
                
            } else {

                toast('Server Not Responding')
            }
            
        } finally {

            context.setloader(false)
        }
    }

    useEffect(() => {

        GetData();
        GetProductData();
    },[])


    const handleSelectData = (productname , oldprice , newprice ,rating, id) => {

        setformfields((prev) => ({

            ...prev , OldPrice: oldprice , NewPrice: newprice, Rating: rating, Heading2: productname , ProductId: id
        }));
        setselectedvalue(productname);
        setoptions(false);

       
    }

  const handleUpdate = (BannerId,id,ProductName,Heading1, Heading2, Heading3,
    ProductNewPrice,
    ProductOldPrice,ProductRating,DisLikes,Likes,ShortDesc,BannerImage
  ) => {

    localStorage.setItem('id' , id);
    localStorage.setItem('BannerId' , BannerId);
    localStorage.setItem('ProductName' , ProductName);
    localStorage.setItem('Heading1' , Heading1);
    localStorage.setItem('Heading2' , Heading2);
    localStorage.setItem('Heading3' , Heading3);
        localStorage.setItem('ProductNewPrice' , ProductNewPrice);
localStorage.setItem('ProductOldPrice' , ProductOldPrice);
localStorage.setItem('ProductRating' , ProductRating);
localStorage.setItem('DisLikes' , DisLikes);
localStorage.setItem('Likes' , Likes);
localStorage.setItem('ShortDesc' , ShortDesc);
localStorage.setItem('BannerImage' , BannerImage);

    navigation('/updatebanner')
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    context.setloader(true)

    try {

        const formdata = new FormData();

        formdata.append('Heading1' , formfields.Heading1);
        formdata.append('Heading2', formfields.Heading2);
        formdata.append('Heading3' , formfields.Heading3);
        formdata.append('NewPrice' , formfields.NewPrice);
        formdata.append('OldPrice' , formfields.OldPrice);
         formdata.append('Rating' , formfields.Rating );
 formdata.append('ShortDesc' , formfields.ShortDesc );
 formdata.append('Likes' , formfields.Likes );
 formdata.append('DisLikes' , formfields.DisLikes);
formdata.append('image', image);
formdata.append('BannerCategory' , formfields.BannerCategory);
formdata.append('ProductId' , formfields.ProductId);

        const res = await axiosInstance.post('/api/admin/banner/banner-create' , formdata);

        if (res.data.success) {

            toast.success(`${res.data.msg}`, {theme: "dark"});
        } else {

            toast.error(`${res.data.msg}` , {theme: "dark"})
        }

        
    } catch (error) {

        if (error.response) {

            toast.error(`${error.response.data.msg}` , {theme: "dark"})
        } else {

            toast.error(`Server is not responding` , {theme: "dark"})

        }       
    } finally {

        context.setloader(false);
        GetData();
    }
  }

  const handleDelete = (id) => {

    axiosInstance.delete(`/api/admin/banner/banner-delete/${id}`).then(() => {

        GetData();
    })
  }

  const [ids , setids] = useState([]);

  const handleIds = (e) => {

    const value = parseInt(e.target.value);
    const checked = e.target.checked;

    if (checked) {

        setids([
            ...ids , value
        ])
    } else {

        const filterdata = ids.filter((data) => {

            return data !== value
        });

        setids(filterdata)
    }
  
  }

  const handleDeleteMulti = () => {

     axiosInstance.delete(`/api/admin/banner/banner-delete` , {
        data : {ids}
     }).then(() => {

        GetData();
    })
    
  }

console.log("productdata" , productdata)
  return (
    <>
   
     <div className='row'>
    <div className='col-md-12 col-sm-12 col-lg-12 p-3 d-flex align-items-center justify-content-start gap-2'>
        <button className='btn btn-primary' onClick={handleOpen}>Create New</button>
        <button className='btn btn-primary' onClick={handleDeleteMulti}>Delete All</button>
        </div>
    </div>
    <div className='row'>
    <div className='col-md-12 col-sm-12 col-lg-12'>
        
    <table className='table table-responsive table-bordered'>
        <thead>
           <tr>
             <th><input type="checkbox" /></th>
            <th>Heading 1</th>
            <th>Heading 2</th>
            <th>Heading 3</th>
            <th>Image</th>
            <th>Actions</th>
           </tr>
        </thead>
        <tbody>
            {
                listdata.length !== 0 && listdata.map((data) => (
                    <tr>
                <td><input type="checkbox" value={data.BannerId} onChange={handleIds} /></td>
                <td>{data.Heading1}</td>
                <td>{data.Heading2}</td>
                <td>{data.Heading3}</td>
                <td>
                    <div>
                        <img src={`${imageurl}/uploads/${data.BannerImage}`} 
                        style={{width: "100px" , height: "100px"}} alt="" />
                    </div>
                </td>
                <td>
                    <div className='d-flex align-items-center justify-content-center gap-2'>
                        <button  
                          className='btn btn-primary' 
onClick={() => handleUpdate(data.BannerId,data.id, data.ProductName,data.Heading1, data.Heading2, 
    data.Heading3,data.ProductNewPrice,
    data.ProductOldPrice,data.ProductRating,data.DisLikes,data.Likes,data.ShortDesc,data.BannerImage)}>Edit</button>
                        <button className='btn btn-info'>View</button>
                        <button className='btn btn-danger' onClick={() => {
                            if (window.confirm('Are your Sure!')) {

                                handleDelete(data.BannerId)
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

     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='d-flex flex-column bannerform' onSubmit={handleSubmit} action="">
            <label htmlFor="">Select Product Name</label>
             <input type="text" className='form-control' placeholder='Select Product Name' value={selectedvalue}
            readOnly style={{cursor: "pointer"}} onClick={() => {setoptions(!options)}}
             onChange={handleOnchange} />
           {options &&  <ul className='list-unstyled'>
                 {productdata.length !== 0 && productdata.map((data) => (
                <li style={{cursor: "pointer"}} 
                onClick={() => handleSelectData(data.ProductName, data.ProductOldPrice , data.ProductNewPrice,
                data.ProductRating ,data.id)}>
                    {data.ProductName}</li>
            ))}             
            </ul>}
            <label className='form-label'>Heading 1</label>
            <input type="text" className='form-control' value={formfields.Heading1.toUpperCase()} name='Heading1' 
            onChange={handleOnchange}
            placeholder='ONLY 20 CHARACHTERS ARE ALLOWED'     maxLength={20} />
            <label className='form-label'>Heading 2</label>
            <input type="text"  name="Heading2" className='form-control'
             value={formfields.Heading2.toUpperCase()} onChange={handleOnchange} />
            <label className='form-label'>Heading 3</label>
            <input type="text" className='form-control' value={formfields.Heading3.toUpperCase()} name='Heading3'
            placeholder='ONLY 20 CHARACHTERS ARE ALLOWED'
             maxLength={20} onChange={handleOnchange} />
            <label className='form-label'>NewPrice</label>
            <input type="text" className='form-control' readOnly value={formfields.NewPrice} name='NewPrice' 
            onChange={handleOnchange} />
            <label className='form-label'>OldPrice</label>
            <input type="text" className='form-control' readOnly value={formfields.OldPrice} name='OldPrice' 
            onChange={handleOnchange} />
            <label className='form-label'>Rating</label>
            <input type="text" className='form-control' readOnly value={formfields.Rating} name='Rating' onChange={handleOnchange} />
            <label className='form-label'>ShortDesc</label>
            <textarea type="text" className='form-control' value={formfields.ShortDesc} name='ShortDesc' onChange={handleOnchange}
            placeholder='ONLY 480 CHARACHTERS ARE ALLOWED'
             maxLength={480} />
            <label className='form-label'>Likes</label>
            <input type="text" className='form-control' value={formfields.Likes} name='Likes' onChange={handleOnchange} />
            <label className='form-label'>DisLikes</label>
            <input type="text" className='form-control' value={formfields.DisLikes} name='DisLikes' onChange={handleOnchange} />
             <label className='form-label'>Product ID</label>
            <input type="text" className='form-control' value={formfields.ProductId} name='ProductId' onChange={handleOnchange} />
             <label className='form-label'>Select Banner Category</label>
            <select name="BannerCategory" className='form-select' value={formfields.BannerCategory} onChange={handleOnchange}  id="">
            <option value="main-slider">main-slider</option>
            <option value="singlebanner">singlebanner</option>
            <option value="smallbanner">smallbanner</option>
            <option value=""></option>
            </select>
            <input type="file" onChange={handleFile} />
            <div>
                <img src={imagepreview} alt="" />
            </div>
            <button type='submit' className='btn btn-primary w-100'>Create Banner</button>
          </form>
        </Box>
      </Modal>

       <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='d-flex flex-column bannerform' onSubmit={handleSubmit} action="">
             <input type="text" className='form-control' placeholder='Select Product Name' value={selectedvalue}
            readOnly style={{cursor: "pointer"}} onClick={() => {setoptions(!options)}}
             onChange={handleOnchange} />
           {options &&  <ul className='list-unstyled'>
                 {productdata.length !== 0 && productdata.map((data) => (
                <li style={{cursor: "pointer"}} 
                onClick={() => handleSelectData(data.ProductName, data.ProductOldPrice , data.ProductNewPrice,data.ProductRating)}>
                    {data.ProductName}</li>
            ))}             
            </ul>}
            <label className='form-label'>Heading 1</label>
            <input type="text" className='form-control' value={formfields.Heading1} name='Heading1' onChange={handleOnchange}
            placeholder='ONLY 20 CHARACHTERS ARE ALLOWED'     maxLength={20} />
            <label className='form-label'>Heading 2</label>
            <input type="text"  name="Heading2" className='form-control' placeholder='ONLY 10 CHARACHTERS ARE ALLOWED'
             maxLength={11} value={formfields.Heading2.toUpperCase()} onChange={handleOnchange} />
            <label className='form-label'>Heading 3</label>
            <input type="text" className='form-control' value={formfields.Heading3} name='Heading3'
            placeholder='ONLY 10 CHARACHTERS ARE ALLOWED'
             maxLength={11} onChange={handleOnchange} />
            <label className='form-label'>NewPrice</label>
            <input type="text" className='form-control' readOnly value={formfields.NewPrice} name='NewPrice' onChange={handleOnchange} />
            <label className='form-label'>OldPrice</label>
            <input type="text" className='form-control' readOnly value={formfields.OldPrice} name='OldPrice' onChange={handleOnchange} />
            <label className='form-label'>Rating</label>
            <input type="text" className='form-control' readOnly value={formfields.Rating} name='Rating' onChange={handleOnchange} />
            <label className='form-label'>ShortDesc</label>
            <textarea type="text" className='form-control' value={formfields.ShortDesc} name='ShortDesc' onChange={handleOnchange}
            placeholder='ONLY 480 CHARACHTERS ARE ALLOWED'
             maxLength={480} />
            <label className='form-label'>Likes</label>
            <input type="text" className='form-control' value={formfields.Likes} name='Likes' onChange={handleOnchange} />
            <label className='form-label'>DisLikes</label>
            <input type="text" className='form-control' value={formfields.DisLikes} name='DisLikes' onChange={handleOnchange} />
            <input type="file" onChange={handleFile} />
            <div>
                <img src={imagepreview} alt="" />
            </div>
            <button type='submit' className='btn btn-success w-100'>Update Banner</button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default ListBanner