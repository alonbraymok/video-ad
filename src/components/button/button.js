import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 200px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  background: linear-gradient(
    74deg,
    rgba(1, 11, 156, 1) 0%,
    rgba(43, 156, 212, 0.7693452380952381) 37%,
    rgba(46, 93, 214, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 25px;
  color: #fff;
  font-weight: 700;
`;

export function IronButton({ onClick, title, style }) {
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
