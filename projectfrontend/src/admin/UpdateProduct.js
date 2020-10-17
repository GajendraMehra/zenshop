import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link,useParams } from "react-router-dom";
import { getCategories,getProduct,createaProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = () => {
  const { user, token } = isAuthenticated();
  const { productId } = useParams();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;
  const successMessage = () => {
    if (createdProduct) {
      return <h4 className="text-success">{createdProduct} created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };
  const preloadCategories=()=>{
    getCategories().then(data => {
     
        if (data.error) {
          setValues({ ...values, error: data.error });
          return false
        } else {
          console.log(values);
          setValues({ ...values, categories: data.categoriess,formData:new FormData()});
          return true
        }
      }); 
  }
  const preload = (productId) => {
    getProduct(productId).then(data => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, 
            name: data.produdct.name, 
            price: data.produdct.price,
            description: data.produdct.description,
            stock: data.produdct.stock,
            // // stock: data.produdct.stock,
            category: data.produdct.category,
            formData: new FormData()
           
        });
        // preloadCategories()
       
         
       
    

      }
    }); 
  
  };

  useEffect(() => {
    preload(productId);
  }, []);

  const onSubmit = (event) => {
    //
    event.preventDefault();
  
// console.log({...values});
console.log(formData);
    //backend request fired
    createaProduct(user._id, token, formData).then(data => {
    
      
      if (data.error) {
        setValues({ ...values, error: data.error });
       
      } else {
        setValues({ ...values, createdProduct: data.product.name,  });
       
      }
    });
  };

  const handleChange = name => event => {

    // console.log(event.target.files[0]);
    
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
   
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
        {successMessage()}
        {warningMessage()}
        {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
