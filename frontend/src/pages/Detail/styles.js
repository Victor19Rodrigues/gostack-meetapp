import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  height: 100%;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    strong {
      color: #fff;
      font-size: 24px;
    }

    div {
      display: flex;

      .edit-button {
        display: flex;
        height: 44px;
        background: #4dbaf9;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 14px;
        padding: 5px 20px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.07, "#4DBAF9")};
        }

        p {
          align-self: center;
          margin-left: 10px;
        }
      }

      .delete-button {
        display: flex;
        margin-left: 15px;
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
  }

  content {
    display: flex;
    align-items: center;

    div {
      img {
        display: block;
        width: 900px;
        height: 300px;
      }

      p {
        margin-top: 20px;
        display: block;
        color: #fff;
        font-size: 16px;
      }

      div {
        display: flex;
        align-items: center;
        margin-top: 25px;

        .time,
        .location {
          margin: 0 25px 0 5px;
          display: block;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
`;
