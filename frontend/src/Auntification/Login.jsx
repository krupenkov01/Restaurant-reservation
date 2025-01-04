import { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 
function Login() {

  

  // login logic

  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')


  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()){
      // console.log('proceed')
      fetch("http://localhost:3000/user/" + username).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp)
        if(Object.keys(resp).length === 0){
          toast.error('Please enter valid username');
        } else {
          if(resp.regpass === password) {
            toast.success('Success')
            navigate('/')
          } else {
            console.log(password)
            toast.error('Please enter valid credential');
          }
        }
      }).catch((err) => {
        toast.error('Login fail due to:'+ err.message);
      })
    }
  }

  const validate = () => {
    let result = true;

    if(username === '' || username === null){
      result = false;
      toast.warning('Please Enter username')
      }

    if(password === '' || password === null){
      result = false;
      toast.warning('Please Enter password')
    }

    return result;
  }

  function SwitchContent(){
    const content = document.getElementById('content')
    const registerBtn = document.getElementById('register')
    const loginBtn = document.getElementById('login')

    registerBtn.addEventListener('click', () => {
      content.classList.add("active")
    });
    loginBtn.addEventListener('click', () => {
      content.classList.remove("active")
    })
  }

    // Reg logic
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')      //ТУТ КОРОЧЕ СЕТТЕРЫ ПАРОЛЕЙ РАЗНЫЕ
  const [regpass, setRegPass] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate();

  const isValidate = () => {
    let isproseed = true;
    let errormessage = 'Please enter value in '

    if(id == null || id == ''){
      isproseed = false;
      errormessage += 'UserName'
    }

    if(email == null || email == ''){
      isproseed = false;
      errormessage += ' Email'
    }

    if(regpass == null || regpass == ''){
      isproseed = false;
      errormessage += ' Password'
    }

    if(!isproseed){
      toast.error(errormessage)
    } else{
      if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

      }else{
        isproseed = false;
        toast.warning('Please enter the valid email')
      }
    }

    return isproseed;
  }


  const handleSubmit = (e) => {
    

    
    e.preventDefault();

    
    let regObj = {id, email, regpass, role};
    //console.log(regObj)
    if(isValidate()){
    fetch("http://localhost:3000/user", {
      method: 'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(regObj)
    }).then((res) => {
      toast.success('Reg success')            //НАВИГАЦИЮ НЕ ПРОЕБИ И ПОТОМ ПОДУМАЙ КАК НА ЭТО СОБЫТИЕ СДЕЛАТЬ СЛАЙДЕР
      navigate('/')
    }).catch((err) => {
      toast.error('Reg fail:'+err.message)
    });

    }
  }


  return (
    <div className='login'>
      
      <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
      
        {/* Регистрация */}
        <div className='col-md-6 d-flex justify-content-center'>
          <form onSubmit={handleSubmit}> {/* СХУЯЛИ НЕ СЧИТЫВАЕТ ФУНКЦИЮ */}
            <div className='header-text mb-4'>
              <h1>Create Account</h1>
            </div>

            <div className='input-group mb-3'>
              <input required value={id} onChange={e => setId(e.target.value)} type="text" placeholder='User Name' className='form-control form-control-lg bg-light fs-6' />
            </div>

            <div className='input-group mb-3'>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' className='form-control form-control-lg bg-light fs-6' />
            </div>

            <div className='input-group mb-3'>
              <input  value={regpass} onChange={e => setRegPass(e.target.value)} type="password" placeholder='Password' className='form-control form-control-lg bg-light fs-6' />
            </div>

            <div className='input-group mb-3'>
              <label>Role:__</label>  
              
              <input type="radio" checked={role === 'client'} onChange={e => setRole(e.target.value)} name='role' value = 'client' className='app-check text-secondary' />
              <label>Client__</label>
              <input type="radio" checked={role === 'manager'} onChange={e => setRole(e.target.value)} name='role' value = 'manager' className='form-check-label text-secondary' />
              <label>Manager</label>

            </div>

            <div className='input-group mb-3 justify-content-center'>
              <button className='btn border-white text-white w-50 fs-6'>Register</button>
            </div>
          </form>
        </div>

        {/* Вход */}
        <div className='col-md-6 right-box'>
          <form onSubmit={ProceedLogin}>
            <div className='header-text mb-4'>
              <h1>Sign In</h1>
            </div>

            <div className='input-group mb-3'>
              <input  value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='User Name' className='form-control form-control-lg bg-light fs-6' />
            </div>

            <div className='input-group mb-3'>
              <input  value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' className='form-control form-control-lg bg-light fs-6' />
            </div>
            
            <div className='input-group mb-5 d-flex justify-content-between'>
              <div className='form-check'>
                <input type="checkbox" className='form-check-input' id="formcheck" />
                <label htmlFor="formcheck" className='form-check-label text-secondary'><small>Remember me</small></label>
              </div>
              <div className='forgot'>
                <small><a href="#">Forgot password?</a></small>
              </div>
            </div>

            <div className='input-group mb-3 justify-content-center'>
              <button className='btn border-white text-white w-50 fs-6'>LOGIN</button>
            </div>
          </form>
        </div>

        {/* switch  */}

        <div className='switch-content'>
          <div className='switch'>
            <div className='switch-panel switch-left'>
              <h1>Hello, Again</h1>
              <p>We are happy to see u again</p>
              <button className='hidden btn border-white text-white w-50 fs-6' id='login' onClick={SwitchContent}>Login</button>
            </div>
            <div className='switch-panel switch-right'>
              <h1>welcome</h1>
              <p>We are happy to see u again</p>
              <button className='hidden btn border-white text-white w-50 fs-6' id='register' onClick={SwitchContent}>Register</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
