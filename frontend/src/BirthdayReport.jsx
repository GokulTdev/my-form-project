import { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './BirthdayReport.css';

function BirthdayReport() {

    const [users, setUsers] = useState([]);

    const [selectedDays, setSelectedDays] = useState(null);

    const [loading, setLoading] = useState(false);


    // Get birthday data from backend

    const getBirthdays = async (days) => {

        setLoading(true);

        setSelectedDays(days);

        try {

            const response = await axios.get(
                `http://localhost:5000/api/birthdays/${days}`
            );

            setUsers(response.data.data);

        } catch (error) {

            console.log(error);

            alert('Unable to get birthday details');

            setUsers([]);

        } finally {

            setLoading(false);

        }

    };


    // Export data to Excel

    const exportToExcel = () => {

        if (users.length === 0) {

            alert('No data available to export');

            return;

        }


        const excelData = [];


        users.forEach((user) => {

            excelData.push({

                ID: user.id,

                Name: user.name,

                Email: user.email,

                District: user.district,

                Pincode: user.pincode,

                'Mobile Number': user.mobile_number,

                Person: 'Person 1',

                'Person Name': user.person1,

                'Date of Birth': user.person1_dob,

                'Blood Group': user.blood_group,

                'Nick Name': user.nick_name,

                'Person Mobile Number': user.person_mobile_number

            });


            excelData.push({

                ID: user.id,

                Name: user.name,

                Email: user.email,

                District: user.district,

                Pincode: user.pincode,

                'Mobile Number': user.mobile_number,

                Person: 'Person 2',

                'Person Name': user.person2,

                'Date of Birth': user.person2_dob,

                'Blood Group': user.blood_group,

                'Nick Name': user.nick_name,

                'Person Mobile Number': user.person_mobile_number

            });

        });


        const worksheet = XLSX.utils.json_to_sheet(excelData);

        const workbook = XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            'Birthday Report'
        );


        XLSX.writeFile(
            workbook,
            `Birthday_Report_${selectedDays}_Days_Prior.xlsx`
        );

    };


    return (

        <div className="birthday-page">

            <div className="birthday-container">


                <div className="page-header">

                    <h1>Birthday Report</h1>

                    <p>
                        View users based on their upcoming birthday reminder dates.
                    </p>

                </div>


                {/* Buttons */}

                <div className="button-section">


                    <button
                        className={
                            selectedDays === 15
                                ? 'active'
                                : ''
                        }
                        onClick={() => getBirthdays(15)}
                    >
                        15 Days Prior
                    </button>


                    <button
                        className={
                            selectedDays === 7
                                ? 'active'
                                : ''
                        }
                        onClick={() => getBirthdays(7)}
                    >
                        7 Days Prior
                    </button>


                    <button
                        className={
                            selectedDays === 3
                                ? 'active'
                                : ''
                        }
                        onClick={() => getBirthdays(3)}
                    >
                        3 Days Prior
                    </button>


                </div>


                {/* Export */}

                <div className="export-section">

                    <button
                        className="export-button"
                        onClick={exportToExcel}
                        disabled={users.length === 0}
                    >
                        Export to Excel
                    </button>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="loading">
                        Loading birthday details...
                    </div>

                )}


                {/* Result */}

                {!loading && selectedDays !== null && (

                    <div className="result-info">

                        <strong>
                            Birthday: {selectedDays} days prior
                        </strong>

                        <span>
                            {users.length} record(s) found
                        </span>

                    </div>

                )}


                {/* Table */}

                {!loading && users.length > 0 && (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>District</th>

                                    <th>Pincode</th>

                                    <th>Mobile Number</th>

                                    <th>Person 1</th>

                                    <th>Person 1 DOB</th>

                                    <th>Person 2</th>

                                    <th>Person 2 DOB</th>

                                    <th>Blood Group</th>

                                    <th>Nick Name</th>

                                    <th>Person Mobile</th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map((user) => (

                                    <tr key={user.id}>

                                        <td>
                                            {user.id}
                                        </td>

                                        <td>
                                            {user.name}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.district}
                                        </td>

                                        <td>
                                            {user.pincode}
                                        </td>

                                        <td>
                                            {user.mobile_number}
                                        </td>

                                        <td>
                                            {user.person1}
                                        </td>

                                        <td>
                                            {formatDate(user.person1_dob)}
                                        </td>

                                        <td>
                                            {user.person2}
                                        </td>

                                        <td>
                                            {formatDate(user.person2_dob)}
                                        </td>

                                        <td>
                                            {user.blood_group}
                                        </td>

                                        <td>
                                            {user.nick_name}
                                        </td>

                                        <td>
                                            {user.person_mobile_number}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}


                {/* No Data */}

                {!loading &&
                    selectedDays !== null &&
                    users.length === 0 && (

                        <div className="no-data">

                            No birthday records found.

                        </div>

                    )}


            </div>

        </div>

    );

}


// Format date

function formatDate(date) {

    if (!date) {
        return '';
    }

    const dateObject = new Date(date);

    return dateObject.toLocaleDateString('en-IN');

}


export default BirthdayReport;