import React, { useState, useRef, useEffect } from "react";
import { useField } from "@rocketseat/unform";
import api from "~/services/api";

import background from "~/assets/back.png";

import { Container } from "./styles";

export default function Meetapp() {
  const { defaultValue, registerField } = useField("File");
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: "file_id",
        ref: ref.current,
        path: "dataset.file"
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append("file", e.target.files[0]);

    const response = await api.post("files", data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="meetapp">
        <img src={preview || background} alt="" />
        <input
          type="file"
          id="meetapp"
          data-file={file}
          accept="image/*"
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
