const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const { optionalAuth } = require('../middleware/auth');
const controller = require('../controllers/templateController');

router.get('/', optionalAuth, asyncHandler(controller.list));
router.get('/categories', asyncHandler(controller.categories));
router.get('/:id', optionalAuth, asyncHandler(controller.getOne));

module.exports = router;
