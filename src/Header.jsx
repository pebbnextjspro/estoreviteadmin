import React from 'react'
import { Link } from 'react-router'

function Header() {
  return (
  <div className='container-fluid header border'>
           <div className='row border'>
            <div className='col-sm-12 col-md-12 col-lg-12 border'>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Home Page</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/">Products&nbsp; &nbsp;</Link>
        </li>
         <li class="nav-item">
          <Link to="/categorylist">Categories &nbsp; &nbsp;</Link>
        </li>
         <li class="nav-item">
          <Link to="/subcategorylist">SubCategory</Link>
        </li>
         <li class="nav-item ms-3">
          <Link to="/navbarlist">NavBar</Link>
        </li>
         <li class="nav-item ms-3">
          <Link to="/brandlist">Brands</Link>
        </li>
         <li class="nav-item ms-3">
          <Link to="/banner">Banner</Link>
        </li>
         <li class="nav-item ms-3">
          <Link to="/pos">POS</Link>
        </li>
       
       

      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
                </div>
                </div>
                </div>
  )
}

export default Header
