import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { StBox, StListWrapper } from '../components/Main';
import { __getTitle } from '../redux/modules/memo';

function DetailPage() {
    const paramas = useParams();
    const dispatch = useDispatch();
    const memos = useSelector((state) => {
    return state.memos;

    // const foundData = memos.find((item) => {
    //     return item.id === parseInt(parmas.id);
    // })

});

    useEffect(() => {
        dispatch(__getTitle(paramas));
    }, [dispatch, paramas]);

  return (
    <StListWrapper>
        {memos.find((item) => {
        if (item.id === parseInt(paramas.id));
        return(
        <StBox key={item.id}>
        {item.id} : {item.title}
        </StBox>
        );
        })};
    </StListWrapper>
  )
}

export default DetailPage
