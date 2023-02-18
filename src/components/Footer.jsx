import React, { useEffect } from 'react'
import WriteModal from './WriteModal'
import { useState } from 'react'
import axios from 'axios'

const Footer= () => {
  
  const [writeModalOn, setWriteModalOn] = useState(false);
  return (
    <>
      <button variant="primary" onClick={() => setWriteModalOn(true)}>
        작성하기
      </button>

      <WriteModal
        show={writeModalOn}
        onHide={() => setWriteModalOn(false)}
      />
    </>
  )
}

export default Footer
