import React,{ useState } from 'react'
import { handleRegistration } from '../auth'
import './Register.css'

const Register = () => {

  const [formdata,setformdata]=useState({
    name:'',
    email:'',
    password:'',
    phoneNumber:'',
  });

  const [message,setmessage] = useState('');
  
  const handleChange = (e) => {
    const {name,value} =e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const additionalDetails = {
      name: formdata.name,
      phoneNumber:formdata.phoneNumber,
      isAdmin:true,
    };
     try {
      await handleRegistration(formdata.email,formdata.password,additionalDetails);
      const userId=await handleRegistration(formdata.email,formdata.password,additionalDetails);
      if(userId)
      setmessage('Registration successful! ');
      setmessage('User already exists. Please login. ');
     } catch(error) {
      setmessage('Registration failed. Please try again. ');
      console.error(error);
     }
  };

  return (
   <div className="registration-container">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <div className="formgroup">
        <label htmlFor='name'>Name</label>
        <input 
            type='text'
            id='name'
            name='name'
            value={formdata.name}
            onChange={handleChange}
            required
        />
      </div>
      <div className="formgroup">
        <label htmlFor="email">Email</label>
        <input
         type="email" 
         id='email'
         name='email'
         value={formdata.email}
         onChange={handleChange}
         required
         />
      </div>
      <div className="formgroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formgroup">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formdata.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='register-btn'>Register</button>
    </form>
    {message && <p className ="message">{message}</p>}
   </div>
  )
}

export default Register;