const express = require('express');
const { registerAdmin, loginAdmin, logoutAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', protect, logoutAdmin);

module.exports = router;