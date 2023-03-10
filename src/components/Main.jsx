import styled from "styled-components";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { __getTitle } from '../redux/modules/memo';
import { Link } from 'react-router-dom';
import '../App.css';




const StMain = styled.div`
  width: 100%;
  height: 700px;
  background-color: #EDD98C;
  font-size: 50px;
  color: black;
  margin-top:0px;
`;

const AddButton = styled(Link)`
text-Decoration: none;
`;

export const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const StBox = styled.div`
width: 270px;
  border: 4px solid yellow;
  background-color: yellow;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`;

function Main() {
   const { isLoading, error, memos} = useSelector((state) => {
    return state.memos;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTitle());
  }, [dispatch]);

  if(isLoading) 
    {
      return <div>loading...</div>
    }

  if(error)
    {
      return<div>{error.message}</div>
    }

  return (
    <StMain>
        <StListWrapper>
          {memos?.map((item) => (
            <AddButton style={{AddButton}} to ={`/detail/${item.id}`} key={item.id}>
              {item && (
              <StBox>
                <div className='App'>{item.title}</div>
              </StBox>
              )}
            </AddButton>
          ))}
      </StListWrapper>
    </StMain>
  );
}

export default Main
