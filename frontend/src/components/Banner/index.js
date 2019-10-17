import React, { useState, useRef, useEffect } from "react";
import { useField } from "@rocketseat/unform";
import api from "~/services/api";

import background from "~/assets/back.png";

import { Container } from "./styles";

export default function BannerInput() {
  const { defaultValue, registerField } = useField("file");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

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
        {preview && <img src={preview} alt="banner_meetapp" />}

        {!preview && <img src={background} alt="" />}
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
