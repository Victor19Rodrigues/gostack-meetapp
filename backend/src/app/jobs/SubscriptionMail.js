import { format, parseISO } from 'date-fns';
import us from 'date-fns/locale/en-US';

import Mail from '../../lib/Mail';

const formatDate = data => format(data, "MMMM dd', at' H'h'", { locale: us });

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetapp, user } = data;

    await Mail.sendMail({
      to: `${meetapp.user.name} <${meetapp.user.email}>`,
      subject: `[${meetapp.title}] signed up for your new Meetapp`,
      template: 'subscription',
      context: {
        organizer: meetapp.user.name,
        meetapp: meetapp.title,
        user: user.name,
        email: user.email,
        meetappDate: formatDate(parseISO(meetapp.date)),
        sendDate: formatDate(new Date()),
      },
    });
  }
}

export default new SubscriptionMail();
