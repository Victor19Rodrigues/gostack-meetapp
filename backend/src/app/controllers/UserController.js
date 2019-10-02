import * as Yup from 'yup';
import User from '../models/User';
import Notification from '../schemas/Notification';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('name is a required field'),
      email: Yup.string()
        .email()
        .required('e-mail is a required field'),
      password: Yup.string()
        .required('password is a required field')
        .min(6, 'password must be at least 6 characters'),
    });

    try {
      await schema.validate(req.body, { abortEarly: true });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

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
