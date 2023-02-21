import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { StBox, StListWrapper } from '../components/Main';
import { __getTitle,updateTitle} from '../redux/modules/memo';
import axios from 'axios'
import { BsFillPencilFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";

function DetailPage() {
    const paramas = useParams();
    const memos = useSelector((state) => {
    return state.memos.memos;
});
const dispatch = useDispatch();
const selectedMemo = memos.find((item) => item.id === parseInt(paramas.id));
const [isEditing, setIsEditing] = useState(false);
const [newTitle, setNewTitle] = useState(selectedMemo.title);

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/memos/${id}`);
    // 삭제가 완료되면 메모 목록을 다시 불러옵니다.
    dispatch(__getTitle());
    // 메모 삭제 후 메모 목록으로 이동
  } catch (error) {
    console.error(error);
  }
};

const handleSave = async () => {
  try {
    await axios.put(`http://localhost:3001/memos/${selectedMemo.id}`, {
      title: newTitle,
    });
    dispatch(updateTitle({ id: selectedMemo.id, title: newTitle }));
    setIsEditing(false);
  } catch (error) {
    console.error(error);
  }
};

const handleCancel = () => {
  setIsEditing(false);
  setNewTitle(selectedMemo.title);
};

  return (
    <StListWrapper>
      {selectedMemo ? (
            <StBox key={selectedMemo?.id}>
             {isEditing ? (
               <>
                 <input
                   type="text"
                   value={newTitle}
                   onChange={(e) => setNewTitle(e.target.value)}
                 />
                 <button onClick={handleSave}>저장</button>
                 <button onClick={handleCancel}>취소</button>
               </>
             ) : (
               <>
                 <h1>{selectedMemo.title}</h1>
                 <button onClick={() => setIsEditing(true)}>
                  <BsFillPencilFill />
                  </button>
                 <button onClick={() => handleDelete(selectedMemo.id)}><RiDeleteBin5Fill /></button>
               </>
             )}
            </StBox>
          ): null
      }
    </StListWrapper>
  );
}

export default DetailPage;
