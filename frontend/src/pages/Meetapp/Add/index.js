import React, { useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import { useDispatch } from "react-redux";
import { MdAddCircleOutline } from "react-icons/md";

import { createMeetappRequest } from "~/store/modules/meetapp/actions";

import { Container } from "./styles";

import Banner from "~/components/Banner";
import SelectDate from "~/components/DatePicker";

export default function NewMeetapp() {
  const dispatch = useDispatch();

  const [date, setDate] = useState();

  async function handleSubmit(data) {
    dispatch(createMeetappRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
        <SelectDate selected={date} setSelected={setDate} name="date" />
        <Input name="location" placeholder="Localização" />

        <button className="submit-button" type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <p>Salvar meetapp</p>
        </button>
      </Form>
    </Container>
  );
}
