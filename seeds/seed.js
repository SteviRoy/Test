const sequelize = require('../config/connection');
const { User, Restaurant, Date, Message } = require('../models');

const rawRestaurantData01 = require('./restaurantData.json');
const rawRestaurantData02 = require('./restaurantData2.json');
const userData = require('./userData.json');
const datesData = require('./dateData.json');
const messageData = require('./messageData.json');

const filteredData = rawRestaurantData01.filter(

  ({
    dba,
    boro,
    cuisine_description, // eslint-disable-line
    latitude,
    longitude,
    building,
    street,
    zipcode,
  }) =>
 
    dba &&
    boro &&
    cuisine_description && // eslint-disable-line
    latitude &&
    longitude &&
    building &&
    street &&
    zipcode
);

const filteredData2 = rawRestaurantData02.filter(
  ({
    dba,
    boro,
    cuisine_description, // eslint-disable-line
    latitude,
    longitude,
    building,
    street,
    zipcode,
  }) =>
    dba &&
    boro &&
    cuisine_description && // eslint-disable-line
    latitude &&
    longitude &&
    building &&
    street &&
    zipcode
);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Restaurant.bulkCreate(filteredData, {
    individualHooks: true,
    returning: true,
  });

  await Restaurant.bulkCreate(filteredData2, {
    individualHooks: true,
    returning: true,
  });

  await Date.bulkCreate(datesData, {
    returning: true,
  });

  await Message.bulkCreate(messageData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
