import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import {  StListWrapper } from '../components/Main';
import { __getTitle,__updateTitle} from '../redux/modules/memo';
import styled from "styled-components";
import axios from 'axios'
import { BsFillPencilFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineSaveAlt } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import useInput from '../hooks/useInput';
const StBoxx = styled.div`
  width: 400px;
  border: 4px solid yellow;
  background-color: yellow;
  min-height: 250px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function DetailPage() {
    const paramas = useParams();
    const navigate = useNavigate();
    const memos = useSelector((state) => {
    return state.memos.memos;
});

const dispatch = useDispatch();
const selectedMemo = memos.find((item) => item.id === parseInt(paramas.id));
const [isEditing, setIsEditing] = useState(false);
const [inputValue, setInputValue, onchange] = useInput(selectedMemo.title);

useEffect(() => {
  dispatch(__getTitle());
}, [dispatch]);

const handleDelete = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_MEMOS}/memos/${id}`);
    // 삭제가 완료되면 메모 목록을 다시 불러옵니다.
    dispatch(__getTitle());
    // 메모 삭제 후 메모 목록으로 이동
    navigate('/');
  } catch (error) {
    console.error(error);
  }
};

const handleSave = async () => {
  try {
    await axios.put(`${process.env.REACT_APP_MEMOS}/memos/${selectedMemo.id}`, {
      title: inputValue,
    });
    dispatch(__updateTitle({ id: selectedMemo.id, title: inputValue }));
    setIsEditing(false);
  } catch (error) {
    console.error(error);
  }
};

const handleCancel = () => {
  setIsEditing(false);
  setInputValue(selectedMemo.title);
};

  return (
    <StListWrapper>
      {selectedMemo ? (
            <StBoxx key={selectedMemo?.id}>
             {isEditing ? (
               <>
                 <input
                   type="text"
                   value={inputValue}
                   onChange={onchange}
                 />
                 <button onClick={handleSave}>
                  <MdOutlineSaveAlt />
                 </button>
                 <button onClick={handleCancel}><GiCancel /></button>
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
            </StBoxx>
          ): null
      }
    </StListWrapper>
  );
}

export default DetailPage;
