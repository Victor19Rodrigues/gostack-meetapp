import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 300px;
      width: 900px;
      border-radius: 4px;
    }

    input {
      display: none;
    }
  }
`;
