import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import { __addTitle } from '../redux/modules/memo';
import useInput from '../hooks/useInput';

const WriteModal = (props) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue, onchange] = useInput();
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    setSubmitDisabled(inputValue === "")
  }, [inputValue])

  const onSubmit = () => {
    dispatch(__addTitle({title : inputValue}));
    setInputValue("");
    props.onHide();
  }
  const onHide = () => {
    setInputValue("");
    props.onHide();
  };

  return (
    <Modal
      show = {props.show}
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
        <Form.Control type="text" placeholder="두 글자 이상 해주세요" value={inputValue.title}
        onChange = {onchange} />
      </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit"  onClick={() => {
          if(inputValue.length < 2)
          {
            window.alert("두 글자 이상 입력해주세요")
            return
          }
          else 
          {
            onSubmit();
          }
        }} disabled={submitDisabled} >
        저장
      </Button>
      <Button onClick={onHide}>닫기</Button>
      </Modal.Footer>
    
      </Container>
    </Modal>
    
  );
}


export default WriteModal
