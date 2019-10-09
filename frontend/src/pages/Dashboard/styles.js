import styled from "styled-components";
import { darken } from "polished";
import PerfectScrollbar from "react-perfect-scrollbar";

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

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

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #2a1f31;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;

  & + li {
    margin-top: 10px;
    padding-top: 10px;
  }

  strong {
    display: block;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  button {
    border: 0;
    background: none;
    display: flex;

    span {
      display: block;
      margin-top: 3px;
      color: #999;
      margin-right: 30px;
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 350px;
  padding: 5px 15px;
`;
