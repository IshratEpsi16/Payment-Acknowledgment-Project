import { useState } from 'react';
import axios from 'axios'
import img from '../../../public/images/logo.png'
//import Validation from './SignUpValidation';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
//import './SignUpStyle.css'
import '../Login/Forgetpass.css'
const ForgetPass = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [nidNo, setNidNo] = useState('')

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://192.168.7.15:8081/forgetpassword', {
                employeeId,
                nidNo
            });
    
            if (response.data.navigate) {
                // Navigate to authenticated page with the employeeId as a parameter
                navigate(`/authenticated/${employeeId}`);
            } else {
                alert("Unauthorized. Invalid employee ID or NID number.");
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("Wrong ID/NID no provided.Provide correct information");
        }
    };
    


    // const handleInput = (event) => {
    //     setvalues((prev) => ({ ...prev, [event.target.name]: event.target.value }))

    // }
    return (
        <div>
            <div>
                <div>

                    <div className="hero min-h-screen  ForgetPassPage ">

                        <div className="hero-content flex-col lg:flex-row-reverse">

                            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form className="card-body" action='' onSubmit={handleSubmit}>
                                    <div className=" m-3 center-container">
                                        <img src={img} className='img' alt="Description of the image" />
                                    </div>
                                    <h2 className='m-1 text-color text-xl text-center'>Reset Password</h2>
                                    <div className="form-control">
                                        <label className="label" htmlFor="employeeID">
                                            <span className="label-text">Employee ID</span>
                                        </label>
                                        <input type="text" maxLength="10" value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="input input-bordered" id="employeeID" required />
                                        {/* <input type="email" placeholder="email" className="input input-bordered" required /> */}
                                    </div>

                                    <div className="form-control">
                                        <label className="label" htmlFor="phoneNumber">
                                            <span className="label-text">NID No.</span>
                                        </label>
                                        <input type="number" onChange={e => setNidNo(e.target.value)} className="input input-bordered" id="phoneNumber" required />
                                        {/* <input type="email" placeholder="email" className="input input-bordered" required /> */}
                                    </div>


                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                        <p className='m-3'>&nbsp;<Link to='/'>Back</Link></p>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>



                </div>

            </div>

        </div>

    );
};

export default ForgetPass;