import React, { useEffect } from 'react'
import WriteModal from './WriteModal'
import { useState } from 'react'
import axios from 'axios'
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
