import { useState } from 'react';
import axios from 'axios'
import img from '../../../public/images/logo.png'
//import Validation from './SignUpValidation';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import './SignUpStyle.css'
const SignUp = () => {

    const [employeeId, setEmployeeId] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [employeeName, setEmployeeName] = useState('')
    const [nidNo, setNidNo] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [employeePassword, setEmployeePassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // const [values, setvalues] = useState({

    //     employeeId: '',
    //     employeeName: '',
    //     phoneNumber: '',
    //     email: '',
    //     employeePassword: '',
    //     confirmPassword: ''
    // })
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }
    const navigate = useNavigate();
    const [errors, setErrors] = useState({

    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Assuming employeeName is a string



        // setErrors(Validation(values));

        // if (
        //     errors.employeeId === "" &&
        //     errors.employeeName === "" &&
        //     errors.phoneNumber === "" &&
        //     errors.email === "" &&
        //     errors.employeePassword === "" &&
        //     errors.confirmPassword === ""
        // ) {
        //     try {
        //         const res = await axios.post('http://localhost:8081/signup', values);
        //         console.log(res.data);
        //         // Handle success (if needed)
        //     } catch (err) {
        //         console.error(err);
        //         // Handle error (if needed)
        //     }
        // }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

        if (!passwordRegex.test(employeePassword)) {
            // Password does not meet the conditions
            alert("Password does not meet the required conditions.\n Conditions:\n 1.First letter should be uppercase.\n 2.Must conatin at least one digit.\n 3.Must conatin at least one special character. \n 4. Password length should not be less than 8 characters");
            // You can set an error state or display a message to the user
            return;
        }
        if (employeePassword !== confirmPassword) {
            alert("Password and Confirm password do not match");
            return;
        }
        axios.post('http://192.168.7.15:8081/signup', {
            employeeId,
            employeeName,
            nidNo,
            phoneNumber,
            email,
            employeePassword,
            confirmPassword
        })
            .then(res => {
                console.log(res);
                localStorage.setItem("id", employeeId)
                navigate('/');
            })
            .catch(err => {
                console.error("Error during POST request:", err);
                if (err.response && err.response.status === 409) {
                    alert("Employee ID already exists. Please choose a different ID.");
                } else {
                    //alert("An error occurred during signup. Please try again later.");
                    alert("Employee ID already exists.Please provide correct ID");
                }
            });
    };


    // const handleInput = (event) => {
    //     setvalues((prev) => ({ ...prev, [event.target.name]: event.target.value }))

    // }
    return (
        <div>

            <div className="hero min-h-screen  signupPage">

                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" action='' onSubmit={handleSubmit}>
                            <div className=" m-3 center-container">
                                <img src={img} className='img' alt="Description of the image" />
                            </div>
                            <h2 className='m-1 text-color text-xl text-center'>Sign Up Here</h2>
                            <div className="form-control">
                                <label className="label" htmlFor="employeeID">
                                    <span className="label-text">Employee ID</span>
                                </label>
                                <input type="text" maxlength="10" onChange={e => setEmployeeId(e.target.value)} className="input input-bordered" id="employeeID" required />
                                {/* <input type="email" placeholder="email" className="input input-bordered" required /> */}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="employeeName">
                                    <span className="label-text">Employee Name</span>
                                </label>
                                <input type="text" onChange={e => setEmployeeName(e.target.value)} className="input input-bordered" id="employeeName" required />

                                {/* <input type="email" placeholder="email" className="input input-bordered" required /> */}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="phoneNumber">
                                    <span className="label-text">NID No.</span>
                                </label>
                                <input type="number" onChange={e => setNidNo(e.target.value)} className="input input-bordered" id="phoneNumber" />
                                {/* <input type="email" placeholder="email" className="input input-bordered" required /> */}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="exampleInputEmail1">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onChange={e => setEmail(e.target.value)} type="email" name='email' className="input input-bordered" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                {/* <input type="email" placeholder="email" className="input input-bordered" required /> */}
                            </div>
                            {/* <div className="form-control">
                                <label className="label" htmlFor="exampleInputPassword1">
                                    <span className="label-text">Password</span>
                                </label>

                                <input onChange={e => setEmployeePassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" required />

                                <svg onClick={handleTogglePassword} xmlns="http://www.w3.org/2000/svg" width="17" style={{ fill: '#808080' }} viewBox="0 0 576 512">
                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                </svg>

                            </div> */}
                            <div className="form-control">
                                <label className="label" htmlFor="exampleInputPassword1">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="password-input-container">
                                    <input onChange={e => setEmployeePassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" required />
                                    <svg onClick={handleTogglePassword} xmlns="http://www.w3.org/2000/svg" width="17" style={{ fill: '#808080' }} viewBox="0 0 576 512" className="password-toggle-icon">
                                        <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                    </svg>
                                    <p className='text-sm text-slate-400'>Abcdef1#</p>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="exampleInputPassword2">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <div className="password-input-container">
                                    <input onChange={e => setConfirmPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword2" required />
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
                                <button className="btn btn-primary" type="submit">Sign Up</button>
                                <p className='m-3 sign'>Already have an account?&nbsp;<Link to='/'className='text-sky-600'>Log in</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>

    );
};

export default SignUp;