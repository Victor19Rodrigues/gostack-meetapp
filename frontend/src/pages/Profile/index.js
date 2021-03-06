import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import { MdAddCircleOutline } from "react-icons/md";

import { updateProfileRequest } from "~/store/modules/user/actions";

import { Container } from "./styles";

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input type="password" name="old_password" placeholder="Senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="password_confirmation"
          placeholder="Confirmação de senha"
        />

        <button type="submit">
          <MdAddCircleOutline color="#fff" size={20} />
          <p>Salvar perfil</p>
        </button>
      </Form>
    </Container>
  );
}
