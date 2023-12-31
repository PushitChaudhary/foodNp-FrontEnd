import React from 'react'
import './registration.css'
import {useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'


function Registration() {

    const backend = "6LcNT_coAAAAAPfwNaCKOMBTVUwzuPAQVDx2E_OK"
    const sitekey = "6LcNT_coAAAAAA_PltvSkI8tXWOIOTdWWdWFPGU7"

    const [email, setEmail ] = useState('')
    const [name, setName ] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [recaptcha , setRecaptcha] = useState('')

    

    const submitData = async (e)=>{
        e.preventDefault()

        const data = {
            userEmail : email,
            userName : name,
            userPassword : password,
            userPhone : phone,
            recaptchaValue : recaptcha
        }


        axios.post('http://localhost:4000/user', data)
        .then((response) => {
          if (response.status === 200) {
            alert('User created');
          } else {
            alert('User creation failed');
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert(error.response.data.message);  // database baat pathayer error show hunxha
          } else {
            console.error('Error:', error);
            alert('Network Error: ' + error.message);
          }
        });





        // console.log(data)
    
        // const response = await axios.post('http://localhost:4000/user', data)

        // console.log(response)

        // if( response.status == 204){
        //    return alert('khali')
        // //    return alert('field khali')
        // }
        // if (response.status == 200) {
        //     alert('User created');
        // } else {
        //     alert('User creation failed');
        // }

// -------------------------------------

        // .then((response) => {
        //     console.log('Response:', response);

        //     if(response.status == 404){
        //         alert('Field are required')
        //     }

        //     if (response.status == 200) {
        //         alert('User created');
        //     } else {
        //     alert('User creation failed');
        //     }
        // })
        // .catch((error) => {
        //     console.log('Error:', error);
        //     alert('Error: ' + error.message);
        // });


    }

    
    const onChange = (value)=>{
        setRecaptcha(value)
    }

  return (
    <>
        <body>
            <div className="container">
                <form onSubmit={submitData}  method='post'>
                    <h2 className='Registration'>Registration Form</h2>
                    <div className="form-group">
                        <label htmlFor="userEmail">Email</label>
                        <input type="email" id="userEmail" name="userEmail" onChange={(e)=>{ setEmail(e.target.value) }}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">Name</label>
                        <input type="text" id="userName" name="userName" onChange={(e)=>{ setName(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input type="password" id="userPassword" name="userPassword" onChange={(e)=>{ setPassword(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPhone">Phone</label>
                        <input type="tel" id="userPhone" name="userPhone" onChange={(e)=>{ setPhone(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <ReCAPTCHA 
                            sitekey = {sitekey}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <a href="/login">Already have an account?</a>
            </div>
        </body>
    </>
  )
}

export default Registration
