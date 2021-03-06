import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link,useParams } from "react-router-dom";
import { getCategory,updateaCategory } from "./helper/adminapicall";


const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [formData, setformData] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { categoryId } = useParams();
  const { user, token } = isAuthenticated();


  useEffect(() => {
    preload(categoryId);
  }, []);

  const preload = (categoryId) => {
    getCategory(categoryId).then(data => {
        if (data.error) {
            setError(data.error);
          } else {
            setName(data.name);

          }
    }); 
  
  };
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    // alert()
    event.preventDefault();
    // setError("");
    // setSuccess(false);

    //backend request fired
    updateaCategory(categoryId, user._id, token, { name }).then(
    
        data => {
    console.log(data);
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to Update category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
