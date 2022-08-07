import React, { useState } from 'react'
import styled from 'styled-components'

import DeleteIcon from './delete-icon.png'

type Props = {
  data: any
  pid: string
  deleteReply: (id: string, pid: string|null|undefined) => void
}

const Reply = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [comment, editComment] = useState(props.data?.text)
  
  return (
    <ReplyContainer>
      <DeleteButton onClick={() => props.deleteReply(props.data?.id, props.pid)}/>
      <Name>{props.data?.name}</Name>
      {isEdit ? 
          <textarea value={comment} onChange={(e) => editComment(e.target.value)}></textarea>
          : 
          <Text>{comment}</Text>
        }
        <ActionButtonContainer>
          <ActionButton onClick={() => setIsEdit(true)}>Edit</ActionButton>
          {isEdit && <div><button onClick={() => setIsEdit(false)}>SAVE</button></div>}
        </ActionButtonContainer>
    </ReplyContainer>
  )
}

const Text = styled.p`
  margin: 8px 0;
`

const Name = styled.p`
  font-weight: 600;
`
const DeleteButton = styled.span`
  width: 30px;
  height: 30px;
  display: block;
  position: absolute;
  top: 50%;
  right: 0px;
  background-color: #FE5F55;
  border-radius: 50%;
  transform: translate(50%,-50%);

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    background: url(${DeleteIcon}) no-repeat center;
    background-size: 16px;
  }
  &:hover {
    cursor: pointer;
  }
`

const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  div {
    flex-grow: 1;
  }
  button {
    display: block;
    padding: 4px 8px;
    margin-left: auto;
  }
`

const ActionButton = styled.span`
  margin-right: 16px;
  color: #1573FF;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`

const ReplyContainer = styled.div`
  width: 90%;
  margin-left: auto;
  background-color: #F1F2EE;
  position: relative;
  padding: 16px 24px 16px 16px;
  box-sizing: border-box;
  margin: 4px 0 4px auto;
  border-radius: 8px;

  input, textarea {
    width: 100%;
    display: block;
    margin: 12px 0;
    padding: 8px;
    box-sizing: border-box;
    resize: none;
  }
`
export default Reply
