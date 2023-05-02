import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
  if (skusToDelete.length > 0) {
    const formData = new FormData();
    formData.append('skusToDelete', JSON.stringify(skusToDelete));

    fetch('https://scandiweb.technosteps.com/delete_products.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        setSkusToDelete([]);
        window.location.reload();
      } else {
        throw new Error('Error deleting products');
      }
    })
    .catch(err => console.log(err));
  }
  
  //const formData = new FormData();
  //formData.append('skusToDelete', JSON.stringify(skusToDelete));
//   axios.post('https://scandiweb.technosteps.com/delete_products.php', formData)
//     .then(res => {
//       setSkusToDelete([]);
//       window.location.reload();
//     })
//     .catch(err => console.log(err));
}

  return (
    <div>
      <h1>Product List</h1>

      <div>
        <Link to="/add-product">ADD</Link>

        <button onClick={handleMassDeleteClick}>MASS DELETE</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Delete</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Size/Weight/Dimensions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map(product => (
            <tr key={product.sku}>
              <td>
                <input
                  type="checkbox"
                  name="skusToDelete[]"
                  className="delete-checkbox"
                  value={product.sku}
                  onChange={handleCheckboxChange}
                  checked={skusToDelete.includes(product.sku)}
                />
              </td>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.attribute}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
