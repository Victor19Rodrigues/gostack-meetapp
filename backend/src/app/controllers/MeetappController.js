import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';

import Meetapp from '../models/Meetapp';
import User from '../models/User';
import File from '../models/File';
import Subscription from '../models/Subscription';

class MeetappController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetapps = await Meetapp.findAll({
      where,
      order: ['date'],
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
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(meetapps);
  }

  async store(req, res) {
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date already past' });
    }

    const user_id = req.userId;

    const meetapp = await Meetapp.create({
      ...req.body,
      user_id,
    });

    return res.json(meetapp);
  }

  async update(req, res) {
    const user_id = req.userId;

    const meetapp = await Meetapp.findByPk(req.params.id);

    if (meetapp.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date already past' });
    }

    if (meetapp.past) {
      return res.status(400).json({ error: "Can't update past meetapps." });
    }

    await meetapp.update(req.body);

    return res.json(meetapp);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetapp = await Meetapp.findByPk(req.params.id);

    if (meetapp.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (meetapp.past) {
      return res.status(400).json({ error: "Can't delete past meetapps." });
    }

    await meetapp.destroy();

    return res.status(200).send();
  }

  async show(req, res) {
    const { id } = req.params;

    const meetapp = await Meetapp.findByPk(id, {
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
        {
          model: Subscription,
          as: 'subscribers',
          attributes: ['user_id'],
        },
      ],
    });

    if (!meetapp) {
      return res.status(400).json({ error: 'Meetapp does not exists' });
    }

    return res.status(200).json({ meetapp });
  }
}

export default new MeetappController();
