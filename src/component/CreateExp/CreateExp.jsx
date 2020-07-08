import React, { useEffect, useState } from "react";
import { Form, Col, Button, Container } from "react-bootstrap";
import axios from "axios";

function CreateExp(props) {
  let [title, setTitle] = useState("");
  let [country, setCountry] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [duration, setDuration] = useState(0);
  let [groupS, setGroupS] = useState(0);
  let [age, setAge] = useState(0);
  let [pictureURL, setPictureURL] = useState([]);
  let [tags, setTags] = useState([]);
  let [items, setItems] = useState([]);

  const createExperience = (event) => {
    event.preventDefault();
    var re = /:\s|,\s/; // split on colon space or comma space
    tags = tags.split(re);
    items = items.split(re);
    pictureURL = pictureURL.split(re, 5);

    let data = {
      title,
      country,
      description,
      price,
      duration,
      groupS,
      age,
      pictureURL,
      tags,
      items,
    };
    console.log(data);
    axios
      .post("https://airthb-group6.herokuapp.com/experiences", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
    <Container>
    <Form className="FormCreate" onSubmit={createExperience}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Experience's title"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="Enter your city and country"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Price (per Hour)</Form.Label>
            <Form.Control
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter the price"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDuration">
            <Form.Label>Duration (per hour)</Form.Label>
            <Form.Control
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="number"
              placeholder="Enter the time needed for your Experience"
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Enter a description of your Experience"
          />
        </Form.Group>

        <Form.Group controlId="formGridItems">
          <Form.Label>
            Items to bring (maximum: 10, please separate different items by
            semi-colon or comma)
          </Form.Label>
          <Form.Control
            name="items"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            type="text"
            placeholder="Enter the necessary items for participants to bring"
          />
        </Form.Group>

        <Form.Group controlId="formGridPicture">
          <Form.Label>
            Pictures (maximum: 5, please input URL separated by semi-colon or
            comma)
          </Form.Label>
          <Form.Control
            name="pictureURL"
            value={pictureURL}
            onChange={(e) => setPictureURL(e.target.value)}
            type="text"
            placeholder="Enter the pictures for your Experience"
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridTags">
            <Form.Label>
              Tags (please separate different tags by semi-colon or comma){" "}
            </Form.Label>
            <Form.Control
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              type="text"
              placeholder="Enter your tags"
            ></Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridGroupS">
            <Form.Label>Group Size</Form.Label>
            <Form.Control
              name="groupS"
              value={groupS}
              onChange={(e) => setGroupS(e.target.value)}
              type="number"
              placeholder="Enter the maximum number of participants"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Enter the minimum age of participants"
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
     
    </>
  );
}

export default CreateExp;
