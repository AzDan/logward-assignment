import React, { useState } from 'react'
import styled from 'styled-components'

import DeleteIcon from './delete-icon.png'
import Post from './Post'
import Reply from './Reply'


type Props = {
  type: string
  data: {
    name: string
    text: string
    id: string
    pid: number|null
    date?: Date|string
  }
  replies: {
    data?: {
      name: string
      text: string
      id: string
      pid: string|null
    }
  }[]
  setNewComment: (comment: any) => void
  deleteComment: (id: string, pid: string|null|undefined) => void
  direction: string
}

const Comment = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [comment, editComment] = useState(props.data.text)
  const [isReply, setIsReply] = useState(false)

  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div>
      <CommentBox>
        <DeleteButton onClick={() => props.deleteComment(props.data.id,null)}/>
        <Name>{props.data.name}</Name>
        {props.data.date && typeof(props.data.date)=="object" &&
          <Date>{props.data.date.getDate()} {monthArray[props.data.date.getMonth()]}, {props.data.date.getFullYear()}</Date>
        }
        {props.data.date && typeof(props.data.date)=="string" &&
          <Date>{props.data.date.substring(8,10)} {monthArray[parseInt(props.data.date.substring(5,7))-1]}, {props.data.date.substring(0,4)}</Date>
        }
        {isEdit ? 
          <textarea value={comment} onChange={(e) => editComment(e.target.value)}></textarea>
          : 
          <Text>{comment}</Text>
        }
        <ActionButtonContainer>
          <ActionButton onClick={() => setIsEdit(true)}>Edit</ActionButton>
          {props.type==="comment" && <ActionButton onClick={() => setIsReply(true)}>Reply</ActionButton>}
          {isEdit && <div><button onClick={() => setIsEdit(false)}>SAVE</button></div>}
        </ActionButtonContainer>
      </CommentBox>
      {isReply && 
        <ReplyPostContainer>
          <Post type='reply' setNewComment={props.setNewComment} hasParent={true} pid={props.data.id} setIsReply={setIsReply}/>
        </ReplyPostContainer>
      }
      <RepliesContainer flexDirection={props.direction}>
        {Object.keys(props.replies[0]).length>0 && props.replies.map((item, index) => {
          return(
            <Reply key={item.data?.id} data={item.data} pid={props.data.id} deleteReply={props.deleteComment}/>
          )
        })}
      </RepliesContainer>
    </div>
  )
}

const Text = styled.p`
  margin: 8px 0;
`

const Name = styled.p`
  font-weight: 600;
`

const Date = styled.div`
  font-size: 12px;
  position: absolute;
  top: 8px;
  right: 20px;
`

const CommentBox = styled.div`
  position: relative;
  background-color: #F1F2EE;
  padding: 16px 24px 16px 16px;
  margin: 4px 0;
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

const RepliesContainer = styled.div<{flexDirection: string}>`
  display: flex;
  flex-direction: ${props => props.flexDirection};
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

const ReplyPostContainer = styled.div`
width: 90%;
margin-left: auto;
position: relative;
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

const ActionButton = styled.span`
  margin-right: 16px;
  color: #1573FF;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`

export default Comment