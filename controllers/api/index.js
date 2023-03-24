const router = require('express').Router();
const userRoutes = require('./userRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const dateRoutes = require('./dateRoutes');
const messageRoutes = require('./messageRoutes');

router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/dates', dateRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
