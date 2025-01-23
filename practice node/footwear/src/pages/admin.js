import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const navigate = useNavigate(); // useNavigate hook should be called at the top level
  const [allproduct, setAllproduct] = useState([])

  const isloggedin = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
    else {
      navigate('/admin')
    }
  }
  
  useEffect(()=>{
    isloggedin()
  } , [])

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
    window.location.reload()
  }


  useEffect(() => {
    console.log("useEffect triggered"); // Check if useEffect itself is re-triggering
    const fetchProduct = async () => {
      try {
        const rawdt = await fetch('http://localhost:4000/admin', {
          credentials: 'include', // Include cookies with the request
        });

        if (!rawdt.ok) {
          const errorText = await rawdt.text(); // Get error as text if response is not OK
          throw new Error(errorText);
        }

        const dt = await rawdt.json(); 
        setAllproduct(dt);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      }
    };

    fetchProduct();
  }, []);

  const [productImg, setProductImg] = useState(null);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('img', productImg); // Must match the name in backend `upload.single('img')`
    formData.append('pid', productId);
    formData.append('pname', productName);
    formData.append('pprice', productPrice);

    try {
      // Send form data with Axios
      const response = await Axios.post('http://localhost:4000/admin/addproducts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Include cookies for authentication
      });

      
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
    window.location.reload()
  };

  const handleDelete = async (pid) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/deleteproducts/${pid}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setAllproduct((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
        alert('Product deleted successfully')
        window.location.reload()
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
    
  };
  return (
    <>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <a className="navbar-brand brand-logo" href="index.html"><h2>Admin Pannel</h2></a>
          <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets1/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-menu"></span>
          </button>

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="nav-profile-img">
                  <img src="assets1/images/faces/face1.jpg" alt="image" />
                  <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">David Greymaax</p>
                </div>
              </a>
              <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                <a className="dropdown-item" href="#">
                  <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <i className="mdi mdi-logout me-2 text-primary"></i> Signout </a>
              </div>
            </li>
            <li className="nav-item nav-profile dropdown">
              <button style={{ padding: '0.5vw 1vw', backgroundColor: '#40D2BE', borderRadius: '20px', color: '#fff', border: 'none', fontWeight: '800' }} onClick={logout} >Logout</button>
            </li>

          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      {/* <!-- partial --> */}
      <div className="container-fluid page-body-wrapper">
        {/* <!-- partial:partials/_sidebar.html --> */}
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item nav-profile">
              <a href="#" className="nav-link">
                <div className="nav-profile-image">
                  <img src="assets1/images/faces/face1.jpg" alt="profile" />
                  <span className="login-status online"></span>
                  {/* <!--change to offline or busy as needed--> */}
                </div>
                <div className="nav-profile-text d-flex flex-column">
                  <span className="font-weight-bold mb-2">David Grey. H</span>
                  <span className="text-secondary text-small">Project Manager</span>
                </div>
                <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                <span className="menu-title">Dashboard</span>
                <i className="mdi mdi-home menu-icon"></i>
              </a>
            </li>


          </ul>
        </nav>
        {/* <!-- partial --> */}
        <div className="main-panel">
          <div className="content-wrapper">


            <div className="row">
              <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-danger card-img-holder text-white">
                  <div className="card-body">
                    <img src="assets1/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                    <h4 className="font-weight-normal mb-3">Weekly Sales <i className="mdi mdi-chart-line mdi-24px float-end"></i>
                    </h4>
                    <h2 className="mb-5">$ 15,0000</h2>
                    <h6 className="card-text">Increased by 60%</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-info card-img-holder text-white">
                  <div className="card-body">
                    <img src="assets1/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                    <h4 className="font-weight-normal mb-3">Weekly Orders <i className="mdi mdi-bookmark-outline mdi-24px float-end"></i>
                    </h4>
                    <h2 className="mb-5">45,6334</h2>
                    <h6 className="card-text">Decreased by 10%</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-success card-img-holder text-white">
                  <div className="card-body">
                    <img src="assets1/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                    <h4 className="font-weight-normal mb-3">Visitors Online <i className="mdi mdi-diamond mdi-24px float-end"></i>
                    </h4>
                    <h2 className="mb-5">95,5741</h2>
                    <h6 className="card-text">Increased by 5%</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Add Product</h4>

                  <form class="forms-sample" onSubmit={handleSubmit} encType="multipart/form-data" >
                    <div class="form-group">
                      <label for="exampleInputName1">ProductImg</label>
                      <br />
                      <input type="file" onChange={(e) => setProductImg(e.target.files[0])} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputName1">ProductId</label>
                      <input type="text" class="form-control" id="exampleInputName1" value={productId}
                        onChange={(e) => setProductId(e.target.value)} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">ProductName</label>
                      <input type="text" class="form-control" id="exampleInputEmail3" value={productName}
                        onChange={(e) => setProductName(e.target.value)} />
                    </div>

                    <div class="form-group">
                      <label for="exampleSelectGender">ProductPrice</label>
                      <input type="number" class="form-control" id="exampleInputEmail3" value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)} />
                    </div>



                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>

                  </form>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Recent Tickets</h4>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th> Prouct Image </th>
                            <th> Prouct Id </th>
                            <th> Product Name </th>
                            <th> Product Price </th>
                            <th> Delete</th>
                            <th> Edit</th>

                          </tr>
                        </thead>
                        <tbody>
                          {allproduct.map((product) => (
                            <tr key={product._id}> {/* Use a unique key for each product */}
                              <td>
                                <img src={`/uploads/${product.productImg}`} className="me-2" alt="product" /> {/* Replace with product image if available */}
                                {product.productName}
                              </td>
                              <td>{product.productId}</td>
                              <td>
                                {product.productName}
                              </td>
                              <td>{product.productPrice}</td>
                              <td><button
                                className="btn btn-danger py-2 px-3 rounded-pill"
                                onClick={() => handleDelete(product._id)}
                              >Delete</button></td>
                              <td><button className='btn btn-primary py-2 px-3' id={product.productId}  onClick={(e)=>{ 
                                const pid = e.target.id ;
                                localStorage.setItem('productId', pid)
                                navigate('/adminedit')}}>Edit</button></td>

                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>

        </div>

      </div>


    </>
  )
}

export default Admin