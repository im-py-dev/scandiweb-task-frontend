import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";


const AddProduct = () => {
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

  const inputs = [
    {
      id: "sku",
      name: "sku",
      type: "text",
      placeholder: "SKU",
      label: "SKU",
      pattern: "^[^\s]+$",
	  errorMessage: "Please Enter SKU",
      required: true,
    },
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
	  errorMessage: "Please Enter Name",
      required: true,
    },
    {
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Price",
      label: "Price (USD)",
	  min: "0.01",
      step: "0.01",
	  errorMessage: "Please Enter Price",
	  required: true,
    },
  ];


const showMessage = (message, color = "black") => {
    const notifications = document.getElementById('notifications');
    notifications.innerText = message;
    notifications.style.color = color;
    notifications.style.display = "block";
}

const handleInvalid = (e) => {
	const input = e.target;
	console.log(input.validity);
	if (input.validity.patternMismatch || input.validity.badInput || input.validity.rangeUnderflow) {
	  input.setCustomValidity("Please, provide the data of indicated type");
} else if (input.validity.valueMissing) {
	  input.setCustomValidity("Please, submit required data");
}

}

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
            }, 700);

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

  const onChange = (e) => {
	const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
	document.getElementById('notifications').innerText = "";
	
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

  return (
    <div className="Test">

		<div className="container">
			<div className="row justify-content-center">
			<div className="col-sm-12 col-md-8 my-4">
	  <form id="product_form" className="w-100 p-4 border rounded" onSubmit={handleSubmit}>
        <h2>
			<div className="text-center mb-4">
				Add Product
			</div>
		</h2>

		<div className="row">
			<div className="col">
				<FormInput
				id="sku"
				name="sku"
				type="text"
				placeholder="SKU"
				label="SKU"
				pattern="^[^\s]+$"
				onChange={onChange}
				onInvalid={handleInvalid}
				onInput={(e) => e.target.setCustomValidity("")}
				required
				value={product.sku}
				/>
			</div>
			
			<div className="col">
				<FormInput
				id="name"
				name="name"
				type="text"
				placeholder="Name"
				label="Name"
				onInvalid={handleInvalid}
				onInput={(e) => e.target.setCustomValidity("")}
				required
				value={product.name}
				onChange={onChange}
				/>
			</div>
		</div>
		
		<div className="row">
			<div className="col">
				<FormInput
				id="price"
				name="price"
				type="number"
				placeholder="Price"
				label="Price (USD)"
				pattern="^[1-9][0-9]*(\.[0-9]+)?$"
				onInvalid={handleInvalid}
				onInput={(e) => e.target.setCustomValidity("")}
				errorMessage="Please Enter Price"
				min="0.01"
				step="0.01"
				required
				value={product.price}
				onChange={onChange}
				/>
			</div>
			
			<div className="col">
				<div className="input-group mb-2">
					<label className="input-group-text" htmlFor="productType">Product Type</label>
					<select className="form-select"
					id="productType"
					name="productType"
					value={product.productType}
					onChange={onChange}
					required>
						<option value="" disabled>Select a product type</option>
						<option value="DVD">DVD</option>
						<option value="Book">Book</option>
						<option value="Furniture">Furniture</option>
					</select>
                </div>
            </div>
			{description && (
					<div className="text-center mb-2 mt-2" id="description">{description}</div>
          )}
		  
		</div>
	  
	  {product.productType === 'DVD' && (
        <div>
          <FormInput
			type="number"
			name="size"
            id="size"
            value={product.size}
            onChange={onChange}
			placeholder="Size (MB)"
			label="Size (MB)"
			errorMessage="Please Enter Size"
			required
			min="1"
			step="1"
			onInvalid={handleInvalid}
			onInput={(e) => e.target.setCustomValidity("")}
          />
        </div>
      )}
      {product.productType === 'Book' && (
        <div>
          <FormInput
		  type="number"
			name="weight"
            id="weight"
            value={product.weight}
            onChange={onChange}
			placeholder="Weight (Kg)"
			label="Weight (Kg)"
			errorMessage="Please Enter Weight"
			required
			min="1"
			step="1"
			onInvalid={handleInvalid}
			onInput={(e) => e.target.setCustomValidity("")}
          />
        </div>
      )}
      {product.productType === 'Furniture' && (
        <>
          <div>
            <FormInput
			type="number"
			name="height"
            id="height"
            value={product.height}
            onChange={onChange}
			placeholder="Height (cm)"
			label="Height (cm)"
			errorMessage="Please Enter Height"
			onInvalid={handleInvalid}
			onInput={(e) => e.target.setCustomValidity("")}
			required
			min="1"
			step="1"
          />

          </div>
          <div>
            <FormInput
			type="number"
			name="width"
            id="width"
            value={product.width}
            onChange={onChange}
			placeholder="Width (cm)"
			label="Width (cm)"
			errorMessage="Please Enter Width"
			onInvalid={handleInvalid}
			onInput={(e) => e.target.setCustomValidity("")}
			required
			min="1"
			step="1"
          />
          </div>
          <div>
            <FormInput
			type="number"
			name="length"
            id="length"
            value={product.length}
            onChange={onChange}
			placeholder="Length (cm)"
			label="Length (cm)"
			errorMessage="Please Enter Length"
			onInvalid={handleInvalid}
			onInput={(e) => e.target.setCustomValidity("")}
			required
			min="1"
			step="1"
          />
          </div>
        </>
      )}

		<div className="gap-2 mt-4">
			<button type="submit" className="save-btn btn btn-lg">Save</button>

			<button type="button" className="cancel-btn btn btn-outline-danger btn-lg border-2"
			onClick={() => { window.location.href = "/"; }}>Cancel</button>
        </div>
		<div id="notifications"></div>
      </form>
    </div>
    </div>
    </div>
	

		  
	</div>
  );
};

export default AddProduct;
