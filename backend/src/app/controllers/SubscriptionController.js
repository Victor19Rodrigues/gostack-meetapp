import { Op } from 'sequelize';

import User from '../models/User';
import Meetapp from '../models/Meetapp';
import Subscription from '../models/Subscription';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'user_id'],
      include: [
        {
          model: Meetapp,
          where: {
            date: {
              [Op.gt]: new Date(), // greater than
            },
          },
          attributes: ['id', 'title', 'description', 'location', 'date'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: File,
              as: 'file',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: [[Meetapp, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);

    const meetapp = await Meetapp.findByPk(req.params.meetappId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (meetapp.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetapps" });
    }

    if (meetapp.past) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to past meetapps" });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetapp,
          required: true,
          where: {
            date: meetapp.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetapps at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetapp_id: meetapp.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetapp,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(400).json({
        message: 'You are not subscribed to this meetapp',
      });
    }

    await subscription.destroy();

    return res.json({ message: 'Subscription successfully canceled' });
  }
}

export default new SubscriptionController();
