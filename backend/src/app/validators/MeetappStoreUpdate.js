import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required('Title is a required field'),
      file_id: Yup.number().required('ID File is a required field'),
      description: Yup.string().required('Description is a required field'),
      location: Yup.string().required('Location is a required field'),
      date: Yup.date().required('Date is a required field'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
