const express = require('express');

const router = express.Router();

const db = require('../db');


// CREATE PERSON
router.post('/persons', (req, res) => {

    const {
        name,
        email,
        district,
        pincode,
        mobileNumber,
        person1,
        person2,
        person1Dob,
        person2Dob,
        bloodGroup,
        nickName,
        personMobileNumber
    } = req.body;


    // Basic validation
    if (
        !name ||
        !email ||
        !district ||
        !pincode ||
        !mobileNumber ||
        !person1 ||
        !person2 ||
        !person1Dob ||
        !person2Dob ||
        !bloodGroup ||
        !personMobileNumber
    ) {
        return res.status(400).json({
            message: "Please fill all required fields"
        });
    }


    const sql = `
        INSERT INTO persons
        (
            name,
            email,
            district,
            pincode,
            mobile_number,
            person1,
            person2,
            person1_dob,
            person2_dob,
            blood_group,
            nick_name,
            person_mobile_number
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
        name,
        email,
        district,
        pincode,
        mobileNumber,
        person1,
        person2,
        person1Dob,
        person2Dob,
        bloodGroup,
        nickName,
        personMobileNumber
    ];


    db.query(sql, values, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database error",
                error: err.message
            });

        }


        res.status(201).json({
            message: "Form submitted successfully",
            id: result.insertId
        });

    });

});


module.exports = router;