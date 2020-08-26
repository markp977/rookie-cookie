import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import classList from './classes'
import NavBar from './NavBar'

const App = () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    setClasses(classList)
  }, [])

  return (
    <Wrapper>
      <NavBar />
      <h1>Welcome to RookieCookie!</h1>
      <Container>
        {classes.map(klass => <ClassCard content={klass}/>)}
      </Container>
    </Wrapper>
  )
}

export default App

const ClassCard = ({content}) => (
  <ClassCardWrapper key={content.index}>
    <span>X</span>
    <img height="50%" width="100%" src={content.featureImage} alt='' />
    <h4>{content.title}</h4>
    <h5>{content.instructor}</h5>
    <h5>{content.description}</h5>
    <h5>{content.duration} min</h5>
  </ClassCardWrapper>
)

const Wrapper = styled.div `
  margin-top: 45px;
  text-align: center;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const ClassCardWrapper = styled.div`
  min-height: 300px;
  width: 175px;
  border-radius: 5px;
  border: solid 1px black;
  overflow: hidden;
  margin-left:20px
`
