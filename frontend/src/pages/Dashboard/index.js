import React, { useState, useEffect } from "react";
import { MdAddCircleOutline, MdChevronRight } from "react-icons/md";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "~/services/api";
import history from "~/services/history";

import { Container, Time, Scroll } from "./styles";

export default function Dashboard() {
  const [meetapp, setMeetapp] = useState([]);

  useEffect(() => {
    async function loadMeetapp() {
      const response = await api.get("organizer");

      const responseMeetapp = response.data.map(data => {
        return {
          time: format(new Date(data.date), "d 'de' MMMM', às ' HH'h'", {
            locale: pt
          }),
          past: data.past,
          meetapp: data
        };
      });

      setMeetapp(responseMeetapp);
    }

    loadMeetapp();
  }, [meetapp]);

  function handleSubmit(value) {
    history.push("/detail", { meetapp: value });
  }

  function handleSubmitNewMeetapp() {
    history.push("/new");
  }

  return (
    <Container>
      <header>
        <strong>Meus meetapps</strong>
        <button type="submit" onClick={handleSubmitNewMeetapp}>
          <MdAddCircleOutline color="#fff" size={20} />
          <p>Novo meetapp</p>
        </button>
      </header>

      <ul>
        <Scroll>
          {meetapp.map(value =>
            !value.past ? (
              <Time key={value.meetapp.id} past={value.past}>
                <strong>{value.meetapp.title}</strong>
                <button type="button" onClick={() => handleSubmit(value)}>
                  <span>{value.time}</span>
                  <MdChevronRight size={25} color="#fff" />
                </button>
              </Time>
            ) : (
              <></>
            )
          )}
        </Scroll>
      </ul>
    </Container>
  );
}
