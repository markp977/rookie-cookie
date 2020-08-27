import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import classList from './classes'
import NavBar from './NavBar'
import AddClass from './AddClass'

const App = () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    setClasses(classList)
  }, [])

  const handleRemove = (id) => {
    console.log({id})
      let tempClasses = [...classes];
      tempClasses.splice(id, 1);
      setClasses(tempClasses);
  }
  
  const handleSubmit = (newClass) => {
    setClasses([...classes, newClass]);
  }
  
  console.log({classes});
  return (
    <Wrapper>
      <NavBar />
      <h1>Welcome to RookieCookie!</h1>
      <Container>
        {classes.map((klass,i) => <ClassCard key={i} content={klass} onRemove={handleRemove.bind(this, i)} index={i}/>)}
      </Container>
      <AddClass handleAdd={handleSubmit}/>
    </Wrapper>
  )
}

export default App

const ClassCard = ({content, onRemove, index}) => (
  <ClassCardWrapper>
    {content.featureImage && ( 
      <Image src={content.featureImage} alt='' />
    )}
    <ClassCardInfo>
      <h4>{content.title}</h4>
      <h5>{content.instructor}</h5>
      <h5>{content.description}</h5>
      <h5>{content.duration} min</h5>
    </ClassCardInfo>
    <ClassButton onClick={onRemove}>Remove</ClassButton>
  </ClassCardWrapper>
)

const Wrapper = styled.div `
  text-align: center;
  max-width: 1100px;
  margin: 45px auto 0 auto;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
`

const ClassCardWrapper = styled.div`
  min-height: 370px;
  width: 175px;
  border-radius: 5px;
  border: solid 1px black;
  overflow: visible;
  margin:0 20px 30px 0;
  box-shadow: 5px 7px #ccc;
  flex-basis: 20%;
  display:flex;
  flex-direction:column;
`

const ClassCardInfo = styled.div`
  padding: 10px 20px;
  min-height: 200px;
`

const ClassButton = styled.button`
  width: 50%;
  padding: 10px
  background: #333;
  color:#fff;
  margin: 0 auto 20px auto;
`

const Image = styled.img`
  width: 100%;
  height: 50%;
  max-height: 145px;
`