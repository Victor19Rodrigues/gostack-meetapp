import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin-top: 10px;
      margin-bottom: 15px;
    }

    button {
      align-self: flex-end;
      display: flex;
      margin: 5px 0 0;
      height: 44px;
      background: #d44059;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      padding: 5px 20px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, "#d44059")};
      }

      p {
        align-self: center;
        margin-left: 10px;
      }
    }
  }
`;
