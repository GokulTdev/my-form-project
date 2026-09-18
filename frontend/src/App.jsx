import { useState } from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import BirthdayReport from './BirthdayReport';

import './App.css';

function PersonForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        district: '',
        pincode: '',
        mobileNumber: '',
        person1: '',
        person2: '',
        person1Dob: '',
        person2Dob: '',
        bloodGroup: '',
        nickName: '',
        personMobileNumber: ''
    });


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'http://localhost:5000/api/persons',
                formData
            );

            alert(response.data.message);

            // Clear form
            setFormData({
                name: '',
                email: '',
                district: '',
                pincode: '',
                mobileNumber: '',
                person1: '',
                person2: '',
                person1Dob: '',
                person2Dob: '',
                bloodGroup: '',
                nickName: '',
                personMobileNumber: ''
            });

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert('Unable to connect to server');

            }

        }

    };


    return (

        <div className="page">

            <div className="form-container">

                <h1>Person Information Form</h1>

                <p className="form-description">
                    Please enter the required information below.
                </p>


                <form onSubmit={handleSubmit}>


                    {/* Name */}

                    <div className="form-group">

                        <label>
                            Name <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                    </div>


                    {/* Email */}

                    <div className="form-group">

                        <label>
                            Email <span>*</span>
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    {/* District */}

                    <div className="form-group">

                        <label>
                            District <span>*</span>
                        </label>

                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select District
                            </option>

                            <option value="Chennai">
                                Chennai
                            </option>

                            <option value="Coimbatore">
                                Coimbatore
                            </option>

                            <option value="Erode">
                                Erode
                            </option>

                            <option value="Madurai">
                                Madurai
                            </option>

                            <option value="Namakkal">
                                Namakkal
                            </option>

                            <option value="Salem">
                                Salem
                            </option>

                            <option value="Tiruchirappalli">
                                Tiruchirappalli
                            </option>

                            <option value="Tiruppur">
                                Tiruppur
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Pincode */}

                    <div className="form-group">

                        <label>
                            Pincode <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="Enter pincode"
                            maxLength="6"
                            pattern="[0-9]{6}"
                            required
                        />

                    </div>


                    {/* Mobile Number */}

                    <div className="form-group">

                        <label>
                            Mobile Number <span>*</span>
                        </label>

                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            required
                        />

                    </div>


                    {/* Two Person Fields */}

                    <div className="two-column">


                        <div className="form-group">

                            <label>
                                Person 1 <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="person1"
                                value={formData.person1}
                                onChange={handleChange}
                                placeholder="Enter person 1"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Person 2 <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="person2"
                                value={formData.person2}
                                onChange={handleChange}
                                placeholder="Enter person 2"
                                required
                            />

                        </div>

                    </div>


                    {/* DOB */}

                    <div className="two-column">


                        <div className="form-group">

                            <label>
                                Person 1 DOB <span>*</span>
                            </label>

                            <input
                                type="date"
                                name="person1Dob"
                                value={formData.person1Dob}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Person 2 DOB <span>*</span>
                            </label>

                            <input
                                type="date"
                                name="person2Dob"
                                value={formData.person2Dob}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* Blood Group */}

                    <div className="form-group">

                        <label>
                            Blood Group <span>*</span>
                        </label>

                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Blood Group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>

                    </div>


                    {/* Nick Name */}

                    <div className="form-group">

                        <label>
                            Nick Name
                        </label>

                        <input
                            type="text"
                            name="nickName"
                            value={formData.nickName}
                            onChange={handleChange}
                            placeholder="Enter nick name"
                        />

                    </div>


                    {/* Person Mobile Number */}

                    <div className="form-group">

                        <label>
                            Person Mobile Number <span>*</span>
                        </label>

                        <input
                            type="tel"
                            name="personMobileNumber"
                            value={formData.personMobileNumber}
                            onChange={handleChange}
                            placeholder="Enter person mobile number"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            required
                        />

                    </div>


                    {/* Submit */}

                    <button type="submit">
                        Submit
                    </button>


                </form>

            </div>

        </div>

    );

}

function App() {

    return (
        <BrowserRouter>

            <nav className="navigation">

                <Link to="/">
                    Home
                </Link>

                <Link to="/birthday-report">
                    Birthday Report
                </Link>

            </nav>


            <Routes>

                <Route
                    path="/"
                    element={<PersonForm />}
                />

                <Route
                    path="/birthday-report"
                    element={<BirthdayReport />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;