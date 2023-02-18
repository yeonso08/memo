import React from "react";
import styled from "styled-components";
import axios from "axios";
// import { useState } from "react";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { memoAtom } from "../atoms";

const StMain = styled.div`
  width: 100%;
  height: 450px;
  background-color: #edd98c;
  font-size: 50px;
  color: black;
  margin-top: 0px;
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
  // const [memos, setMemos] = useState(null);
  const setMemos = useSetRecoilState(memoAtom);

  const fetchMemos = async () => {
    const { data } = await axios.get("http://localhost:4000/memos");
    setMemos(data);
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const memos = useRecoilValue(memoAtom);

  return (
    <StMain>
      <StListWrapper>
        {memos?.map((item) => {
          return (
            <StBox key={item.id}>
              {item.id} : {item.title}
            </StBox>
          );
        })}
      </StListWrapper>
    </StMain>
  );
}

export default Main;
