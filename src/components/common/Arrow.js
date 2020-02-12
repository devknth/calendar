import React from 'react'
import styled from 'styled-components'

const Arrow = ({ direction, size, onClick }) => {
  return (
    <Container size={size} onClick={onClick} >
      <Draw direction={direction} size={size} onClick={onClick} />
    </Container>
  )
}

export default Arrow

const Container = styled.div`
${({ size }) => `
  width: ${size * 5}px;
  height: ${size * 5}px;
`}
  display: flex;
  justify-content: center;
  align-items: center;
`
const Draw = styled.i`${({ size, direction }) => `
  border: solid lightgray;
  border-width: 0 ${size}px ${size}px 0;
  display: inline-block;
  :hover {
    border: solid black;
    border-width: 0 ${size}px ${size}px 0;
    cursor: pointer;
  }
  :active {
    border: solid gray;
    border-width: 0 ${size}px ${size}px 0;
    cursor: pointer;
  }
  
  padding: ${size}px;
  
  ${direction === 'left' 
  ? `
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);`
  : `
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);`}
  `}

`
