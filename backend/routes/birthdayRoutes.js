const express = require('express');

const router = express.Router();

const db = require('../db');


// Get upcoming birthday details based on days
router.get('/birthdays/:days', (req, res) => {

    const days = parseInt(req.params.days);

    // Allow only 3, 7 and 15
    if (![3, 7, 15].includes(days)) {
        return res.status(400).json({
            message: 'Invalid days. Use 3, 7 or 15.'
        });
    }


    const sql = `
        SELECT
            id,
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
        FROM persons
        WHERE
            DATE_FORMAT(person1_dob, '%m-%d') =
            DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL ? DAY), '%m-%d')

            OR

            DATE_FORMAT(person2_dob, '%m-%d') =
            DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL ? DAY), '%m-%d')

        ORDER BY id DESC
    `;


    db.query(
        sql,
        [days, days],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                });

            }


            res.status(200).json({
                daysUpcoming: days,
                count: results.length,
                data: results
            });

        }
    );

});


module.exports = router;