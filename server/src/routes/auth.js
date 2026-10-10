const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const controller = require('../controllers/authController');

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.get('/me', requireAuth, controller.me);

module.exports = router;
