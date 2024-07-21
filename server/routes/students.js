const router = require('express').Router();
const db = require('../db');

// Register a new student
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const newStudent = await db.query(
            'INSERT INTO students (name, email, phone, address) VALUES($1, $2, $3, $4) RETURNING *',
            [name, email, phone, address]
        );
        res.json(newStudent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get application status
router.get('/status/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const result = await db.query('SELECT status FROM students WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;