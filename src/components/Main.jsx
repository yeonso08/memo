import React from 'react'
import styled from "styled-components";


const StMain = styled.div`
  width: 100%;
  height: 450px;
  background-color: #EDD98C;
  font-size: 50px;
  color: black;
  margin-top:0px;
`;
const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StBox = styled.div`
width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`;

function Main() {

  return (
    <StMain>
        <StListWrapper>
    <StBox>dsadasd</StBox>
    <StBox>dsadasd</StBox>
    <StBox>dsadasd</StBox>
    </StListWrapper>
    </StMain>
  )
}

export default Main
