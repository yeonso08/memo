import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { StBox, StListWrapper } from '../components/Main';
import { __getTitle, deleteTitle } from '../redux/modules/memo';
import axios from 'axios'

function DetailPage() {
    const paramas = useParams();
    const dispatch = useDispatch();
    const memos = useSelector((state) => {
    return state.memos.memos;
});
const selectedMemo = memos.find((item) => item.id === parseInt(paramas.id));

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/memos/${id}`);
    // 삭제가 완료되면 메모 목록을 다시 불러옵니다.
    dispatch(__getTitle());
  } catch (error) {
    console.error(error);
  }
};
    
  useEffect(() => {
        dispatch(__getTitle(paramas));
    }, [dispatch, paramas]);

  return (
    <StListWrapper>
      {selectedMemo ? (
            <StBox key={selectedMemo?.id}>
             <h1>{selectedMemo.title}</h1>
              <button onClick={() => handleDelete(selectedMemo.id)}>삭제</button>
            </StBox>
          ): null
      }
    </StListWrapper>
  );
}

export default DetailPage
