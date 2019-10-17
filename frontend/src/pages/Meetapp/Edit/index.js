import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import { MdAddCircleOutline } from "react-icons/md";

import { editMeetappRequest } from "~/store/modules/meetapp/actions";

import Banner from "~/components/Banner";
import SelectDate from "~/components/DatePicker";

import history from "~/services/history";

import { Container } from "./styles";

export default function EditMeetapp() {
  const dispatch = useDispatch();
  let meetapp = {};

  meetapp = useSelector(state => state.user.meetapp);

  if (history.location.state !== undefined) {
    meetapp = history.location.state.meetapp; // eslint-disable-line
  }

  function handleSubmit(data) {
    const dataEdit = {
      ...data,
      id: meetapp.id
    };

    dispatch(editMeetappRequest(dataEdit));
  }

  return (
    <Container>
      <Form initialData={meetapp} onSubmit={handleSubmit}>
        <Banner name="file_id" />

        <Input name="title" placeholder="Título do meetapp" />
        <Input
          className="description"
          multiline
          cols="30"
          rows="5"
          name="description"
          placeholder="Descrição completa"
        />
        <SelectDate name="date" />

        <Input name="location" placeholder="Localização" />
        <button className="submit-button" type="submit">
          <MdAddCircleOutline color="#fff" size={20} />
          <p>Salvar meetup</p>
        </button>
      </Form>
    </Container>
  );
}
