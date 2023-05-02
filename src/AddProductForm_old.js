import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddProductForm = () => {
  const classes = useStyles();
  
  const [product, setProduct] = useState({
    sku: '',
    name: '',
    price: '',
    productType: '',
    size: '',
    weight: '',
    height: '',
    width: '',
    length: '',
  });

  const [description, setDescription] = useState('');
  
  const showMessage = (message, color = "black") => {
    const notifications = document.getElementById('notifications');
    notifications.innerText = message;
    notifications.style.color = color;
    notifications.style.display = "block";
}
  
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    
    if (name === 'productType') {
      switch (value) {
        case 'DVD':
          setDescription('Please provide size (MB)');
          break;
        case 'Book':
          setDescription('Please provide weight (Kg)');
          break;
        case 'Furniture':
          setDescription('Please provide dimensions (HxWxL in cm)');
          break;
        default:
          setDescription('');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const required_error_message = "Please, submit required data";
    const indicated_error_message = "Please, provide the data of indicated type";

    
    if (isNaN(product.price)) {
      showMessage(indicated_error_message);
      return false;
    }

    if (!product.sku || !product.name || !product.price || !product.productType) {
      showMessage(required_error_message);
      return;
    }

    switch (product.productType) {
      case "DVD":
        if (!product.size) {
          showMessage(required_error_message);
          return;
        }
        if (!/^\d+$/.test(product.size)) {
          showMessage(indicated_error_message);
          return;
        }
        break;
      case "Book":
        if (!product.weight) {
          showMessage(required_error_message);
          return;
        }
        if (!/^\d+$/.test(product.weight)) {
          showMessage(indicated_error_message, "black");
          return;
        }
        break;
      case "Furniture":
        if (!product.height || !product.width || !product.length) {
          showMessage(required_error_message);
          return;
        }
        if (!/^\d+$/.test(product.height) || !/^\d+$/.test(product.width) || !/^\d+$/.test(product.length)) {
          showMessage(indicated_error_message);
          return;
        }
        break;
    }
    
    let value;
    if (product.productType === 'DVD') {
      value = product.size;
    } else if (product.productType === 'Book') {
      value = product.weight;
    } else if (product.productType === 'Furniture') {
      value = `${product.height}x${product.width}x${product.length}`;
    }
    
    const productToSend = {
      sku: product.sku,
      name: product.name,
      price: product.price,
      productType: product.productType,
      value: value,
    };

    console.log(productToSend);

    fetch('https://scandiweb.technosteps.com/add-product/', {
      method: 'POST',
      body: JSON.stringify(productToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(result => {
            showMessage(result.message, "green");
            setTimeout(() => {
              window.location.href = '/';
            }, 500);

          });
      } else {
        return response.json()
          .then(result => {
            showMessage(result.error, "red");
          });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
    

  return (
    <div>
    <form id="product_form" method="POST" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="sku">SKU</label>
        <TextField
          id="sku"
          name="sku"
          value={product.sku}
          onChange={handleInputChange}
          margin="normal"
          required
          oninvalid="this.setCustomValidity('Please, submit required data')"
        />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <TextField
          id="name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          margin="normal"
          required
          required
          oninvalid="this.setCustomValidity('Please, submit required data')"
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <TextField
          type="number"
          min="0.01"
          step="0.01"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          margin="normal"
          required
          oninvalid="this.setCustomValidity('Please, submit required data')"
        />
      </div>
      <div>
        <FormControl margin="normal">
          <InputLabel id="productType-label">Product Type</InputLabel>
          <Select
            labelId="productType-label"
            id="productType"
            name="productType"
            value={product.productType}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="" disabled selected>Select a product type</MenuItem>
            <MenuItem value="DVD">DVD</MenuItem>
            <MenuItem value="Book">Book</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
          </Select>
          {description && (
            <div id="description">{description}</div>
          )}
        </FormControl>
      </div>
      {product.productType === 'DVD' && (
        <div>
          <label htmlFor="size">Size (MB)</label>
          <TextField
            requiredoninvalid="this.setCustomValidity('Please, submit required data')"
            name="size"
            id="size"
            value={product.size}
            onChange={handleInputChange}
          />
        </div>
      )}
      {product.productType === 'Book' && (
        <div>
          <label htmlFor="weight">Weight (Kg)</label>
          <TextField
            required
            name="weight"
            id="weight"
            value={product.weight}
            onChange={handleInputChange}
          />
        </div>
      )}
      {product.productType === 'Furniture' && (
        <>
          <div>
            <label htmlFor="height">Height (cm)</label>
            <TextField
              required
              name="height"
              id="height"
              value={product.height}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="width">Width (cm)</label>
            <TextField
              required
              name="width"
              id="width"
              value={product.width}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="length">Length (cm)</label>
            <TextField
              required
              name="length"
              id="length"
              value={product.length}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
<Button type="submit" variant="contained" color="primary">Save</Button>
        
<Button type="button" 
  onClick={() => window.location.href = '/'}
  color="secondary">
  Cancel
</Button>
    <div id="notifications"></div>
    </form>
</div>
  );
};

export default AddProductForm;
