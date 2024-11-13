import React from 'react';
import './CreatePage.css'
import img from '../../../public/images/logo.png'
import { useEffect, useRef, useState } from 'react';
import { useNotificationContext } from '../CreatePage/NotificationContext'
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
const KaligonjFact = () => {
    // const { setFetchNotifications } = useNotificationContext();
    const { updateNotifications } = useNotificationContext();
    const [employeeId, setEmployeeId] = useState('')
    const [companyQuery, setCompanyQuery] = useState('');
    const [customer, setCustomer] = useState([]);
    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomer, setFilteredCustomer] = useState([]);
    const [payeeId, setPayeeId] = useState('');
    const [notify, setNotify] = useState('');
    const [IdQuery, setIdQuery] = useState('');
    const [payeeName, setPayeeName] = useState('');
    const [payrollMonthQuery, setPayrollMonthQuery] = useState('');
    const [cashAmount, setCashAmount] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [currentPeriod, setCurrentPeriod] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const { fetchNotifications, setFetchNotifications } = useNotificationContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [paymentQuery, setPaymentQuery] = useState('');
    const [statusQuery, setStatusQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const searchResultsRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        axios.get('http://192.168.7.15:8081/fo')
            .then(res => {
                console.log('Fetched data:', res.data);
                setCustomer(res.data);
                setFilteredCustomer(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    const handleSearchButtonClick = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create a copy of the original customer data
        let results = [...customer];



        if (payrollMonthQuery) {
            results = results.filter(item => item.PAYROLL_MONTH && item.PAYROLL_MONTH.toLowerCase().includes(payrollMonthQuery.toLowerCase()));
        }

        if (statusQuery.toLowerCase() === 'unsent') {
            results = results.filter(item => !item.STATUS); // Filter items with no status
        } else if (statusQuery) {
            results = results.filter(item => item.STATUS && item.STATUS.toLowerCase().includes(statusQuery.toLowerCase()));
        }

        // Filter by name if provided
        if (nameQuery) {
            results = results.filter(item => item.PAYEE_NAME && item.PAYEE_NAME.toLowerCase().includes(nameQuery.toLowerCase()));
        }
        if (IdQuery) {
            results = results.filter(item => item.PAYEE_ID && item.PAYEE_ID.toString() === IdQuery);
        }
        if (companyQuery) {
            results = results.filter(item => item.PAYROLL_NAME && item.PAYROLL_NAME.toLowerCase().includes(companyQuery.toLowerCase()));
        }
        if (paymentQuery) {
            results = results.filter(item => item.PAYMENT_METHOD && item.PAYMENT_METHOD.toLowerCase().includes(paymentQuery.toLowerCase()));
        }
        // Filter by status if provided

        // Filter by name if provided

        console.log('Filtered results:', results);

        setSearchResults(results);
        setLoading(false);
        setNotFound(results.length === 0);
    };








    // const handleDateChange = (date) => {
    //     setCurrentDate(date);
    //     setCurrentPeriod(date.toISOString()); // Save as UTC in state
    // };
    // const handleDateChange = (date) => {
    //     // Check if the selected date is between 26th and 31st
    //     if (date.getDate() >= 26 && date.getDate() <= 31) {
    //         // Get the next month
    //         const nextMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    //         setCurrentDate(nextMonth);
    //         setCurrentPeriod(nextMonth.toISOString()); // Save as UTC in state
    //     } else {
    //         // If not between 26th and 31st, set the selected date
    //         setCurrentDate(date);
    //         setCurrentPeriod(date.toISOString()); // Save as UTC in state
    //     }
    // };


    const navigate = useNavigate();



    // const handleSendButtonClick = (item) => {
    //     setSelectedRow(item);
    //     setFetchNotifications(true);
    // };
    const handleSendButtonClick = (item) => {
        setSelectedRow(item);
    };



    useEffect(() => {
        if (fetchNotifications) {
            axios.get('http://192.168.7.15:8081/notifications')
                .then(res => {
                    const notificationsData = res.data;
                    console.log('notificationsData:', notificationsData);
                    // Update notifications in context
                    setNotify(notificationsData);
                })
                .catch(err => console.error(err))
                .finally(() => setFetchNotifications(false)); // Reset the state after fetching notifications
        }
    }, [fetchNotifications]);



    const statusOptions = ["Accepted", "Sent", "Rejected", "Unsent"];
    const payrollNames = [...new Set(customer.map(item => item.PAYROLL_NAME))];
    const paymentNames = [...new Set(customer.map(item => item.PAYMENT_METHOD))];

    // const handleSendButtonClick = (item) => {
    //     setSelectedRow(item);
    //     // Trigger the fetch and update notifications in User_Homepage
    //     axios.get('http://localhost:8081/notifications')
    //         .then(res => {
    //             const notificationsData = res.data;
    //             console.log('notificationsData:', notificationsData);
    //             // Set notifications in User_Homepage
    //             setNotify(notificationsData);
    //         })
    //         .catch(err => console.error(err));
    // };

    useEffect(() => {
        // Assuming authToken holds your authorization token
        const authToken = localStorage.getItem("token");

        // Setting up the Axios request configuration
        const config = {
            headers: {
                'Authorization': `${authToken}` // Assuming it's a Bearer token
            }
        };

        axios.get('http://192.168.7.15:8081/fo', config)
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err));
    }, []);

    // function handleSubmit(event) {
    //     event.preventDefault();

    //     if (!selectedRow) {
    //         console.error("No row selected for submission.");
    //         return;
    //     }

    //     //   const { PAYEE_ID, PAYEE_NAME, CASH_AMOUNT, MAIL_ADDRESS } = selectedRow;

    //     // Convert currentPeriod to local time before sending it to the server
    //     //   const localCurrentPeriod = new Date(currentPeriod).toLocaleString();

    //     // axios.post('http://localhost:8081/create', {
    //     //     payeeId: PAYEE_ID,
    //     //     payeeName: PAYEE_NAME,
    //     //     cashAmount: CASH_AMOUNT,
    //     //     mailAddress: MAIL_ADDRESS,
    //     //     currentPeriod: localCurrentPeriod, // Send local time to the server
    //     // })
    //     //     .then(res => {
    //     //         console.log(res);
    //     //         alert('Notification sent to user');
    //     //         navigate('/create');
    //     //     })
    //     //     .catch(err => {
    //     //         console.error("Error during POST request:", err);
    //     //         if (err.response && err.response.data && err.response.data.error === 'Record already sent or closed') {
    //     //             alert('Already sent notification');
    //     //         }
    //     //     });
    // }
    function handleSubmit(event) {
        event.preventDefault();

        if (!selectedRow) {
            console.error("No row selected for submission.");
            return;
        }

        // Proceed with form submission
        const { PAYEE_ID, PAYEE_NAME, CASH_AMOUNT, PAYROLL_MONTH,PAYROLL_NAME } = selectedRow;
        const authToken = localStorage.getItem("token");

        // Setting up the Axios request configuration
        const config = {
            headers: {
                'Authorization': ` ${authToken}` // Assuming it's a Bearer token
            }
        };

        axios.put(`http://192.168.7.15:8081/updateStatusScblFO/${PAYEE_ID}/${PAYROLL_MONTH}`, {}, config)
            .then(res => {
                console.log(res.data);
                // Optionally, you can update the UI or show a success message
                alert('Notification Sent Successfully');
                window.location.reload()
            })
            .catch(err => {
                console.error('Error updating status:', err);
                // Handle errors, show error message or retry logic
            });
    }


    return (
//         <div>
//             <nav className="navbar bg-blue-100">
//                 <div className="container">
//                     <a className="navbar-brand" href="#">
//                         <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
//                     </a>


//                     <div className='text-danger'>
//                         <Link to='/SCBLFO' className='text-danger'> <svg style={{ height: '35px', width: '35px' }} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z" /></svg>
//                         </Link>
//                     </div>
//                 </div>
//             </nav >
//             <h1 className='mt-4 text-2xl text-center font-bold text-teal-600'>Seven Circle Bangladesh Ltd - Kaligonj </h1>
//             <div className='search' ref={searchResultsRef} style={{ marginLeft: '250px' }}>

//                 <form className="d-flex search2" role="search" onSubmit={handleSearchButtonClick} >

//                     <input
//                         style={{ width: '35%', fontSize: '14px' }}
//                         className="form-control me-2"
//                         type="search"
//                         placeholder="Search by month"
//                         aria-label="Payroll Month Search"
//                         value={payrollMonthQuery}
//                         onChange={(e) => setPayrollMonthQuery(e.target.value)}
//                     />
//                     <select
//                         style={{ width: '20%', fontSize: '14px' }}
//                         className="form-select me-2"
//                         aria-label="Status Search"
//                         value={statusQuery}
//                         onChange={(e) => setStatusQuery(e.target.value)}
//                     >
//                         {/* Render dropdown options */}
//                         <option value="">Select Status</option>
//                         {statusOptions.map((status, index) => (
//                             <option key={index} value={status}>{status}</option>
//                         ))}
//                     </select>
//                     <input
//                         style={{ width: '20%', fontSize: '14px' }}
//                         className="form-control me-2"
//                         type="search"
//                         placeholder="Search by name"
//                         aria-label="Name Search"
//                         value={nameQuery}
//                         onChange={(e) => setNameQuery(e.target.value)}
//                     />
//                      <input
//                                         style={{ width: '20%', fontSize: '14px' }}
//                                         className="form-control me-2"
//                                         type="search"
//                                         placeholder="ID"
//                                         aria-label="Name Search"
//                                         value={IdQuery}
//                                         onChange={(e) => setIdQuery(e.target.value)}
//                                     />
//                                     <select
//                         style={{ width: '20%', fontSize: '14px' }}
//                         className="form-select me-2"
//                         aria-label="Company Search"
//                         value={companyQuery}
//                         onChange={(e) => setCompanyQuery(e.target.value)}
//                     >
//                         <option value="">Select Company</option>
//                         {payrollNames.map((name, index) => (
//                             <option key={index} value={name}>{name}</option>
//                         ))}
//                     </select>
//                     <button className="btn btn-primary" type="submit">Search</button>

//                 </form>
//             </div>


//             {loading && <p>Loading...</p>}
//             {notFound && <p className='text-red-500 font-bold m-4 text-lg'>Not Found!</p>}
//             <div className='container'>
//                 <br></br>
//                 <form onSubmit={handleSubmit}>

//                     <table className='table table-striped-columns"'>
//                         {searchResults.length > 0 && (

//                             <thead className='table-info '>
//                                 <tr>
//                                     {/* <th>Transaction ID</th> */}
//                                     <th>Payee ID</th>
//                                     <th>Payee Name</th>
//                                     <th>Cash Amount</th>
//                                     {/* <th>Mail</th> */}
//                                     <th>Payroll Period</th>
//                                     <th>Company</th>
// <th>Status</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>
//                         )}
//                         <tbody>
//                             {console.log('cy', customer)}
//                             {searchResults.map((item, i) => (

//                                 <tr key={i}>
//                                     {/* <td>{item.TRANSACTION_ID}</td> */}
//                                     {/* {console.log('Item:', item)} */}
//                                     <td>{item.PAYEE_ID}</td>

//                                     <td>{item.PAYEE_NAME}</td>
//                                     <td>{item.CASH_AMOUNT}</td>
//                                     {/* <td>{item.MAIL_ADDRESS}</td> */}
//                                     {/* <td>
//                                         <DatePicker
//                                             selected={currentDate}
//                                             className='date'
//                                             onChange={(date) => handleDateChange(date)}
//                                             dateFormat="MMM-yy"
//                                         />
//                                     </td> */}
//                                     <td>{item.PAYROLL_MONTH}</td> 
//                                     <td>{item.PAYROLL_NAME}</td>
//                                     <td>{item.STATUS}</td>

//                                     {/* <td><button className='btn btn-info text-light' onClick={() => handleSendButtonClick(item)} >Send</button></td> */}
//                                     <td>
//                                         <button className='btn btn-info text-light' onClick={() => handleSendButtonClick(item)} disabled={item.STATUS === 'Sent' || item.STATUS === 'Accepted'}>Send</button>
//                                     </td>
//                                     {/* {console.log('status', item.STATUS)}{console.log('month', item.CURRENT_PERIOD)}
//                                     {console.log('id', item.PAYEE_ID)}
//                                     {console.log('last', item.LAST_UPDATE_DATE)} */}

//                                 </tr>
//                             ))}
//                         </tbody>

//                     </table>
//                 </form>
//             </div>
//         </div>
<div>
            <nav className="navbar bg-blue-100">
                <div className="container flex justify-between items-center">
                    <a className="navbar-brand" href="#">
                        <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
                    </a>
                    <div className='text-danger'>
                        <Link to='/SCBLFO' className='text-danger'>
                            <svg style={{ height: '35px', width: '35px' }} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
            <h1 className='mt-4 text-2xl text-center font-bold text-teal-600'>SSGIL-BD</h1>
            <div className='container' style={{ marginLeft: '-15%' }}>
                <div className='search' ref={searchResultsRef}>
                    <form className="d-flex flex-col md:flex-row search2" role="search" onSubmit={handleSearchButtonClick}>
                        <input
                            style={{ fontSize: '14px' }}
                            className="form-control me-2 mb-2 md:mb-0"
                            type="search"
                            placeholder="ID"
                            aria-label="Payroll Month Search"
                            value={IdQuery}
                            onChange={(e) => setIdQuery(e.target.value)}
                        />
                        <input
                            style={{ fontSize: '14px' }}
                            className="form-control me-2 mb-2 md:mb-0"
                            type="search"
                            placeholder="month"
                            aria-label="Payroll Month Search"
                            value={payrollMonthQuery}
                            onChange={(e) => setPayrollMonthQuery(e.target.value)}
                        />
                        <select
                            style={{ fontSize: '14px' }}
                            className="form-select me-2 mb-2 md:mb-0"
                            aria-label="Status Search"
                            value={statusQuery}
                            onChange={(e) => setStatusQuery(e.target.value)}
                        >
                            <option value="">Status</option>
                            {statusOptions.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                        <select
                            style={{ fontSize: '14px' }}
                            className="form-select me-2 mb-2 md:mb-0"
                            aria-label="Company Search"
                            value={paymentQuery}
                            onChange={(e) => setPaymentQuery(e.target.value)}
                        >
                            <option value="">Payment</option>
                            {paymentNames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                        <select
                            style={{ fontSize: '14px' }}
                            className="form-select me-2 mb-2 md:mb-0"
                            aria-label="Company Search"
                            value={companyQuery}
                            onChange={(e) => setCompanyQuery(e.target.value)}
                        >
                            <option value="">Company</option>
                            {payrollNames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                        <input
                            style={{ fontSize: '14px' }}
                            className="form-control me-2 mb-2 md:mb-0"
                            type="search"
                            placeholder="name"
                            aria-label="Name Search"
                            value={nameQuery}
                            onChange={(e) => setNameQuery(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {notFound && <p className='text-red-500 font-bold m-4 text-lg'>Not Found!</p>}

            {/* <div className='container'>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="table-responsive">
                        <table className='table table-striped-columns'>
                            {searchResults.length > 0 && (
                                <thead className='table-info'>
                                    <tr>
                                        <th>Payee ID</th>
                                        <th>Payee Name</th>
                                        <th>Cash Amount</th>
                                        <th>Company</th>
                                        <th>Payroll Period</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {searchResults.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.PAYEE_ID}</td>
                                        <td>{item.PAYEE_NAME}</td>
                                        <td>{item.CASH_AMOUNT}</td>
                                        <td>{item.PAYROLL_NAME}</td>
                                        <td>{item.CURRENT_PERIOD}</td>
                                        <td>{item.STATUS}</td>
                                        <td>
                                            <button className='btn btn-info text-light' onClick={() => handleSendButtonClick(item)} disabled={item.STATUS === 'Sent' || item.STATUS === 'Accepted'}>Send</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mobile-view">
                        {searchResults.map((item, i) => (
                            <div key={i}>
                                <p><strong>Payee ID:</strong> {item.PAYEE_ID}</p>
                                <p><strong>Payee Name:</strong> {item.PAYEE_NAME}</p>
                                <p><strong>Cash Amount:</strong> {item.CASH_AMOUNT}</p>
                                <p><strong>Company:</strong> {item.PAYROLL_NAME}</p>
                                <p><strong>Payroll Period:</strong> {item.CURRENT_PERIOD}</p>
                                <p><strong>Status:</strong> {item.STATUS}</p>
                                <button className='btn btn-info text-light' onClick={() => handleSendButtonClick(item)} disabled={item.STATUS === 'Sent' || item.STATUS === 'Accepted'}>Send</button>
                                <hr />
                            </div>
                        ))}
                    </div>
                </form>
            </div> */}
            <form onSubmit={handleSubmit}>
                <div className={isMobile ? 'mobile-view' : 'desktop-view'}>
                    {isMobile ? (
                        // Mobile View
                        <div>
                            {searchResults.length > 0 ? (
                                searchResults.map(item => (
                                    <div key={item.PAYEE_ID} className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.PAYEE_ID}</h5>
                                            <p className="card-text">
                                                Name: {item.PAYEE_NAME}<br />
                                                Company: {item.PAYROLL_NAME}<br />
                                                Cash Amount:{item.CASH_AMOUNT}<br />
                                                Payroll Period: {item.PAYROLL_MONTH}<br />
                                                Payment Method: {item.PAYMENT_METHOD}<br/>
                                                Status: <button className="btn btn-outline btn-secondary">{item.STATUS}</button><br />
                                            </p>
                                            <button className="btn btn-primary" onClick={() => handleSendButtonClick(item)} disabled={item.STATUS === 'Sent' || item.STATUS === 'Accepted'|| item.PAYMENT_METHOD === 'Bank'}>
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    ) : (
                        // Desktop View

                        <table className="table table-striped" style={{ width: '1225px', marginLeft: '2%', marginTop: '2%' }}>
                            {searchResults.length > 0 && (

                                <thead className='table-info '>
                                    <tr>
                                        {/* <th>Transaction ID</th> */}
                                        <th>Payee ID</th>
                                        <th>Payee Name</th>
                                        <th>Cash Amount</th>
                                        <th>Company</th>

                                        <th>Payroll Period</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {searchResults.map(item => (
                                    <tr key={item.PAYEE_ID}>
                                        <td>{item.PAYEE_ID}</td>
                                        <td>{item.PAYEE_NAME}</td>
                                        <td>{item.CASH_AMOUNT}</td>
                                        <td>{item.PAYROLL_NAME}</td>
                                        <td>{item.PAYROLL_MONTH}</td>
                                        <td>{item.PAYMENT_METHOD}</td>
                                        <td><button className="btn btn-outline btn-secondary">{item.STATUS}</button></td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleSendButtonClick(item)} disabled={item.STATUS === 'Sent' || item.STATUS === 'Accepted' || item.PAYMENT_METHOD === 'Bank'}>
                                                Send
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </form>


        </div>
    );
};

export default KaligonjFact;