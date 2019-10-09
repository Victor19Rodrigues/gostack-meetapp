import React, { useRef, useEffect, useState } from "react";
import { useField } from "@rocketseat/unform";
// import { parseISO } from "date-fns";
// import { zonedTimeToUtc } from "date-fns-tz";

import { Datepicker } from "./styles";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker() {
  const ref = useRef();
  const { defaultValue, registerField } = useField("date-picker");
  //   const { defaultValue, registerField } = useField("date");

  //   console.tron.log("ada");
  //   console.tron.log(zonedTimeToUtc(defaultValue, "America/Sao_Paulo"));

  //   const parsedDate =
  //     parseISO(defaultValue) == null
  //       ? parseISO(new Date())
  //       : parseISO(defaultValue);
  //   console.tron.log("aqui");

  //   console.tron.log(parseISO(defaultValue) == null);

  //   const znDate = zonedTimeToUtc(parsedDate, "America/Sao_Paulo");
  //   console.tron.log(znDate);

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: "date",
      ref: ref.current,
      path: "props.selected",
      clearValue: pickerRef => {
        pickerRef.clear();
      }
    });
  }, [ref.current, "date"]); // eslint-disable-line

  return (
    <>
      <Datepicker
        id="date-picker"
        selected={selected}
        showTimeSelect
        timeIntervals={30}
        dateFormat="dd/MM/yyyy HH:mm"
        onChange={date => setSelected(date)}
        ref={ref}
        placeholderText="Data do meetapp"
        timeFormat="HH:mm"
        minDate={new Date()}
      />
    </>
  );
}
