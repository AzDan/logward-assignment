import React, { useEffect, useState } from 'react'
import Comment from './Comment'

import styled from 'styled-components';

type Props = {
  newComment: Comment | undefined
  setNewComment: (comment: any) => void
}

const Comments = (props: Props) => {
  //initial states
  const [comments, setComments] = useState([{
    data: {
      name: 'Alex',
      text: 'This is a sample comment',
      id: '1',
      pid: null,
    },
    replies: [{
      data: {
        name: 'Brian',
        text: 'This is a sample reply',
        id: '2',
        pid: '1'
      }
    },
    {
      data: {
        name: 'Murphy',
        text: 'This is a sample reply',
        id: '3',
        pid: '1'
      }
    }]
  },
  {
    data: {
      name: 'Meghan',
      text: 'This is a sample comment',
      id: '4',
      pid: null,
    },
    replies: [{
      data: {
        name: 'Dytlab',
        text: 'This is a sample reply',
        id: '5',
        pid: '4'
      }
    }]
  },
  {
    data: {
      name: 'Laura',
      text: 'This is a sample comment',
      id: '9',
      pid: null,
    },
    replies: [{
      
    }]
  }])
  const [direction, setDirection] = useState('column')

  const toggleDirection = () => {
    if(direction==='column')
      setDirection('column-reverse')
    else 
      setDirection('column')
  }

  //get comments from localstorage if exist
  useEffect(() => {
    const data = localStorage.getItem('commentData')
    if(data!=null)
      setComments(JSON.parse(data))
  },[])

  //add new comment, update localstorage
  useEffect(() => {
    if(props.newComment !== undefined){
      const newState = JSON.parse(JSON.stringify(comments))
      if(props.newComment.data.pid!==null) {
        newState.forEach((el: Comment) => {
          if(el.data.id===props.newComment?.data.pid) {
            if(Object.keys(el.replies[0]).length===0)
              el.replies[0] = props.newComment
            else
              el.replies.unshift(props.newComment)
          }
        })
      }
      else {
        newState.unshift(props.newComment)
      }
      setComments(newState)
      localStorage.setItem('commentData', JSON.stringify(newState))
    }
  },[props.newComment])

  const deleteComment = (id: string, pid: string|null|undefined) => {
    //parent comment
    if(pid==null||pid===undefined) {
      const indexToDelete = comments.findIndex(obj => {
        return obj.data.id===id
      })
      const newState = JSON.parse(JSON.stringify(comments))
      newState.splice(indexToDelete,1)
      setComments(newState)
      localStorage.setItem('commentData', JSON.stringify(newState))
    }
    //child comment -> reply
    else {
      const parentIndex = comments.findIndex(obj => {
        return obj.data.id===pid
      })
      if(Object.keys(comments[parentIndex].replies[0]).length>0) {
        const indexToDelete = comments[parentIndex].replies.findIndex((obj: any) => {
          return obj.data.id===id
        })
        const newState = JSON.parse(JSON.stringify(comments))
        // more than 1 replies
        if(comments[parentIndex].replies.length>1) {
          newState[parentIndex].replies.splice(indexToDelete,1)
        }
        //only one reply
        else {
          newState[parentIndex].replies = [{}]
        }
        setComments(newState)
        localStorage.setItem('commentData', JSON.stringify(newState))
      }
    }
  }

  return (
    <>
      <SortButton flexDirection={direction} onClick={() => toggleDirection()}>Sort</SortButton>
      <CommentsContainer flexDirection={direction}>
        {comments.map((item, index) => {
          return (
          <Comment 
            key={item.data.id} 
            type="comment" 
            data={item.data} 
            replies={item.replies}
            setNewComment={props.setNewComment}
            deleteComment={deleteComment}
            direction={direction}/>)
        })}
      </CommentsContainer>
    </>
  )
}

const CommentsContainer = styled.div<{flexDirection: string}>`
  display: flex;
  flex-direction: ${props => props.flexDirection};
`

const SortButton = styled.div<{flexDirection: string}>`
  width: fit-content;
  margin-left: auto;
  margin-right: 24px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    top: 50%;
    right: -18px;
    border-bottom: 2px solid gray;
    border-right: 2px solid gray;
    transition: 0.2s all ease;
    transform: ${props => props.flexDirection=='column'? 'translate(0,-50%)' :'translate(0,-20%)'} ${props => props.flexDirection=='column'? 'rotate(45deg)' :'rotate(-135deg)'};
  }
  &:hover {
    cursor: pointer;
  }
`

export default Comments