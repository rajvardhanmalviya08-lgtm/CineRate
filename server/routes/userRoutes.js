const express = require('express');
const router = express.Router();
const { getUserDashboardStats } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/dashboard-stats', protect, getUserDashboardStats);

module.exports = router;

