import React from 'react'
import styled, { keyframes, css } from "styled-components"
import icon from 'images/logo192.png'

const Home = () => {
  return (
    <Container>
      <Button>버튼1</Button>
      <Button color="red" rotateAni duration={2}>
        버튼2
          </Button>
      <Anchor href="http://google.com">google</Anchor>
      <Img />
    </Container>
  )
}

export default Home

const Img = styled.img.attrs({
  src: icon,
})`
  width: 100px;
  height: 100px;
`
const Container = styled.div`
  background-color: lightgray;
  padding: 80px;
  flex: 1;
`
const rotation = keyframes`
from{
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`
const Button = styled.button`
  color: white;
  min-width: 120px;

  /* props로 넣어 준 값을 직접 전달해 줄 수 있습니다. */
  background-color: ${props => props.color || "blue"};

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택이 가능합니다. */
  &:hover {
    background-color: white;
    color: black;
  }
  & + button {
    margin-left: 1rem;
  }
  
  ${props => {
    if (props.rotateAni) {
      return css`
        animation: ${rotation} ${props.duration}s linear infinite;
      `
    }
  }}
`
const Anchor = styled(Button.withComponent("a"))`
  color: black;
`