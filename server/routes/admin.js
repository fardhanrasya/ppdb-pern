const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get all students (protected route)
router.get('/students', auth, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM students ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update student status (protected route)
router.put('/students/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updateStudent = await db.query(
            'UPDATE students SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (updateStudent.rows.length === 0) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        res.json(updateStudent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;