
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProductView from './assets/Products/ProductView'
import CategoryList from './assets/Categories/CategoryList'
import Header from './Header'
import SubCategoryList from './assets/SubCategories/SubCategoryList';
import NavBarList from './assets/Navbar/NavBarList';
import BrandList from './Brands/BrandList';
import BrandCreate from './Brands/BrandCreate';
import BrandEdit from './Brands/BrandEdit';
import ProductCreate from './assets/Products/ProductCreate';
import ProductUpdate from './assets/Products/ProductUpdate';
import Pro2 from './assets/Products/Pro2';
import ProUp2 from './assets/Products/ProUp2';
import NewCategoryList from './assets/NewCategory/NewCategoryList';
import CreateCategory from './assets/NewCategory/CreateCategory';
import UpdateCategory from './assets/NewCategory/UpdateCategory';
import SubCategoryCreate from './assets/SubCategories/SubCategoryCreate';
import SubCategoryUpdate from './assets/SubCategories/SubCategoryUpdate';
import Test from './assets/Test/Test';
import CreateUserComponent from './assets/Test/CreateUserComponent';
import UpdateUserComponent from './assets/Test/UpdateUserComponent'
import ListBanner from './assets/Banner/ListBanner';
import { createContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import POS from './assets/POS/POS';
import UpdateBanner from './assets/Banner/UpdateBanner';


export const MyContext = createContext();

function App() {

  const [loader , setloader] = useState(false);


  const values = {loader , setloader}

  return (
    <>
   <MyContext.Provider value={values}>
     <div className='container-fluid border'>
      {loader &&  <div className='d-flex align-items-center justify-content-center' 
       style={{position: "absolute" , zIndex: 1 , background: "rgba(0,0,0,0.8)" , width: "100%", height: "100%"}}>
        <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
       </div>}
      <Header/>
      <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/productview" exact={true} element={<ProductView />} />
            <Route path="/productcreate" exact={true} element={<ProductCreate />} />
            <Route path="/categorylist" exact={true} element={<NewCategoryList />} />
            <Route path="/subcategorylist" exact={true} element={<SubCategoryList />} />
            <Route path="/navbarlist" exact={true} element={<NavBarList/>} />
            <Route path="/brandlist" exact={true} element={<BrandList/>} />
            <Route path="/brandcreate" exact={true} element={<BrandCreate/>} />
            <Route path="/brandedit" exact={true} element={<BrandEdit/>} />
            <Route path="/test" exact={true} element={<Test/>} />
            <Route path="/productupdate" exact={true} element={<ProductUpdate/>} />
            <Route path="/createcategory" exact={true} element={<CreateCategory/>} />
            <Route path="/updatecategory" exact={true} element={<UpdateCategory/>} />
            <Route path="/subcategorycreate" exact={true} element={<SubCategoryCreate/>} />
            <Route path="/subcategoryupdate" exact={true} element={<SubCategoryUpdate/>} />
            <Route path="/createuser" exact={true} element={<CreateUserComponent/>} />
            <Route path="/updateuser" exact={true} element={<UpdateUserComponent/>} />
            <Route path="/banner" exact={true} element={<ListBanner/>} />
            <Route path="/updatebanner" exact={true} element={<UpdateBanner/>} />
            <Route path="/pos" exact={true} element={<POS/>} />
            
      </Routes>
    </div>
   </MyContext.Provider>
    </>
  )
}

export default App
