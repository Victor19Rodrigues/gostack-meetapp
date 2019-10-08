import Meetapp from '../models/Meetapp';

class OrganizerController {
  async index(req, res) {
    const meetapps = await Meetapp.findAll({ where: { user_id: req.userId } });

    return res.json(meetapps);
  }
}

export default new OrganizerController();
