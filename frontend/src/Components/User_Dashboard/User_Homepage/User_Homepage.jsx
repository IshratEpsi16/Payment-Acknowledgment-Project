import axios from 'axios';
import React from 'react';
import { useNotificationContext } from '../../CreatePage/NotificationContext'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import img from '../../../../public/images/logo.png'
import profile from '../../../../public/images/default-profile.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './User_Homepage.css'
const User_Homepage = () => {
    const navigate = useNavigate();
    //const { notifications, updateNotifications } = useNotificationContext();
    //const { notifications, updateNotifications } = useNotificationContext();
    // const [fetchNotifications, setFetchNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    // const { id } = useParams();
    const id = localStorage.getItem("id")
    console.log('id',id)
    // const empId = localStorage.getItem("empId")
    // console.log('emp', empId)

    // const [payeeId, setPayeeId] = useState('');
    // const [payeeName, setPayeeName] = useState('');
    // const [notifications2, setNotifications2] = useState('');

    // useEffect(() => {
    //     axios.get(`http://192.168.7.15:8081/notifications/${id}`)
    //         .then(res => setNotifications(res.data))
    //         .catch(err => console.log(err));
    // }, [id]);
    useEffect(() => {
        // Assuming authToken holds your authorization token
        const authToken = localStorage.getItem("token");

        // Setting up the Axios request configuration
        const config = {
            headers: {
                'Authorization': `${authToken}` // Assuming it's a Bearer token
            }
        };

        axios.get(`http://192.168.7.15:8081/notifications/${id}`, config)
        .then(res => setNotifications(res.data))
        .catch(err => console.log('not',err));
    }, [id]);



    useEffect(() => {
        const authToken = localStorage.getItem("token");

        // Setting up the Axios request configuration
        const config = {
            headers: {
                'Authorization': `${authToken}` // Assuming it's a Bearer token
            }
        };
        axios.get(`http://192.168.7.15:8081/profileInfo/${id}`,config)
            .then(res => setProfileInfo(res.data)

            )
            .catch(err => console.log('profile',err));
    });

    // Add a function to handle updating status
// Add a function to handle updating status
const updateStatus = (response, payeeId, currentPeriod) => {
    const authToken = localStorage.getItem("token");

        // Setting up the Axios request configuration
        const config = {
            headers: {
                'Authorization': `${authToken}` // Assuming it's a Bearer token
            }
        };
    axios.put(`http://192.168.7.15:8081/updateStatus/${payeeId}/${currentPeriod}/${response.toLowerCase()}`,{},config)
        .then(res => {
            console.log(res.data.message);
            // Reload the page after successful update
            window.location.reload();
        })
        .catch(err => console.log("update",err));
};

    const handleLogout = () => {
        // Clear any user-related data from localStorage or state
        localStorage.removeItem('id');
        // Redirect to the '/' path
        navigate('/');
      }
      const autoRefresh = () => {
        // Clear any user-related data from localStorage or state
        window.location.reload();
      }
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const handleToggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
      };

    // Modify the button click event handlers

    return (
        <div>


        <nav className="bg-blue-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen ? 'true' : 'false'}
                            onClick={handleToggleMenu}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`block h-6 w-6 ${isMenuOpen ? 'hidden' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg
                                className={`hidden h-6 w-6 ${isMenuOpen ? '' : 'hidden'}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img src={img} className="h-10 w-auto image" alt="Seven Rings Cement" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4 text-sky-900">
                                <svg  fill='currentcolor' xmlns="http://www.w3.org/2000/svg" height="20px" width="10px" viewBox="0 0 192 512">
                                    <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zm128 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64z" />
                                </svg>
                                <p className='text-sm text-blue-700'>Logged In As {profileInfo.EMPLOYEE_ID}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Buttons for notifications and logout */}
                       
                        <button className="btn btn-success ml-3" style={{ color: 'white' }} onClick={handleLogout}>
                            Logout
                        </button>
                        <div className="relative ml-3">
                            {/* User menu button */}
                            <button
                                type="button"
                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            <div className={`sm:hidden ${isMenuOpen ? '' : 'hidden'}`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {/* Menu items */}
                    <p className='text-sm text-blue-700'>Logged In As {profileInfo.EMPLOYEE_ID}</p>
                </div>
            </div>
        </nav>
        <div className='container'>

            <div className='row'>

            <h1 className='mt-4  text-xl text-center font-bold text-teal-600'>Seven Circle Bangladesh Ltd. </h1>
                <div className='col-10'>

                    <h3 className='text-xl p-5 text-primary'>Welcome <br></br>{profileInfo.EMPLOYEE_NAME}</h3>
                    {/* <h1>Welcome {item.EMPLOYEE_NAME}</h1> */}

                   
                    <button type='button' className='btn btn-outline btn-error' onClick={autoRefresh}> <svg fill='currentcolor'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='20' width='20'><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg></button>

                    {notifications.map((item, i) => (
                        <div key={i}>


                           
                            <br></br>

                            <div className="card w-96 bg-base-100 shadow-xl">
  
  <div className="card-body">
    <h2 className="card-title text-green-600 text-center"> Payment Acknowledgment</h2>
<p className='text-sm text-gray-600'>Dear {item.EMPLOYEE_NAME},<br></br></p>
                           <p className='text-sm text-gray-600'> We are writing to acknowledge the receipt of your recent payment for the amount of <b>{item.CASH_AMOUNT}/=</b><br></br> We appreciate your prompt attention to this matter.
                            <br></br>Please click on 'Yes' button if you received your payment. If you didn't get it then let us inform by clicking on 'No'
                            <br></br> <br></br>
                            Thank you for your continued support.</p>                            
                            <br></br>
    <div className="card-actions justify-end">
    <button type="button" className=" btn btn-success  " style={{width:'20%', color:'white',border: '2px solid yellow'}} onClick={() => updateStatus('Yes', item.PAYEE_ID, item.PAYROLL_MONTH)}>Yes</button>
                            &nbsp; &nbsp;
                            <button type="button" style={{width:'20%', color:'white',border: '2px solid yellow'}} className="btn btn-error" onClick={() => updateStatus('No', item.PAYEE_ID, item.PAYROLL_MONTH)}>No</button>
    </div>
  </div>
</div>












                            {/* <p>Dear {item.EMPLOYEE_NAME},<br></br></p>
                           <p> We are writing to acknowledge the receipt of your recent payment for the amount of <b>{item.CASH_AMOUNT}/=</b><br></br> We appreciate your prompt attention to this matter.
                            <br></br>Please click on 'Yes' button if you received your payment. If you didn't get it then let us inform by clicking on 'No'
                            <br></br> <br></br>
                            Thank you for your continued support.</p>                            
                            <br></br>
                             
                            <button type="button" className="btn btn-success" onClick={() => updateStatus('Yes', item.PAYEE_ID, item.PAYROLL_MONTH)}>Yes</button>
                            &nbsp; &nbsp;
                            <button type="button" className="btn btn-danger" onClick={() => updateStatus('No', item.PAYEE_ID, item.PAYROLL_MONTH)}>No</button> */}
                        </div>
                    ))}



                    {/* {console.log('notification:', notifications)} */}

                    {/* {notifications.map((item, i) => (
        <div key={i}>
            <h4>Notification {i + 1}</h4>
            <p>PAYEE_ID: {item.PAYEE_ID}</p>
            <p>PAYEE_NAME: {item.PAYEE_NAME}</p>
            <p>NOTIFICATIONS: {item.NOTIFICATIONS}</p>
            <p>----</p>
        </div>
    ))} */}

                    {/* 
    {notifications.map((notification, i) => (
        <div key={i}>{notification.PAYEE_ID}</div>
    ))} */}
                    {/* 
    <div>
        <button onClick={handleButtonClick}>Click Me</button>
      
        {fetchNotifications && (
            <div>
                {notifications.map((notification, i) => (
                    <div key={i}>{notification.NOTIFICATIONS}</div>
                ))}
            </div>
        )}
    </div> */}

                </div>




            </div>

        </div>

    </div >
    );
};

export default User_Homepage;