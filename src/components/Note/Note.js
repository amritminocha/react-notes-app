import React from 'react'
import styled from 'styled-components'

const NoteContainer = styled.div`
    background: white;
    padding: 15px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const NoteText = styled.p`
    margin: 0;
    font-size: 16px;
    font-style: oblique;
`

const DeleteButton = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
    &:hover {
        background-color: #c82333;
    }
`

const Note = ({ note, deleteNote }) => {
  return (
    <NoteContainer>
      <NoteText>{note.text}</NoteText>
      <DeleteButton onClick={deleteNote}>Delete</DeleteButton>
    </NoteContainer>
  )
}

export default Note