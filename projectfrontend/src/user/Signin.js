import React ,{useState} from 'react'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'
import {signin,authenticate, isAuthenticated} from '../auth/helper/index'
const Signin = () => {

  const [values,setValues]=useState({
    email:"",
    password:"",
    error:"",
    loading:false,
    didRedirect:false
  })
  const {email,password,error,loading,didRedirect}=values
  const {user}=isAuthenticated()

  const handleChange=name=>event =>{
    console.log(event.target.value);
    
    setValues({
        ...values,error:false,[name]:event.target.value
    })

}

const onSubmit=(event)=>{
  event.preventDefault()
  setValues({...values,loading:true,error:false});
  signin({email,password})
  .then(data=>{
    if (data.error) {
      setValues({...values,error:data.error,loqding:false})
      
    }else{
      authenticate(data,()=>{
        setValues({...values,didRedirect:true})
      })
    }
  })
  .catch((error)=>{
    console.log(error);
    
  })
}
  const performRedirect=()=>{
    if(didRedirect){
      if(user&&user.role===1)
      return <p>Return to admin</p>
      else
      return <p>Return to user</p>
    }
    if(isAuthenticated())
    return <Redirect to ="/"></Redirect>
  }
    const errorAlert=()=>(
      <div className="alert alert-danger" style={{"display":(error)?"block":"none"}} role="alert">
    {error}
    </div>
    ) 
    const loadingMessage=()=>{
      return (
        loading&&(<div className="alert alert-info">Loading</div>)
      )
    }
    const signInForm = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
          {errorAlert()}
          {loadingMessage()}
            <form>
              <div className="form-group">
                <label className="text-light">Email</label>
                <input className="form-control" value={email} onChange={handleChange("email")} type="email" />
              </div>
  
              <div className="form-group">
                <label className="text-light">Password</label>
                <input className="form-control" type="password" value={password} onChange={handleChange("password")} />
              </div>
              <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
            </form>
          </div>
          {JSON.stringify(values)}
        </div>
      );
    };
  
    return (
      <Base title="Sign In page" description="A page for user to sign in!">
        {signInForm()}
        {performRedirect()}
       
      </Base>
    );
  };
  

export default Signin
