import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required('Email is a required field'),
      old_password: Yup.string().min(
        6,
        'Password must be at least 6 characters'
      ),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .when('old_password', (old_password, field) =>
          old_password ? field.required('You must to send the password') : field
        ),
      password_confirmation: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('You must to confirm the password')
              .oneOf([Yup.ref('password')])
          : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
