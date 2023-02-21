import React, { useState } from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addTitle } from '../redux/modules/memo';

const WriteModal = ({show, onHide}) => {
  const [inputValue, setInputValue] = useState({
    title : "",
  })

  const dispatch = useDispatch();

  return (
    <Modal
      show = {show}
      onHide = {onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Memo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>내용</Form.Label>
        <Form.Control type="text" placeholder="입력 해주세요" value={inputValue.title}
        onChange = {(e) => {
          setInputValue({
            title: e.target.value});
          }} />
      </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={(e) => {
          e.preventDefault();
          dispatch(addTitle(inputValue))
        }}>
        저장
      </Button>
      <Button onClick={onHide}>닫기</Button>
      </Modal.Footer>
    
      </Container>
    </Modal>
    
  );
}


export default WriteModal
