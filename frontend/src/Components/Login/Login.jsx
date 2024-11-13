import React, { useState } from 'react';
import img from '../../../public/images/logo.png'
import { Link } from 'react-router-dom';
import Home from '../Home/Home';
import './LoginStyle.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
//import Validation from './LoginValidation';
import 'bootstrap/dist/css/bootstrap.min.css';
//new
const Login = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [employeePassword, setEmployeePassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const token = localStorage.getItem("token")
    const [errors, setErrors] = useState({

    })
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post('http://192.168.7.15:8081/login', {
            employeeId,
            employeePassword
        })
        
        .then(res => {
            console.log("Server Response:", res);
            
            if (res.data || res.data.status === 'success') {
                const role = res.data.role;
                console.log('d', res.data)
                const loc = res.data.loc
                const admin_loc = res.data.admin_loc
                localStorage.setItem("id", employeeId);
                localStorage.setItem("token", res.data.token);

                if (role === 'admin' && admin_loc === 'Corporate Office') {
                    navigate('/home');
                    window.location.reload();
                } else if (role === 'admin' && admin_loc === 'Kaligonj Factory Office') {
                    navigate('/SCBLFO');
                    window.location.reload();
                }
                else if (role === 'admin' && admin_loc === 'Labanchora Factory office') {
                    navigate('/Labanchora');
                    window.location.reload();
                }
                else if (role === 'admin' && admin_loc === 'Shikolbaha Office Factory') {
                    navigate('/shikolbaha');
                    window.location.reload();
                }
                else if (role === 'admin' && admin_loc === 'Chittagong') {
                    navigate('/chittagong');
                    window.location.reload();
                }
                else if (role == null && loc === 'Corporate Office' || loc === 'Gazipur' || loc === 'Rangpur' || loc === 'Bogra' || loc === 'Comilla' || loc === 'Mymensing' || loc === 'Narshindi' || loc === 'Sylhet' || loc === 'Tongi' || loc === 'Khulna' || loc === 'Faridpur Office' || loc === 'Jhenaidah') {
                    navigate('/userhome');
                    window.location.reload();
                }
                else if (role == null && loc === 'Kaligonj Factory Office') {
                    navigate('/userhomeSCBLFO');
                    window.location.reload();
                }
                else if (role == null && loc === 'Labanchora Factory office') {
                    navigate('/userhomeSSCML');
                    window.location.reload();
                }
                else if (role == null && loc === 'Shikolbaha Office Factory') {
                    navigate('/userhomeSSCIL');
                    window.location.reload();
                }
                else if (role == null && loc === 'Chittagong') {
                    navigate('/userhomeCtg');
                    window.location.reload();
                }

                else {
                    console.error('Invalid role:', role);
                    alert('Invalid role');
                }
            } else {
                console.error('Login failed. Server response:', res.data);
                alert('Invalid ID or password');
            }
        })
        .catch(err => {
            console.error("Error during POST request:", err);
            alert('Invalid ID or Password provided');
        });
    };
    


    // const handleInput = (event) => {
    //     setvalues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))

    // }
    return (
        <div>
        <div>

            <div className="hero min-h-screen  loginPage ">

                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" action='' onSubmit={handleSubmit}>
                            <div className=" m-3 center-container">
                                <img src={img} className='img' alt="Description of the image" />
                            </div>
                            <h2 className='m-1 text-color text-xl text-center'>Login Here</h2>
                            <div className="form-control">
                                <label className="label" htmlFor="employeeID">
                                    <span className="label-text">Employee ID</span>
                                </label>
                                <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="input input-bordered" id="employeeID" required />
                                {/* <input type="email" placeholder="email" className="input input-bordered" required /> */}
                            </div>



                            <div className="form-control">
                                <label className="label" htmlFor="exampleInputPassword1">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="password-input-container">
                                    <input value={employeePassword} onChange={e => setEmployeePassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" required />
                                    <svg onClick={handleTogglePassword} xmlns="http://www.w3.org/2000/svg" width="17" style={{ fill: '#808080' }} viewBox="0 0 576 512" className="password-toggle-icon">
                                        <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                    </svg>
                                </div>
                            </div>


                            {/* <div className="form-control">
                <label className="label" htmlFor="exampleInputPassword2">
                    <span className="label-text">Confirm Password</span>
                </label>

                <input onChange={e => setConfirmPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword2" required />
        
                <svg onClick={handleTogglePassword} xmlns="http://www.w3.org/2000/svg" width="17" style={{ fill: '#808080' }} viewBox="0 0 576 512">
                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                </svg>

     
            </div> */}
                            {/* <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div> */}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">Login</button>

                                <a href="#" className='m-3 forgot'><Link to='/forgetpassword'>Forgot Password?</Link></a>


                                <p className='m-3 sign'>Don't have any account?&nbsp;<Link to='/signup' className='text-sky-600'>Sign Up</Link></p>
                       
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>








    </div>
    );
};

export default Login;