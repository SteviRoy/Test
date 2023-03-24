const router = require('express').Router();
const { Restaurant } = require('../../models');

// GET all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurantsData = await Restaurant.findAll();
    res.status(200).json(restaurantsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single restaurant by id
router.get('/:id', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id);
    if (!restaurantData) {
      res.status(404).json({ message: 'No restaurant found with this id!' });
      return;
    }
    res.status(200).json(restaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new restaurant
router.post('/', async (req, res) => {
  try {
    const newRestaurantData = await Restaurant.create(req.body);
    res.status(201).json(newRestaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update a restaurant by id
router.put('/:id', async (req, res) => {
  try {
    const updatedRestaurantData = await Restaurant.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedRestaurantData[0]) {
      res.status(404).json({ message: 'No restaurant found with this id!' });
      return;
    }
    res.status(200).json(updatedRestaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a restaurant by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedRestaurantData = await Restaurant.destroy({
      where: { id: req.params.id },
    });
    if (!deletedRestaurantData) {
      res.status(404).json({ message: 'No restaurant found with this id!' });
      return;
    }
    res.status(200).json(deletedRestaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;