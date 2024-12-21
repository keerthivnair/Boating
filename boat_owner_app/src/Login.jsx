import React,{ useState } from 'react'
import { loginUser } from '../auth'
import './Register.css'


const Login = () => {

    const[formdata,setformdata] =useState({
         email:'',
         password:'',
    });

    const [message,setmessage]=useState('')

    const handleChange = (e) => {
        const {name,value} = e.target;
        setformdata((prevdata) => ({
            ...prevdata,
            [name]:value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await loginUser(formdata.email,formdata.password);
            const userId= await loginUser(formdata.email,formdata.password);
            if(userId) setmessage('Login successful! ');
            else setmessage('Login failed.');
        }catch(error) {
            setmessage('Login failed. Please register');
            console.error(error);
        }
    };


  return (
    <div className="registration-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
        <button type='submit' className='register-btn'>Login</button>
        </form>
        {message && <p className ="message">{message}</p>}
    </div>
  )
}

export default Login
