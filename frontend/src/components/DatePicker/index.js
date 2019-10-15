import React, { useState, useRef, useEffect } from "react";
import { useField } from "@rocketseat/unform";
import { setHours, setMinutes } from "date-fns";
import pt from "date-fns/locale/pt";

import { DatePicker } from "./styles";

export default function SelectDate() {
  const ref = useRef();
  const { defaultValue, registerField } = useField("date");

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: "date",
        ref: ref.current,
        path: "props.selected"
      });
    }
  }, [ref.current]); // eslint-disable-line

  return (
    <DatePicker
      selected={selected}
      onChange={d => setSelected(d)}
      showTimeSelect
      locale={pt}
      minDate={new Date()}
      timeFormat="p"
      timeIntervals={30}
      dateFormat="Pp"
      timeCaption="time"
      date-file={selected}
      minTime={setHours(setMinutes(new Date(), 0), 9)}
      maxTime={setHours(setMinutes(new Date(), 0), 22)}
      placeholderText="Data do meetapp"
      ref={ref}
    />
  );
}
