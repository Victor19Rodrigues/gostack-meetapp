import Mail from '../../lib/Mail';

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
      },
    });
  }
}

export default new SubscriptionMail();
