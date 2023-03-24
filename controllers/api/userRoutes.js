const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = {
        id: userData.id,
        name: userData.name,
        location: userData.location,
        zodiac: userData.zodiac,
        bio: userData.bio,
        gender: userData.gender,
        birthday: userData.birthday,
        favorite_food: userData.favorite_food,
        what_to_eat: userData.what_to_eat,
        profile_pic: userData.profile_pic,
      };
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// will be done in the '/signup' path but leaving blank for now
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      gender: req.body.gender,
      birthday: req.body.birthday,
      favorite_food: req.body.favorite_food,
      location: req.body.location,
      what_to_eat: req.body.what_to_eat,
      profile_pic: req.body.profile_pic,
      zodiac: req.body.zodiac,
    });
    // req.session.save(() => {
    //   req.session.logged_in = true;
    //   req.session.user = {
    //     id: userData.id,
    //     name: userData.name,
    //     location: userData.location,
    //     zodiac: userData.zodiac,
    //     bio: userData.bio,
    //     gender: userData.gender,
    //     birthday: userData.birthday,
    //     favorite_food: userData.favorite_food,
    //     what_to_eat: userData.what_to_eat,
    //     profile_pic: userData.profile_pic,
    //   };
    // });
    res.status(200).json(dbUserData);
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
