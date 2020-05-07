import React ,{useState} from 'react'
import Base from '../core/Base'

import {Link} from 'react-router-dom'
import { signup } from '../auth/helper'
const Signup = () => {

    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name,email,password,error,success}=values

    const handleChange=name=>event =>{
        console.log(event.target.value);
        
        setValues({
            ...values,error:false,[name]:event.target.value
        })

    }

    const onSubmit=(event)=>{
        event.preventDefault();
        console.log("test");
        
        setValues({
            ...values,error:false
        })

        signup({name,email,password})
        .then((response)=>{
            if(response.err)
            setValues({...values,error:response.err,success:false})
            else
            setValues({...values,  name:"",email:"",password:"",error:"",success:true})

         
        }).catch((response)=>{
            console.log(response);
            
        })
    }

    const errorAlert=()=>(
      <div className="alert alert-danger" style={{"display":(error)?"block":"none"}} role="alert">
    {error}
    </div>
    ) 
    const successAlert=()=>(
      <div className="alert alert-success" style={{"display":(success)?"block":"none"}} role="alert">
      Hey you have successfully sign up . Please <Link to ="/signin">Login</Link> Now
    </div>
    )
    const signUpForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
            {successAlert()}
            {errorAlert()}
              <form>
                <div className="form-group">
                  <label className="text-light">Name</label>
                  <input className="form-control" type="text" onChange={handleChange("name")} value={name}/>
                </div>
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input className="form-control" type="email"  onChange={handleChange("email")}  value={email} />
                </div>
    
                <div className="form-group">
                  <label className="text-light">Password</label>
                  <input className="form-control" type="password"  onChange={handleChange("password")}  value={password}/>
                </div>
                <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
              </form>
            </div>
          </div>
        );
      };
    
      return (
        <Base title="Sign up page" description="A page for user to sign up!">
          {signUpForm()}
          <div className="text-white">
          {JSON.stringify(values)}
          </div>
        </Base>
      );
}

export default Signup
