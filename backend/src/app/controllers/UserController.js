import User from '../models/User';
import Notification from '../schemas/Notification';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    await Notification.create({
      user: id,
      content: `Welcome to Meetapp!`,
    });

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
