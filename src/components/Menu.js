import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from "styled-components"

const Menu = () => {
  return (
    <Container>
      <MenuBox>
        <MenuItem><NavButton exact to="/">Calendar</NavButton></MenuItem>
        <MenuItem><NavButton exact to="/Home">Home</NavButton></MenuItem>
        <MenuItem><NavButton exact to="/about">About</NavButton></MenuItem>
        <MenuItem><NavButton to="/about/foo">About Foo</NavButton></MenuItem>
        <MenuItem><NavButton to="/posts">Posts</NavButton></MenuItem>
      </MenuBox>
    </Container>
  )
}

export default Menu

const Container = styled.div`
  height: 50px;
  border-bottom: 0.5px solid gray;
`
const MenuBox = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
`
const MenuItem = styled.li`
  flex: 1;
  text-align: center;
  margin: auto;
`
const activeClassName = 'button-active'
const NavButton = styled(NavLink).attrs({
  activeClassName
})`
 text-decoration: none;
 &.${activeClassName} {
   color: red;
 }
`
