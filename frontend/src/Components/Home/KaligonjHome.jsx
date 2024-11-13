import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from '../../../public/images/logo.png';
import profile from '../../../public/images/default-profile.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import './Home.css';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

const KaligonjHome = () => {
    const [profileInfo, setProfileInfo] = useState({});
    const [customdata, setCustomData] = useState([]);
    // const [companyQuery, setCompanyQuery] = useState('');
    const navigate = useNavigate();
    const [payrollMonthQuery, setPayrollMonthQuery] = useState('');
    const [paymentQuery, setPaymentQuery] = useState('');
    const [statusQuery, setStatusQuery] = useState('');
    const [companyQuery, setCompanyQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [IdQuery, setIdQuery] = useState('');
    const [endDate, setEndDate] = useState('');
    const [acceptDateStart, setAcceptDateStart] = useState('');
    const [acceptDateEnd, setAcceptDateEnd] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const searchResultsRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleExportExcel = () => {
        const data = searchResults.map(item => ({
            'Transaction ID': item.TRANSACTION_ID,
            'Payee ID': item.PAYEE_ID,
            'Payee Name': item.PAYEE_NAME,
            'Cash Amount': item.CASH_AMOUNT,
            'Payroll Month': item.PAYROLL_MONTH,
            'Creation Date': formatDate(item.CREATION_DATE),
            'Accepted Date': formatDate(item.LAST_UPDATE_DATE),
            'Status': item.STATUS
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Search Results');

        // Convert workbook to a binary string
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Create a Blob from the binary string
        const blob = new Blob([s2ab(excelBuffer)], { type: 'application/octet-stream' });

        // Create a download link
        const url = URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Search Results.xlsx';
        document.body.appendChild(a);
        a.click();

        // Cleanup
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 100);
    };

    // Utility function to convert a string to ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    };

    useEffect(() => {
        // Fetch profile information
        const id = localStorage.getItem("id");
        const authToken = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': `${authToken}`
            }
        };
        axios.get(`http://192.168.7.15:8081/profileInfo/${id}`, config)
            .then(res => setProfileInfo(res.data))
            .catch(err => console.log(err));

        // Fetch custom table data
        axios.get(`http://192.168.7.15:8081/customTableDataScblFo`, config)
            .then(res => console.log(setCustomData(res.data)))
            .catch(err => console.log(err));
    }, []);
    const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        // Adjust the date format to match the format of CREATION_DATE
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    };
    const statusOptions = ["Accepted", "Sent", "Rejected", "Unsent"];

    // const handleSearchButtonClick = (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     if (statusQuery.toLowerCase() === 'unsent') {
    //         const unsentResults = customdata.filter(item => item.STATUS === null);
    //         setSearchResults(unsentResults);
    //         setLoading(false);
    //         setNotFound(unsentResults.length === 0);
    //     } else {
    //         const results = customdata.filter(item =>
    //             (payrollMonthQuery === '' || (item.PAYROLL_MONTH && item.PAYROLL_MONTH.toLowerCase().includes(payrollMonthQuery.toLowerCase()))) &&
    //             (statusQuery === '' || (item.STATUS && item.STATUS.toLowerCase().includes(statusQuery.toLowerCase()))) &&
    //             (IdQuery === '' || (item.PAYEE_ID && item.PAYEE_ID.toString() === IdQuery)) && 
    //             (nameQuery === '' || (item.PAYEE_NAME && item.PAYEE_NAME.toLowerCase().includes(nameQuery.toLowerCase()))) &&
    //             (!startDate || new Date(convertDateFormat(item.CREATION_DATE)) >= startDate) && // Adjust date format here
    //             (!endDate || new Date(convertDateFormat(item.CREATION_DATE)) <= endDate) // Adjust date format here
    //         );

    //         setSearchResults(results);

    //         setLoading(false);
    //         setNotFound(results.length === 0);
    //     }
    // };
    const handleSearchButtonClick = (e) => {
        e.preventDefault();
        setLoading(true);

        const results = customdata.filter(item => {
            const creationDate = new Date(convertDateFormat(item.CREATION_DATE));
            const lastUpdateDate = new Date(convertDateFormat(item.LAST_UPDATE_DATE));
            const statusAccepted = item.STATUS && item.STATUS.toLowerCase() === 'accepted';

            return (
                (payrollMonthQuery === '' || (item.PAYROLL_MONTH && item.PAYROLL_MONTH.toLowerCase().includes(payrollMonthQuery.toLowerCase()))) &&
                (statusQuery === '' || (item.STATUS && item.STATUS.toLowerCase().includes(statusQuery.toLowerCase()))) &&
                (nameQuery === '' || (item.PAYEE_NAME && item.PAYEE_NAME.toLowerCase().includes(nameQuery.toLowerCase()))) &&
                (paymentQuery === '' || (item.PAYMENT_METHOD && item.PAYMENT_METHOD.toLowerCase().includes(paymentQuery.toLowerCase()))) &&
                (companyQuery === '' || (item.PAYROLL_NAME && item.PAYROLL_NAME.toLowerCase().includes(companyQuery.toLowerCase()))) &&
                (IdQuery === '' || (item.PAYEE_ID && item.PAYEE_ID.toString() === IdQuery)) &&
                (!startDate || creationDate >= startDate) &&
                (!endDate || creationDate <= endDate) &&
                (!acceptDateStart || (statusAccepted && lastUpdateDate >= acceptDateStart)) &&
                (!acceptDateEnd || (statusAccepted && lastUpdateDate <= acceptDateEnd))
            );
        });

        setSearchResults(results);
        setLoading(false);
        setNotFound(results.length === 0);
    }; 

    const formatDate = (dateString) => {
        if (!dateString) {
            return null;
        }

        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const handleLogout = () => {
        localStorage.removeItem('id');
        navigate('/');
    };
    const payrollNames = [...new Set(customdata.map(item => item.PAYROLL_NAME))];
    const paymentNames = [...new Set(customdata.map(item => item.PAYMENT_METHOD))];


    return (
    //     <div>
    //     <nav className="navbar bg-blue-100">
    //         <div className="container">
    //             <a className="navbar-brand" href="#">
    //                 <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
    //             </a>
    //             <div className='nav'>
    //                 <Link to='/SCBLFO_SEND' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-success" style={{ color: 'white' }}>Send Notification</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                
    //             </div>
    //             <div className='profile'>
    //                 <div className="flex space-x-4 text-sky-900">
    //                     <svg fill='currentcolor' xmlns="http://www.w3.org/2000/svg" height="20px" width="10px" viewBox="0 0 192 512">
    //                         <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zm128 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64z" />
    //                     </svg>
    //                     <p className='text-sm text-blue-700' >Logged In As <br></br>{profileInfo.EMPLOYEE_ID}</p>
    //                 </div>
    //                 {/* <p>Logged In As <br></br>{profileInfo.EMPLOYEE_ID}</p> */}
    //             </div>
    //             <div className='text-danger'>

    //                 <svg fill='currentcolor' style={{ marginLeft: '-10px', marginBottom: '-40px' }} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
    //                 &nbsp; &nbsp;<button style={{ marginRight: '30px', marginTop: '10px', color: 'white' }} className='btn btn-error' onClick={handleLogout}>Logout</button>
    //             </div>
    //         </div>
    //     </nav >
    //     <h1 className='mt-4 text-2xl text-center font-bold text-teal-600'>Seven Circle Bangladesh Ltd - Kaligonj </h1>
    //     <div className='container'>
    //         <div className='row' ref={searchResultsRef}>
    //             <div className='searchDiv'>
    //                 <div className='col-10'>
    //                     <div className='search'>
    //                         <form className="d-flex search2" role="search" onSubmit={handleSearchButtonClick}>

    //                             <input
    //                                 style={{ width: '35%', fontSize: '14px' }}
    //                                 className="form-control me-2"
    //                                 type="search"
    //                                 placeholder="month"
    //                                 aria-label="Payroll Month Search"
    //                                 value={payrollMonthQuery}
    //                                 onChange={(e) => setPayrollMonthQuery(e.target.value)}
    //                             />
    //                             {/* <input
    //                                 style={{ width: '35%', fontSize: '14px' }}
    //                                 className="form-control me-2"
    //                                 type="search"
    //                                 placeholder="Search by status"
    //                                 aria-label="Status Search"
    //                                 value={statusQuery}
    //                                 onChange={(e) => setStatusQuery(e.target.value)}
    //                             /> */}
    //                             <select
    //                                 style={{ width: '30%', fontSize: '14px' }}
    //                                 className="form-select me-2"
    //                                 aria-label="Status Search"
    //                                 value={statusQuery}
    //                                 onChange={(e) => setStatusQuery(e.target.value)}
    //                             >
    //                                 {/* Render dropdown options */}
    //                                 <option value="">Status</option>
    //                                 {statusOptions.map((status, index) => (
    //                                     <option key={index} value={status}>{status}</option>
    //                                 ))}
    //                             </select>
    //                             <select
    //                                     style={{ width: '20%', fontSize: '14px' }}
    //                                     className="form-select me-2"
    //                                     aria-label="Company Search"
    //                                     value={companyQuery}
    //                                     onChange={(e) => setCompanyQuery(e.target.value)}
    //                                 >
    //                                     <option value="">Company</option>
    //                                     {payrollNames.map((name, index) => (
    //                                         <option key={index} value={name}>{name}</option>
    //                                     ))}
    //                                 </select>
    //                             <input
    //                                 style={{ width: '35%', fontSize: '14px' }}
    //                                 className="form-control me-2"
    //                                 type="search"
    //                                 placeholder="name"
    //                                 aria-label="Name Search"
    //                                 value={nameQuery}
    //                                 onChange={(e) => setNameQuery(e.target.value)}
    //                             />
    //                              <input
    //                                     style={{ width: '35%', fontSize: '14px' }}
    //                                     className="form-control me-2"
    //                                     type="search"
    //                                     placeholder="ID"
    //                                     aria-label="Name Search"
    //                                     value={IdQuery}
    //                                     onChange={(e) => setIdQuery(e.target.value)}
    //                                 />
    //                             <div className='dateparam'>
    //                                 <DatePicker
    //                                     selected={startDate}
    //                                     onChange={date => setStartDate(date)}
    //                                     placeholderText="Send Start Date"
    //                                     dateFormat="dd/MM/yyyy"
    //                                     className="form-control"
    //                                     style={{ width: '25%', fontSize: '14px', marginRight: '10px' }}
    //                                 />
    //                                 {/* End Date input */}
    //                                 <DatePicker
    //                                     selected={endDate}
    //                                     onChange={date => setEndDate(date)}
    //                                     placeholderText="Send End Date"
    //                                     dateFormat="dd/MM/yyyy"
    //                                     className="form-control"
    //                                     style={{ width: '25%', fontSize: '14px', marginRight: '10px' }}
    //                                 />
    //                             </div>
    //                             <div className='dateparam'>
    //                                     <DatePicker
    //                                         selected={acceptDateStart}
    //                                         onChange={date => setAcceptDateStart(date)}
    //                                         placeholderText="Accept Start Date"
    //                                         dateFormat="dd/MM/yyyy"
    //                                         className="form-control"
    //                                         style={{ width: '25%', fontSize: '14px', marginRight: '10px' }}
    //                                     />
    //                                     {/* End Date input */}
    //                                     <DatePicker
    //                                         selected={acceptDateEnd}
    //                                         onChange={date => setAcceptDateEnd(date)}
    //                                         placeholderText="Accept End Date"
    //                                         dateFormat="dd/MM/yyyy"
    //                                         className="form-control"
    //                                         style={{ width: '25%', fontSize: '14px', marginRight: '10px' }}
    //                                     />
    //                                 </div>
    //                             <button className="btn btn-primary" style={{ color: 'white', marginTop: '10px' }} type="submit">Search</button>
    //                         </form>
    //                     </div>
    //                 </div>
    //             </div>
    //             {loading && <p>Loading...</p>}
    //             {notFound && <p className='text-red-500 font-bold m-4 text-lg'>Not Found!</p>}

    //             {searchResults.length > 0 && (
    //                 <button className="btn btn-primary" style={{ width: '9%', margin: '10px' }} onClick={handleExportExcel}>Export as Excel</button>
    //             )}
    //             <div className='search-body'>
    //                 {searchResults.length > 0 && (
    //                     <table className='table table-striped'>
    //                         <thead className='table-info'>
    //                             <tr>
    //                                 <th>Transaction ID</th>
    //                                 <th>Payee ID</th>
    //                                 <th>Payee Name</th>
    //                                 <th>Cash Amount</th>
    //                                 <th>Payroll Month</th>
    //                                 <th>Sent Time</th>
    //                                 <th>Accepted Time</th>
    //                                 <th>Company</th>
    //                                 <th>Status</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             {searchResults.map((item, i) => (
    //                                 <tr key={i}>
    //                                     <td>{item.TRANSACTION_ID}</td>
    //                                     <td>{item.PAYEE_ID}</td>
    //                                     <td>{item.PAYEE_NAME}</td>
    //                                     <td>{item.CASH_AMOUNT}</td>
    //                                     <td>{item.PAYROLL_MONTH}</td>
    //                                     <td>{formatDate(item.CREATION_DATE)}</td>
    //                                     <td>{formatDate(item.LAST_UPDATE_DATE)}</td>
    //                                     <td>{item.PAYROLL_NAME}</td>
    //                                     <td>{item.STATUS}</td>
    //                                 </tr>
    //                             ))}
    //                         </tbody>
    //                     </table>
    //                 )}
    //             </div>
    //         </div>
    //         {/* <div className='col-1'>
    //                 <div className='right' style={{ height: '638px', width: '197px' }}>
    //                     <img src={profile} className='icon' alt="Profile" width="30" height="24" />
    //                     <div className='text-light p-3 fw-bold'>
    //                         <p>ID: {profileInfo.EMPLOYEE_ID}</p>
    //                         <p>Name: {profileInfo.EMPLOYEE_NAME}</p>
    //                     </div>
    //                 </div>
    //             </div> */}

    //     </div>
    // </div >
    <div>

{/* <nav className="navbar bg-blue-100">
    <div className="container">
        <a className="navbar-brand" href="#">
            <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
        </a>
        <div className='nav'>
            <Link to='/create' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-success" style={{ color: 'white' }}>Salary Payment</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-warning" style={{ color: 'white' }}>iExpense</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className='profile'>
            <div className="flex space-x-4 text-sky-900">
                <svg fill='currentcolor' xmlns="http://www.w3.org/2000/svg" height="20px" width="10px" viewBox="0 0 192 512">
                    <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zm128 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64z" />
                </svg>
                <p className='text-sm text-blue-700' >Logged In As <br></br>{profileInfo.EMPLOYEE_ID}</p>
            </div>
           
        </div>
        <div className='text-danger'>

            <svg fill='currentcolor' style={{ marginLeft: '-10px', marginBottom: '-40px' }} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
            &nbsp; &nbsp;<button style={{ marginRight: '30px', marginTop: '10px', color: 'white' }} className='btn btn-error' onClick={handleLogout}>Logout</button>
        </div>
    </div>
</nav > */}
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
                    <Link to='/SCBLFO_SEND' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-success" style={{ color: 'white' }}>Cash Payment</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <Link to='' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-warning" style={{ color: 'white' }}>iExpense</button></Link>&nbsp;&nbsp;&nbsp;&nbsp; */}

                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Buttons for notifications and logout */}
                <div className="flex space-x-4 text-sky-900 hidden sm:ml-6 sm:block">
                    <svg style={{ marginTop: '15%' }} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" height="20px" width="10px" viewBox="0 0 192 512">
                        <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zm128 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64z" />
                    </svg>
                    <p className='text-sm text-blue-700 ' style={{ marginTop: '-20%' }}>Logged In As <br></br>{profileInfo.EMPLOYEE_ID}</p>
                </div>


                <button className="btn  btn-error ml-3" style={{ color: 'white' }} onClick={handleLogout}>
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


        <Link to='/SCBLFO_SEND' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-success" style={{ color: 'white' }}>Cash Payment</button></Link><br />
        {/* <Link to='' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-warning" style={{ color: 'white' }}>iExpense</button></Link>&nbsp;&nbsp;&nbsp;&nbsp; */}
        <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Menu items */}
            <p className='text-sm text-blue-700'>Logged In As {profileInfo.EMPLOYEE_ID}</p>
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
                aria-label="ID Search"
                value={IdQuery}
                onChange={(e) => setIdQuery(e.target.value)}
            />
            <input
                style={{ fontSize: '14px' }}
                className="form-control me-2 mb-2 md:mb-0"
                type="search"
                placeholder="Month"
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
                value={companyQuery}
                onChange={(e) => setCompanyQuery(e.target.value)}
            >
                <option value="">Company</option>
                {payrollNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
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
            <input
                style={{ fontSize: '14px' }}
                className="form-control me-2 mb-2 md:mb-0"
                type="search"
                placeholder="Name"
                aria-label="Name Search"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
            />

            <div className='dateparam' style={{ width: '200%', fontSize: '14px' }}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    placeholderText="Send Start"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"

                />
                {/* End Date input */}
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    placeholderText="Send End"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"

                />
            </div>
            <div className='dateparam' style={{ marginLeft: '1%', width: '200%', fontSize: '14px' }}>
                <DatePicker
                    selected={acceptDateStart}
                    onChange={date => setAcceptDateStart(date)}
                    placeholderText="Accept Start"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    style={{ width: '25%', fontSize: '14px', marginRight: '10px' }}
                />
                {/* End Date input */}
                <DatePicker
                    selected={acceptDateEnd}
                    onChange={date => setAcceptDateEnd(date)}
                    placeholderText="Accept End"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    style={{ width: '25%', fontSize: '14px', marginRight: '10px' }}
                />
            </div>
            <button className="btn btn-primary" type="submit" style={{ marginTop: '2%', marginLeft: '1%' }}>Search</button>
        </form>
    </div>
</div>
{loading && <p>Loading...</p>}
{notFound && <p className='text-red-500 font-bold m-4 text-lg'>Not Found!</p>}
{searchResults.length > 0 && (
    <button className="btn btn-primary" style={{ width: '9%', margin: '10px' }} onClick={handleExportExcel}>Export as Excel</button>
)}

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
                                Cash Amount: {item.CASH_AMOUNT}<br />
                                Payment Method: {item.PAYMENT_METHOD}<br/>
                                Payroll Period: {item.PAYROLL_MONTH}<br />
                                Status: {item.STATUS}<br />

                                Transaction ID: {item.TRANSACTION_ID}<br />

                                Sent Time: {formatDate(item.CREATION_DATE)}<br />
                                Accepted Time: {formatDate(item.LAST_UPDATE_DATE)}




                            </p>

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
                        <th>Transaction ID</th>
                        <th>Payee ID</th>
                        <th>Payee Name</th>
                        <th>Cash Amount</th>
                        <th>Payroll Month</th>
                        <th>Sent Time</th>
                        <th>Accepted Time</th>
                        <th>Company</th>
                        <th>Payment Method</th>
                        <th>Status</th>

                    </tr>
                </thead>
            )}
            <tbody>
                {searchResults.map(item => (
                    <tr key={item.PAYEE_ID}>
                        <td>{item.TRANSACTION_ID}</td>
                        <td>{item.PAYEE_ID}</td>
                        <td>{item.PAYEE_NAME}</td>
                        <td>{item.CASH_AMOUNT}</td>
                        <td>{item.PAYROLL_MONTH}</td>
                        <td>{formatDate(item.CREATION_DATE)}</td>
                        <td>{formatDate(item.LAST_UPDATE_DATE)}</td>
                        <td>{item.PAYROLL_NAME}</td>
                        <td>{item.PAYMENT_METHOD}</td>
                        <td>{item.STATUS}</td>

                    </tr>
                ))}
            </tbody>
        </table>


    )}
</div>









</div >
    );
};

export default KaligonjHome;
