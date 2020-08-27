import React, { useState } from 'react';
import styled from 'styled-components';
import Unsplash from 'unsplash-js';

const AddClass = ({handleAdd}) => {
const [title, setTitle] = useState('');
const [chef, setChef] = useState('');
const [description, setDescription] = useState('');
const [duration, setDuration] = useState('');
const [type, setType] = useState('onDemand');
const [image, setImage] = useState('');
const [featuredimageList, setFeaturedImageList] = useState([]);
const [showImageList, setShowImageList] = useState(false);

const unsplash = new Unsplash({ accessKey: "BECGS4RwNt0KkRPzM1hQRyXlQl5NlMmd3iAb18H3Zz4" });

const ImageGrid = ({showImageList, featuredimageList, onSelectFeaturedImage}) => {
	const selectFeaturedImage = (url) => {
		onSelectFeaturedImage(url);
	}
	return (
	<ImagesContainer>
		{showImageList && featuredimageList.map((image, i) => {
			return (
				<Thumbnail
					key={i}
					onClick={e => selectFeaturedImage(image.urls.regular)}
					src={image.urls.thumb}/>
			);
		})}
	</ImagesContainer>
	)
}

const imageSearch = (term) => {
	unsplash.search.photos(term, 1, 10, { orientation: "portrait" })
	.then(res => res.json())
	.then(json => {
		setFeaturedImageList(json.results);
		setShowImageList(true);
	});
}

const selectFeaturedImage = (urls) => {
	setImage(urls);
	setShowImageList(false);
}

const removeFeatureImage = (e) => {
	e.preventDefault();
	setImage('');
}

const ImageSelected = ({showImageList, image}) => {
  return (
    <ImageWrapper>
      {!showImageList && image && (
        <ImageContainer>
          <FeaturedImage src={image} />
					<CloseButton onClick={removeFeatureImage}>X</CloseButton>
        </ImageContainer>
      )}
    </ImageWrapper>
  )
}

const handleSubmit = (event) => {
	event.preventDefault();
	const id = Math.floor((Math.random()*100) + 1)
	handleAdd({
		id,
		title,
		instructor: chef,
		description,
		duration,
		featureImage: image,
		type
	});
}

  return (
    <AddClassContainer>
      <ClassForm onSubmit={handleSubmit}>
        <h2>Add Class</h2>
        <FormWrapper>
				  <Label>Title:</Label>
          <FieldWrapper type="text" placeholder="Title"  value={title} required onChange={e => setTitle(e.target.value)}/>
          <Label>Chef:</Label>
          <FieldWrapper type="text" placeholder="Chef's First and Last Name" value={chef} required onChange={e => setChef(e.target.value)} />
          <Label>Description:</Label>
          <FormTextArea maxlength="100" type="text" placeholder="Description" value={description} required onChange={e => setDescription(e.target.value)} />
          <Label>Duration:</Label>
          <FieldWrapper type="text" placeholder="Duration in minutes" value={duration} required onChange={e => setDuration(e.target.value)} />
          <Label>Class Type:</Label>
          <FormSelect placeholder="Select Type" value={type} onChange={e => setType(e.target.value)} >
            <option value="on-demand">On Demand</option>
            <option value="live">Live</option>
          </FormSelect>
					<Label>Search and Select Image:</Label>
          <FieldWrapper
            type="text"
            placeholder="Search for image"
            required
            onChange={e => imageSearch(e.target.value)}
          />
          <ImageGrid
            showImageList={showImageList}
            featuredimageList={featuredimageList}
            onSelectFeaturedImage={selectFeaturedImage}
          />
          <ImageContainer>
						<ImageSelected
							showImageList={showImageList}
							image={image}
						/>
          </ImageContainer>
          <FormSubmit type="submit" value="AddClass" />
        </FormWrapper>
      </ClassForm>
    </AddClassContainer>
  )
}

export default AddClass

const AddClassContainer = styled.div`
  display:flex;
	justify-content: center;
	margin-bottom:60px;
`

const ClassForm = styled.form`
	border: #ccc 2px solid;
	border-radius: 15px;
	width: 50%;
	height: 80%;
	margin: auto;
	background: #fff;
	padding: 25px;
	margin-top: 50px;
	overflow: scroll;
	max-width: 480px;
`
const FormWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
`
const FieldWrapper = styled.input`
  width: 100%;
`
const Label = styled.label`
	padding-top: 20px;
	margin-top: 10px 0;
`
const FormTextArea = styled.textarea`
  width: 100%;
  min-width: 100%;
  min-height: 100px;
`
const FormSelect = styled.select`
  width: 100%;
`
const FormSubmit = styled.input`
background: black;
color: white;
font-size: 25px;
font-weight: bold;
margin: 25px auto;
padding: 10px;
width: 20%;
min-width:160px;
`
const ImagesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`
const Thumbnail = styled.img`
  flex: auto;
  height: 250px;
  min-width: 50px;
  margin: 8px 8px 8px 0;
  cursor: pointer;
`

const ImageWrapper = styled.div`
  width: 100%;
`
const ImageContainer = styled.div`
  padding: 15px;
  width: 100%;
`
const FeaturedImage = styled.img`
  width: 250px;
  height: auto;
`

const CloseButton = styled.button`
	position absolute;
	border:none;
	margin: 5px 0 0 -25px;
	background: #fff;
	border-radius: 20px;
`