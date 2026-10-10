const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const controller = require('../controllers/favoriteController');

router.use(requireAuth);
router.get('/', asyncHandler(controller.list));
router.post('/:templateId', asyncHandler(controller.add));
router.delete('/:templateId', asyncHandler(controller.remove));

module.exports = router;
