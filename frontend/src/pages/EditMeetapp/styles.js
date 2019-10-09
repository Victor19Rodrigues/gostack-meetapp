import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 16px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 200px;
      padding: 10px 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 16px;
      resize: none;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    .submit-button {
      width: 150px;
      display: flex;
      justify-content: center;
      align-self: flex-end;
      display: flex;
      height: 42px;
      margin: 10px 0 0;
      background: #d44059;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, "#d44059")};
      }

      p {
        margin-left: 5px;
      }
    }
  }
`;
