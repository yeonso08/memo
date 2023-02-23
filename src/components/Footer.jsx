import React from 'react'
import WriteModal from './WriteModal'
import { useState } from 'react'
import { BsFillPencilFill } from "react-icons/bs" ;

const Footer= () => {
  
  const [writeModalOn, setWriteModalOn] = useState(false);
  return (
    <>
      <button variant="primary" onClick={() => setWriteModalOn(true)}>
        <BsFillPencilFill />
      </button >

      <WriteModal
        show={writeModalOn}
        onHide={() => setWriteModalOn(false)}
      />
    </>
  )
}
export default Footer
