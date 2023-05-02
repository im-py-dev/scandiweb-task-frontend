import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ProductsPage.css";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [skusToDelete, setSkusToDelete] = useState([]);

  useEffect(() => {
    axios.get('https://scandiweb.technosteps.com/get_products.php')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleCheckboxChange = (event) => {
    const sku = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setSkusToDelete(prevSkusToDelete => [...prevSkusToDelete, sku]);
    } else {
      setSkusToDelete(prevSkusToDelete => prevSkusToDelete.filter(s => s !== sku));
    }
  }

const handleMassDeleteClick = () => {
	console.log(skusToDelete.length);
  if (skusToDelete.length > 0) {
    const formData = new FormData();
    formData.append('skusToDelete', JSON.stringify(skusToDelete));

    fetch('https://scandiweb.technosteps.com/delete_products.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
		// remove deleted products from the products array
		setProducts(prevProducts => prevProducts.filter(product => !skusToDelete.includes(product.sku)));

		// reset the skusToDelete array
		setSkusToDelete([]);
		
		// window.location.reload();
      } else {
        throw new Error('Error deleting products');
      }
    })
    .catch(err => console.log(err));
  }
}

  return (
    <div className="productsPage">
	
		<div className="row p-3 d-flex justify-content-between align-items-center">
			<h1 className="mb-3 col-sm-6 col-md-8">Products List</h1>
			<div className="col-sm-6 col-md-4">
				<a href="/add-product" type="button" className="btn btn-lg btn-dark d-none d-lg-inline-block mr-2">Add Product</a>
				<a href="/add-product" className="btn btn-lg btn-dark d-inline-block d-lg-none mr-2">Add</a>
				
				<button onClick={handleMassDeleteClick} type="button" className="btn btn-lg btn-danger d-none d-lg-inline-block">Mass Delete</button>
				<button onClick={handleMassDeleteClick} type="button" className="btn btn-lg btn-danger d-inline-block d-lg-none">Delete</button>
			</div>
		</div>
		
		<hr className="m-0 hr-border"/>
		
		<div className="container mt-4 d-flix mb-5">
			<div className="row">
			
			{products.length > 0 ? 
			products.map(product => (
				
				<div className="col-md-4 mt-5" key={product.sku}>
					<div className="card">
						<img src="https://i.tribune.com.pk/media/images/1692679-books-1524459622/1692679-books-1524459622.jpg"
						alt="#" className="card-img-top w-100"/>
						<div className="card-body">
							<div className="form-check m-2">
								<input
								type="checkbox"
								name="skusToDelete[]"
								className="delete-checkbox form-check-input form-check-input-lg"
								value={product.sku}
								onChange={handleCheckboxChange}
								checked={skusToDelete.includes(product.sku)}
								/>
								<label className="form-check-label ps-2" htmlFor="flexCheckDefault">
								Select
								</label>
							</div>
							<h2 className="card-title">Product Name</h2>
							<div className="d-flix justify-content-between">
								<p className="card-text mr-4 text-success price">$99.75</p>
							</div>
							<p className="card-text text-muted">SKU:<strong>L898H463</strong></p>
							<p className="card-text text-muted">Size:<strong>19M</strong></p>
						</div>
					</div>
				</div>
				
			)) 
			: 
			(
			<p>
			<span colSpan="4" style={{ textAlign: 'center' }}>No products found.</span>
			</p>
			)
			}
			
			</div>
		</div>
    </div>
  );
}

export default ProductList;
