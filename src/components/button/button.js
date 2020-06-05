import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: #b5b5b5b3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export function FashionButton({ onClick, title, style }) {
  return (
    <Wrapper
      onClick={onClick}
      style={{ ...style }}
      className={"animated fadeIn"}
    >
      {title}
    </Wrapper>
  );
}
