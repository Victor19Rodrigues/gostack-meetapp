import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
// import { parseISO } from "date-fns";
// import { zonedTimeToUtc } from "date-fns-tz";

import api from "~/services/api";
import history from "~/services/history";

import {
  createMeetappSuccess,
  createMeetappFailure,
  deleteMeetappSuccess,
  deleteMeetappFailure
} from "./actions";

export function* createMeetapp({ payload }) {
  try {
    const { file_id, title, description, date, location } = payload.data;

    // const parsedDate = parseISO(date);
    // console.tron.log(parsedDate);

    // const znDate = zonedTimeToUtc(parsedDate, "America/Sao_Paulo");

    const meetapp = {
      title,
      description,
      date,
      location,
      file_id
    };
    console.tron.log(meetapp);
    const response = yield call(api.post, "meetups", meetapp);

    toast.success("Meetapp criado com sucesso!");

    yield put(createMeetappSuccess(response.data));

    history.push("/dashboard");
  } catch (err) {
    toast.error("Erro ao criar meetapp, confira seus dados!");

    yield put(createMeetappFailure());
  }
}

export function* deleteMeetapp({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `meetups/${id}`);

    toast.success("Meetapp cancelado com sucesso!");

    yield put(deleteMeetappSuccess(response.data));

    history.push("/dashboard");
  } catch (err) {
    toast.error("Erro ao cancelar meetapp, confira seus dados!");

    yield put(deleteMeetappFailure());
  }
}

export function* editMeetapp({ payload }) {
  try {
    const { file_id, title, description, date, location, id } = payload.data;

    // const parsedDate = parseISO(date);
    // console.tron.log(parsedDate);

    // const znDate = zonedTimeToUtc(parsedDate, "America/Sao_Paulo");

    const meetapp = {
      title,
      description,
      date,
      location,
      file_id,
      id
    };
    console.tron.log(meetapp);
    const response = yield call(api.put, `meetups/${id}`, meetapp);

    toast.success("Meetapp editado com sucesso!");

    yield put(createMeetappSuccess(response.data));

    history.push("/dashboard");
  } catch (err) {
    toast.error("Erro ao editar meetapp, confira seus dados!");

    yield put(createMeetappFailure());
  }
}

export default all([
  takeLatest("@meetapp/CREATE_MEETAPP_REQUEST", createMeetapp),
  takeLatest("@meetapp/DELETE_MEETAPP_REQUEST", deleteMeetapp),
  takeLatest("@meetapp/EDIT_MEETAPP_REQUEST", editMeetapp)
]);
