import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('name is a required field'),
      email: Yup.string()
        .email()
        .required('e-mail is a required field'),
      password: Yup.string()
        .required('password is a required field')
        .min(6, 'password must be at least 6 characters'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
