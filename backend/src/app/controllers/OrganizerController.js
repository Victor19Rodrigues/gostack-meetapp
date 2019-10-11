import Meetapp from '../models/Meetapp';
import File from '../models/File';

class OrganizerController {
  async index(req, res) {
    const meetapps = await Meetapp.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetapps);
  }
}

export default new OrganizerController();
