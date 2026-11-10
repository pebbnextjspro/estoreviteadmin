import React, { useEffect, useState , useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router'
import axiosInstance from '../../api/axiosInstance';
import Rating from '@mui/material/Rating';
import { TbSquareRounded } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Button from '@mui/material/Button';
import { HiH1 } from 'react-icons/hi2';
import JoditEditor from 'jodit-react';






function ProductCreate() {

  const editor = useRef(null);
  // const config = useMemo(() => ({
	// 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
	// 		placeholder: placeholder || 'Start typings...'
	// 	}),
	// 	[placeholder]
	// );


  const [listcategory , setlistcategory] = useState([]);
  const [listsubcategory , setlistsubcategory] = useState([]);
  const [listbrand , setlistbrand] = useState([]);
  const [rating , setrating] = useState(1);
  const [activecolorpicker , setactivecolorpicker] = useState(false)
  const [listprodata , setlistprodata] = useState([]);
  const [loading , setloading] = useState(false);

  const GetProData = () => {

   axiosInstance.get('/api/admin/products/product-list').then((res) => {

    setlistprodata(res.data.Data)
   })
    
  }

  const handleDuplicate = (productname) => {

    const duplicatevalue = listprodata.some((data) => (data.ProductName === productname))

    if (duplicatevalue) {

      alert('Product Already Exist');
      setformfields((prev) => ({
        ...prev , ProductName: ''

      }))
    }
  }


   const [images , setimages] = useState([]);
    const [imagespreview , setimagespreview] = useState([]);
    




  const colors = [
  // Red
  "red", "darkred", "firebrick", "crimson", "indianred",

  // Orange
  "orange", "darkorange", "coral", "tomato", "orangered",

  // Yellow
  "yellow", "gold", "khaki",

  // Green
  "green", "darkgreen", "lime", "limegreen", "seagreen", "forestgreen", "olive",

  // Blue
  "blue", "navy", "royalblue", "dodgerblue", "skyblue", "deepskyblue", "steelblue",

  // Purple
  "purple", "indigo", "violet", "darkviolet", "mediumorchid",

  // Brown
  "brown", "saddlebrown", "sienna", "chocolate", "peru",

  // Black / Gray / White
  "black", "dimgray", "gray", "darkgray", "silver", "lightgray", "gainsboro", "white",

  // Pink
  "pink", "lightpink", "hotpink", "deeppink", "palevioletred"
];


  const onChangeRating = (e) => {

    setformfields((prev) => ({

      ...prev , ProductRating: e.target.value
    }))   
  }


  const GetBrands = () => {

    axiosInstance.get('/api/admin/brand/brand-list').then((res) => {

      setlistbrand(res.data.Data)
    })
  }



  const GetCategory = () => {

    axiosInstance.get('/api/admin/category/category-list').then((res) => {

      setlistcategory(res.data.Data);
    })
  }





    const navigation = useNavigate()

   const [formfields, setformfields] = useState({
  ProductName: '',
  ProductDescription: '',
  ProductCategory: '',
  ProductSubCategory: '',
  ProductBrand: '',
  ProductNewPrice: '',
  ProductOldPrice: '',
  ProductsInStock: '',
  ProductRating: '',
  ProductColor: 'Select Color',
  ProductImages4: '',
  IsFeatured: '',
  ProductWeight: '',
  ProductShipCharges: ''
});


    const handleFiles = (e) => {

  const files = e.target.files;

     setimages((prev) => ([
  ...prev , ...files
 ]))

}

  const GetSubCategory = () => {

    axiosInstance.get(`/api/admin/subcategory/subcategory-listbycatid/${formfields.ProductCategory}`).then((res) => {

      setlistsubcategory(res.data.Data);
    })
    
  }

    useEffect(() => {

    GetCategory();
    GetBrands();
    GetProData();   

  },[])



    const handleChange = (e) => {

        const value = e.target.value;
        const name = e.target.name;

        setformfields((prev) => ({

            ...prev , [name]:value
        }))
    }

     const handleSelectColor = (color) => {

      setformfields((prev) => ({
        ...prev , ProductColor: color
      }))
    }

    const handleDeleteImage = (picture) => {

      const filterdata = images.filter((data) => {

        return data !== picture
      })

      setimages(filterdata)
    }

  //  const handleFilesNew = (e) => {

  //   const files = e.target.files;

  //   setimages((prev) => ([
  //     ...prev , ...files
  //   ]))

  //  }

  const handleChangeEditor = (e) => {

    setformfields((prev) => ({
      ...prev , ProductDescription: e
    }))
  }

  console.log(formfields);

    const handleSubmit = async (e) => {

      e.preventDefault();
      
      setloading(true)

      try {

        if (formfields.IsFeatured === "Is Featured") {

          alert("Please Select Is Featured of Not");
          return;
        }


        const formdata = new FormData();

        formdata.append("ProductName" , formfields.ProductName);
        formdata.append("ProductDescription" , formfields.ProductDescription);
        formdata.append("ProductCategory" , formfields.ProductCategory)
        formdata.append("ProductSubCategory" , formfields.ProductSubCategory)
        formdata.append("ProductBrand" , formfields.ProductBrand)
        formdata.append("ProductNewPrice" , formfields.ProductNewPrice)
        formdata.append("ProductOldPrice" , formfields.ProductOldPrice)
        formdata.append("ProductsInStock" , formfields.ProductsInStock)
        formdata.append("ProductRating" , formfields.ProductRating)
        formdata.append("ProductColor" , formfields.ProductColor)
        formdata.append("IsFeatured" , formfields.IsFeatured)
        formdata.append("ProductWeight" , formfields.ProductWeight)
        formdata.append("ProductShipCharges" , formfields.ProductShipCharges)


        images.forEach((files) => (
          formdata.append("images" , files)
        ))

        const res = await axiosInstance.post('/api/admin/products/product-create' , formdata);

        if (res.data.success) {

          alert(res.data.msg);
          navigation('/')          
        } else {

          alert(res.data.msg);
        }
        
      } catch (error) {

        if (error.response) {

          alert(error.response.data.msg);

        } else {

          alert('Server is Not responding');
        }
        
      } finally{

        setloading(false)
      }

    }

   
  return (
    <>  
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
        <form onSubmit={handleSubmit}>

  {/* Product ID */}
  <div className="row">
    <div className="col-12">
      <label className="form-label">Product ID</label>
      <input type="text" className="form-control" readOnly />
    </div>
  </div>

  {/* Product Name */}
  <div className="row mt-3">
    <div className="col-12">
      <label className="form-label">Product Name</label>
      <input
        type="text"
        name="ProductName"
        value={formfields.ProductName}
        onChange={handleChange}
        className="form-control"
        // onBlur={() => handleDuplicate(formfields.ProductName)}
      />
    </div>
  </div>

  {/* Description */}
  <div className="row mt-3">
    <div className="col-12">
      <label className="form-label">Product Description</label>
       <JoditEditor
			ref={editor}
			value={formfields.ProductDescription}
			// config={config}
			tabIndex={1} // tabIndex of textarea
			 // onBlur={newContent => setContent(newContent)} 
			onChange={newContent => handleChangeEditor(newContent)}
		/>
      {/* <JoditEditor
			ref={editor}
			value={formfields.ProductDescription}
			// config={config}
			tabIndex={1} // tabIndex of textarea
			 // onBlur={newContent => setContent(newContent)} 
			onChange={handleChangeEditor}
		/> */}
      {/* <textarea
        name="ProductDescription"
        value={formfields.ProductDescription}
        onChange={handleChange}
        className="form-control"
        required
      /> */}
    </div>
  </div>

  {/* Category */}
  <div className="row mt-3">
    <div className="col-6">
     <select value={formfields.ProductCategory} name='ProductCategory' 
     onChange={handleChange} onClick={() => {GetSubCategory();}} class="form-select" aria-label="Default select example">
  <option selected>Select Category</option>
  {
    listcategory?.length !== 0 && listcategory?.map((data) => (
      <option value={data.id}>{data.CategoryName}</option>
    ))
  }
</select>
    </div>

    <div className="col-6">
       <select value={formfields.ProductSubCategory} name='ProductSubCategory'
     onChange={handleChange} class="form-select" aria-label="Default select example">
  <option selected>Select Sub Category</option>
  {
    listsubcategory?.length !== 0 && listsubcategory?.map((data) => (
      <option value={data.id}>{data.SubCategory}</option>
    ))
  }
</select>
    </div>
  </div>

  {/* Brand */}
  <div className="row mt-3">
    <div className="col-6">
         <select value={formfields.ProductBrand} name='ProductBrand'
     onChange={handleChange} class="form-select" aria-label="Default select example">
  <option selected>Select Brands</option>
  {
    listbrand?.length !== 0 && listbrand?.map((data) => (
      <option value={data.BrandId}>{data.BrandName}</option>
    ))
  }
</select>
    </div>

     <div className="col-6">
         <select value={formfields.IsFeatured} name='IsFeatured'
     onChange={handleChange} class="form-select" aria-label="Default select example">
  <option selected>Is Featured</option>
 <option value={1}>YES</option>
 <option value={0}>NO</option>
</select>
    </div>
  </div>

  {/* Prices */}
  <div className="row mt-3">
    <div className="col-6">
      <label className="form-label">New Price</label>
      <input
        type="number"
        name="ProductNewPrice"
        value={formfields.ProductNewPrice}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="col-6">
      <label className="form-label">Old Price</label>
      <input
        type="number"
        name="ProductOldPrice"
        value={formfields.ProductOldPrice}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
  </div>

   <div className="row mt-3">
    <div className="col-6">
      <label className="form-label">Product Weight</label>
      <input
        type="number"
        name="ProductWeight"
        value={formfields.ProductWeight}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="col-6">
      <label className="form-label">Shipping Charges</label>
      <input
        type="number"
        name="ProductShipCharges"
        value={formfields.ProductShipCharges}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
  </div>

  {/* Stock & Rating */}
  <div className="row mt-3">
    <div className="col-12">
      <label className="form-label">Stock</label>
      <input
        type="number"
        name="ProductsInStock"
        value={formfields.ProductsInStock}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

   
  </div>

   <div className="row mt-3">
 <div className="col-12 border d-flex align-items-center justify-content-center gap-5">
     <span>Select Rating</span>
       <Rating
        name="simple-controlled"
        value={formfields.ProductRating}
        onChange={onChangeRating}
        size='large'
        style={{fontSize: "40px"}}
        
      />
    </div>
   </div>

   <div className="row mt-3">
    <div className="col-12 d-flex flex-wrap gap-2 position-relative">
      <input type="text" className='form-control' onClick={() => setactivecolorpicker(!activecolorpicker)}
       value={formfields.ProductColor} style={{background: formfields.ProductColor , cursor: "pointer" ,
       color: formfields.ProductColor === 'white' ? "#000" : formfields.ProductColor === 'Select Color' ? "#000" : "#fff",
        caretColor: "transparent" , textAlign: "center" ,
       textTransform: "capitalize"}} />
      <div className={`colorcontainer ${activecolorpicker ? 'active' : ''}`}>
        {
        colors.map((color) => (
          <div onClick={() => {handleSelectColor(color); setactivecolorpicker(false)}} 
          style={{width: "50px" , height: "50px" , border: "1px solid rgba(0,0,0,0.2)" , 
          borderRadius: "50%", background: color , cursor: "pointer"}}>
      </div>
        ))
      }
      </div>
      </div>
    </div>


  {/* Images */}
 
 <div className="row mt-3">
    <div className="col-12 productimage d-flex flex-wrap gap-3">
     {
      images?.length !== 0 && images.map((pictures , index) => (
        <div className='imagewrapper' key={index}>
  <img src={URL.createObjectURL(pictures)} alt="" />
  <div className='crossbtn'>
<RxCross1 onClick={() => handleDeleteImage(pictures)}/>
  </div>
     </div>
      ))
     }

<div className='imagewrapper d-flex' style={{cursor: "pointer" ,position: "relative" }}>
  <input type="file" accept="image/png, image/jpeg, image/jpg , image/webp" onChange={handleFiles}
  multiple  style={{height: "100%", width: "100%" , 
   opacity: "0", cursor: "pointer" , border: "1px solid black" , zIndex: "100" , position: "absolute"  }} />
   <FaRegImages  style={{width: "100%" , height: "100%", padding: "50px"}}/>
     </div>

     {
      images.length > 1 &&  <div className='deletewrapper'>
  <Button onClick={() => setimages([])}>Delete All</Button>
     </div>
     }

    </div>
  </div>

  {/* <input type="file" multiple onChange={handleFilesNew} /> */}

  {/* Submit */}
  <div className="row mt-4">
    <div className="col-12">
      <button type="submit" className="btn btn-success w-100">
        Create Product
      </button>
    </div>
  </div>

</form>
 
            </div>
        </div>
    </div>
        {loading && <h1>Loading...</h1>}
    </>
  )
}

export default ProductCreate