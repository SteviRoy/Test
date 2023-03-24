const User = require('./User');
const Restaurant = require('./Restaurant');
const Date = require('./Date');
const Message = require('./Message');

User.hasMany(Date, {
  foreign_key: 'user_id',
  onDelete: 'CASCADE',
});

Date.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Message, {
  foreignKey: 'sender_id',
  as: 'sender',
});

Message.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender',
});

User.hasMany(Message, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

Message.belongsTo(User, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

User.belongsToMany(User, {
  through: { model: Message },
  foreignKey: 'receiver_id',
  as: 'date_partners',
});

User.belongsToMany(User, {
  through: { model: Message },
  foreignKey: 'sender_id',
  as: 'date_asker',
});

Restaurant.hasMany(Date, {
  foreignKey: 'restaurant_id',
});

Date.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
});

module.exports = { User, Restaurant, Date, Message };
