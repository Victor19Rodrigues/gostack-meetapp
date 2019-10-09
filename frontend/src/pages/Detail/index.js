import React from "react";
import { MdDeleteForever, MdModeEdit, MdEvent, MdPlace } from "react-icons/md";
import { useDispatch } from "react-redux";

import history from "~/services/history";
import { deleteMeetappRequest } from "~/store/modules/meetapp/actions";

import { Container } from "./styles";

export default function Detail() {
  const dispatch = useDispatch();

  const informationMeetapp = history.location.state.meetapp.meetapp;

  const { time } = history.location.state.meetapp;

  function handleEdit(value) {
    value.isEdit = true;
    history.push("/edit", { meetapp: value });
  }

  function handleDelete(id) {
    dispatch(deleteMeetappRequest(id));
  }

  return (
    <Container>
      <header>
        <strong>{informationMeetapp.title}</strong>
        <div>
          <button
            className="edit-button"
            type="submit"
            onClick={() => handleEdit(informationMeetapp)}
          >
            <MdModeEdit color="#fff" size={20} />
            <p>Editar</p>
          </button>
          <button
            className="delete-button"
            type="submit"
            onClick={() => handleDelete(informationMeetapp.id)}
          >
            <MdDeleteForever color="#fff" size={20} />
            <p>Cancelar</p>
          </button>
        </div>
      </header>
      <content>
        <div>
          <img
            src={informationMeetapp.File.url}
            alt={informationMeetapp.title}
          />
          <p
            dangerouslySetInnerHTML={{ __html: informationMeetapp.description }}
          />
          <div>
            <MdEvent color="#999" size={20} />
            <p className="time">{time}</p>

            <MdPlace color="#999" size={20} />
            <p className="location">{informationMeetapp.location}</p>
          </div>
        </div>
      </content>
    </Container>
  );
}
