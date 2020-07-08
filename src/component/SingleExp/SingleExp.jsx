import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import sampleData from "../../sampleData.json";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import StackGrid, { transitions } from "react-stack-grid";
import Axios from "axios";
import aaa from "./image/aaa.jpg"
import bbb from "./image/bbb.jpg"
import ccc from "./image/ccc.jpg"
import ddd from "./image/ddd.jpg"
import eee from "./image/eee.jpg"

import UpdateExp from "../UpdateExp/UpdateExp";

import { useHistory } from "react-router-dom";
import { StoreContext } from "../../ThemeContext";

const { scaleDown } = transitions;

export default function SingleExp() {
  let history = useHistory();
  let { expId } = useParams();
  let { expList, currentPage, tag, expListURL } = React.useContext(
    StoreContext
  );
  // let exp = sampleData.find((e) => e.id === expId);

  const [singleExp, setSingleExp] = useState(null);

  const getExperience = async () => {
    let url = `https://airthb-group6.herokuapp.com/experiences/${expId}`;
    let data = await Axios.get(url);
    let result = await data.data;
    setSingleExp(result.data);
  };
  
  const getFilteredExp = async (id) => {
    tag[1](id);
    let res = await Axios.get(expListURL);
    expList[1](res.data.data);
    history.push("/")
  };

  const deleteExp = async (id) => {
    let res=await Axios.delete(`https://airthb-group6.herokuapp.com/experiences/${id}`)
    history.push("/")
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getExperience();
  }, []);

  if (singleExp === null) {
    return (
      <center>
        <div>
          <Spinner animation="border" />
        </div>
      </center>
    );
  }

  return (
    <div>
      <div className="section1">
        <Container style={{ padding: "50px 0 0 0" }}>
          <StackGrid
            className="top-section"
            columnWidth={340}
            duration={0}
            gutterWidth={10}
          >
            <div>
              <img
                alt=""
                src={singleExp.pictureURL[0] ? singleExp.pictureURL[0] : aaa}
                width="340"
                height="460"
              ></img>
            </div>
            <div>
              <img
                alt=""
                src={singleExp.pictureURL[1] ? singleExp.pictureURL[1] :bbb}
                width="165"
                height="230"
                style={{ marginRight: "5px" }}
              ></img>
              <img
                alt=""
                src={singleExp.pictureURL[2] ? singleExp.pictureURL[2] :ccc}
                width="165"
                height="230"
                style={{ marginLeft: "5px" }}
              ></img>
              <img
                alt=""
                src={singleExp.pictureURL[3] ? singleExp.pictureURL[3] :ddd}
                width="340"
                height="220"
                style={{ marginTop: "10px" }}
              ></img>
            </div>
            <div>
              <img
                alt=""
                src={singleExp.pictureURL[4] ? singleExp.pictureURL[4]  :eee}
                width="340"
                height="460"
              ></img>
            </div>
          </StackGrid>
          <Row className="bottom-section">
            <Col className="left-column" sm={4}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="online-experience">
                  <div>
                    <i class="fas fa-caret-right"></i>
                  </div>
                  <div>ONLINE EXPERIENCE</div>
                </div>
                <div style={{ display: "flex" }}>
                  <button className="update-delete-button">
                    <Link
                      style={{ color: "black" }}
                      to={`/experiences/${singleExp._id}/update`}
                    >
                      Update
                    </Link>
                  </button>
                  <button className="update-delete-button" onClick={() => deleteExp(singleExp._id)}>Delete</button>
                </div>
              </div>
              <h1 style={{ marginTop: "10px" }} className="title">
                {singleExp.title}
              </h1>
              <div style={{ marginTop: "10px" }} className="country">
                {singleExp.country}
              </div>
              <div style={{ marginTop: "10px" }} className="rating">
                <div style={{ marginRight: "10px" }}>5.0</div>
                <div>
                  <i class="fas fa-star"></i>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {singleExp.tags.map((item) => (
                  <div
                    onClick={() => getFilteredExp(item._id)}
                    className="tags"
                  >
                    {item.tag}
                  </div>
                ))}
              </div>
            </Col>
            <Col className="right-column" sm={8}>
              <Row>
                <div
                  className="top-section"
                  style={{
                    borderTop: "1px solid #4747479c",
                    borderBottom: "1px solid #4747479c",
                  }}
                >
                  <span style={{ marginRight: "15px" }}>
                    <i class="fas fa-tablet-alt fa-2x"></i>
                  </span>
                  <span>
                    Book and join this experience from your computer, phone, or
                    tablet.
                  </span>
                </div>
              </Row>
              <Row>
                <Col sm={7} className="bottom-section">
                  <div>
                    <i class="far fa-clock" style={{ color: "#878787" }}></i>
                    <Row style={{ margin: "3px 0 3px 0" }}></Row>
                    <div style={{ color: "#878787" }}>Duration</div>
                    <div>{singleExp.duration} hour</div>
                  </div>
                  <div>
                    <i
                      class="fas fa-user-friends"
                      style={{ color: "#878787" }}
                    ></i>
                    <Row style={{ margin: "3px 0 3px 0" }}></Row>
                    <div style={{ color: "#878787" }}>Group Size</div>
                    <div>Up to {singleExp.groupS} people</div>
                  </div>
                  <div>
                    <i class="far fa-comments" style={{ color: "#878787" }}></i>
                    <Row style={{ margin: "3px 0 3px 0" }}></Row>
                    <div style={{ color: "#878787" }}>Hosted in</div>
                    <div>English</div>
                  </div>
                </Col>
                <Col sm={5}></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section2">
        <Container>
          <Row style={{ padding: "40px 0 40px 0" }}>
            <Col sm={4}>
              <h2 style={{ fontWeight: "bold" }}>What you'll do</h2>
            </Col>
            <Col sm={8} style={{ fontSize: "13pt" }}>
              <p>{singleExp.description}</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3">
        <Container>
          <Row className="try">
            <Col sm={4}>
              <h2 style={{ fontWeight: "bold" }}>Try something new together</h2>
            </Col>
            <Col sm={8} style={{ fontSize: "15pt" }} className="right-content">
              <Col sm={4}>
                <p>
                  <img
                    style={{ width: "30px" }}
                    src="https://a0.muscache.com/pictures/2f1e240c-d383-45e4-b34b-8957d061cb32.jpg"
                  />
                </p>
                <h5 style={{ fontSize: "13pt" }}>Thoughtful hosts</h5>
                <h5 style={{ fontSize: "13pt", fontWeight: "lighter" }}>
                  Get to know hosts who share their expertise and a window to
                  their world.
                </h5>
              </Col>
              <Col sm={4}>
                <p>
                  <img
                    style={{ width: "30px" }}
                    src="https://a0.muscache.com/pictures/6ca44422-9ab4-42d0-94a1-73fff922164e.jpg"
                  />
                </p>
                <h5 style={{ fontSize: "13pt" }}>Small group activities</h5>
                <h5 style={{ fontSize: "13pt", fontWeight: "lighter" }}>
                  Meet people from all over the world while learning something
                  new together.
                </h5>
              </Col>
              <Col sm={4}>
                <p>
                  <img
                    style={{ width: "30px" }}
                    src="https://a0.muscache.com/pictures/1ae9646f-4fdc-487a-a6f0-fea0a4a6cc44.jpg"
                  />
                </p>
                <h5 style={{ fontSize: "13pt" }}>Simple and global</h5>
                <h5 style={{ fontSize: "13pt", fontWeight: "lighter" }}>
                  Join easily and participate from home without a lot of prep.
                </h5>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4">
        <Container>
          <Row className="host">
            <Col sm={4}>
              <h2 style={{ fontWeight: "bold" }}>Your host</h2>
            </Col>
            <Col sm={8}>
              <p style={{ fontSize: "13pt" }}>
                Lorena, Krystel and myself Graciela run Aura Cocina Mexicana
                (@auramexcooking), a family business where we’ve hosted
                international culinary enthusiasts and former chefs since 2009.
              </p>
              <p style={{ fontSize: "13pt" }}>
                We’ve received the Traveler and Hospitality Award and the Global
                Quality Award in Culinary Training. Our experiences are
                considered by Day Tripper as one of the top “10 Things to do
                while in Mexico City” . Weekly, I host “Tu Cocina” a national
                public TV Cooking show and I am also a Mexican Chef Ambassador
                for different projects. After several years in the hospitality
                industry, Lorena now teaches cooking, as well as Krystel who
                managed a bakery business.
              </p>
              <p style={{ fontSize: "13pt" }}>
                We are passionate about Mexico’s culinary traditions and we
                would love to share with you our passion. Let´s Cook! Mi Casa es
                tu Casa.
              </p>
              <Row>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://a0.muscache.com/im/pictures/user/e62be9c0-98a4-4f48-93a2-6f58782d7f0d.jpg?aki_policy=profile_x_medium"
                    style={{
                      width: "80px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <p>Graciela</p>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://a0.muscache.com/im/pictures/user/b4bd56c0-7340-42ce-9b61-03b23954584d.jpg?aki_policy=profile_x_medium"
                    style={{
                      width: "80px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <p>Graciela</p>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://a0.muscache.com/im/pictures/user/b4b3de41-e70e-4e16-8d58-a0b4cb5cb244.jpg?aki_policy=profile_x_medium"
                    style={{
                      width: "80px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <p>Graciela</p>
                </div>
              </Row>
              <Button variant="outline-info" size="lg">
                Contact hosts
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section5">
        <Container>
          <Row className="items">
            <Col sm={4}>
              <h2 style={{ fontWeight: "bold" }}>What to bring</h2>
            </Col>
            <Col sm={8}>
              {singleExp.items.map((item) => (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "13pt",
                  }}
                >
                  <div className="right-content">
                    <span>
                      <i
                        style={{ fontWeight: "lighter" }}
                        class="far fa-check-circle fa-2x"
                      ></i>
                    </span>
                    <span style={{ width: "10px" }}></span>
                    <span>{item}</span>
                  </div>
                </span>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section6">
        <Container>
          <Row className="participate">
            <Col sm={4}>
              <h2 style={{ fontWeight: "bold" }}>How to participate</h2>
            </Col>
            <Col sm={8}>
              <div className="top-section">
                <h5 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  Join Video Call
                </h5>
                <h5 style={{ marginBottom: "30px", fontSize: "13pt" }}>
                  <a
                    href="#"
                    style={{ color: "black", textDecoration: "underline" }}
                  >
                    Download Zoom
                  </a>{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    for free on a desktop or mobile device. After you book,
                    you’ll receive an email with a link and details on how to
                    join.
                  </span>
                </h5>
                <div
                  style={{
                    padding: "30px",
                    backgroundColor: "#F7F7F7",
                    borderRadius: "10px",
                    marginBottom: "50px",
                  }}
                >
                  <p style={{ marginBottom: "0px" }}>
                    "While you're in your kitchen, we'll be in ours in Mexico
                    City. We'll guide you step-by-step until you have a
                    delicious Mexican taco in front of you to enjoy. You can
                    also join us with your favorite snack and beverage if you
                    just feel like watching us cook. Looking forward to meeting
                    you!"<br></br>
                    <b>— Graciela</b>
                  </p>
                </div>
              </div>
              <div className="bottom-section">
                <h5 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  Book a private group
                </h5>
                <p style={{ fontSize: "13pt" }}>
                  Want to join with just your family and friends? Graciela will
                  host a private group for up to 30 guests starting at $229.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section7">
        <Container>
          <Row className="review">
            <Col sm={4}>
              <h2 style={{ fontWeight: "bold" }}>Guest reviews</h2>
              <span style={{ display: "flex", alignItems: "center" }}>
                <h5 style={{ marginBottom: "0", marginRight: "20px" }}>4.97</h5>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </span>
            </Col>
            <Col sm={8}>
              <div className="right-content">
                <div className="top-section">
                  <img
                    src="https://a0.muscache.com/im/pictures/user/e62be9c0-98a4-4f48-93a2-6f58782d7f0d.jpg?aki_policy=profile_x_medium"
                    style={{
                      width: "45px",
                      borderRadius: "50%",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <span>
                      <b>Simran</b>
                    </span>
                    <span> . </span>
                    <span>July 2020</span>
                    <div>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p style={{ marginBottom: "40px", fontSize: "13pt" }}>
                  We did the class with our friends and it was amazing (only 4
                  people). We would have loved to do the class in person but
                  this was the next best thing. We had "backup" tortillas in
                  case ours didn't turn out right but this was quite amazing!!!
                  It's the best way to support a woman-run small business given
                  the times. Only advice to people who attend is to get your
                  ingredients prepped and ready - it was OUR mistake to not have
                  the ingredients ready and prepped but since it was 4 of us -
                  the moms were running around. :) Fabulous family activity. And
                  you may never buy store bought flour tortillas again!
                </p>
              </div>
              <div className="right-content">
                <div className="top-section">
                  <img
                    src="https://a0.muscache.com/im/pictures/user/4b081f84-1cce-41a8-b2db-06ee4d12fc25.jpg?aki_policy=profile_x_medium"
                    style={{
                      width: "45px",
                      borderRadius: "50%",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <span>
                      <b>Liisa</b>
                    </span>
                    <span> . </span>
                    <span>July 2020</span>
                    <div>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p style={{ marginBottom: "40px", fontSize: "13pt" }}>
                  I bought this for my friend's birthday and we both joined
                  remotely. Wonderful way to celebrate a birthday during COVID19
                  times! Definitely recommend!
                </p>
              </div>
              <div className="right-content">
                <div className="top-section">
                  <img
                    src="https://a0.muscache.com/im/pictures/user/b81dbbc9-80b0-4af7-a728-3564014e569d.jpg?aki_policy=profile_x_medium"
                    style={{
                      width: "45px",
                      borderRadius: "50%",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <span>
                      <b>Jens</b>
                    </span>
                    <span> . </span>
                    <span>July 2020</span>
                    <div>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p style={{ marginBottom: "40px", fontSize: "13pt" }}>
                  Such a great experience! Krystel is a warm and welcoming
                  person. We really enjoyed the cooking class and got a lot of
                  useful tips. The tacos were so delicious that I will
                  definitely cook them again. Highly recommended!
                </p>
              </div>
              <div className="right-content">
                <div className="top-section">
                  <img
                    src="https://a0.muscache.com/im/users/41967216/profile_pic/1440042736/original.jpg?aki_policy=profile_x_medium"
                    style={{
                      width: "45px",
                      borderRadius: "50%",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <span>
                      <b>Daniel</b>
                    </span>
                    <span> . </span>
                    <span>July 2020</span>
                    <div>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p style={{ marginBottom: "40px", fontSize: "13pt" }}>
                  It took a long time to eat, especially when everything was
                  already prepped. I was super hungry leading up to the final
                  meal!!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="section8">
          <Row className="availability">
            <Col sm={4}><h2 style={{fontWeight:"bold"}}>Availability</h2></Col>
            <Col sm={8}></Col>
          </Row>
        </div> */}
      <div className="section9">
        <Container>
          <Row className="keep-in-my">
            <Col sm={4}>
              <h2 style={{ fontWeight: "bold", paddingTop: "40px" }}>
                Things to keep in mind
              </h2>
            </Col>
            <Col sm={8}>
              <div className="right-content">
                <Col sm={4}>
                  <h5 style={{ fontWeight: "bold" }}>Cancellation policy</h5>
                </Col>
                <Col sm={8}>
                  <p style={{ marginBottom: "0" }}>
                    Any experience can be canceled and fully refunded within 24
                    hours of purchase, or at least 7 days before the experience
                    starts.
                  </p>
                  <a href="#" style={{ color: "#17a2b8" }}>
                    <b>Learn more</b>
                  </a>
                </Col>
              </div>
              <div className="right-content">
                <Col sm={4}>
                  <h5 style={{ fontWeight: "bold" }}>Communication policy</h5>
                </Col>
                <Col sm={8}>
                  <p style={{ marginBottom: "0" }}>
                    Always communicate through Airbnb. To protect your payment,
                    never transfer money or communicate outside of the Airbnb
                    website or app.
                  </p>
                  <a href="#" style={{ color: "#17a2b8" }}>
                    <b>Learn more</b>
                  </a>
                </Col>
              </div>
              <div className="right-content">
                <Col sm={4}>
                  <h5 style={{ fontWeight: "bold" }}>Guest requirements</h5>
                </Col>
                <Col sm={8}>
                  <p style={{ marginBottom: "0" }}>
                    You’ll need an internet connection and the ability to stream
                    audio and video to participate. A link and details on how to
                    join will be included in your booking confirmation email.
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    Up to 10 guests of all ages can attend.
                  </p>
                  <a href="#" style={{ color: "#17a2b8" }}>
                    <b>Learn more</b>
                  </a>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="moreexperience">
        <Container>
          <h2 style={{ fontWeight: "bold", padding: "40px 0 40px 0" }}>
            More online Experiences
          </h2>
          <div className="card-section">
            <div className="card">
              <img
                className="img"
                src="https://a0.muscache.com/im/pictures/ba146b68-de50-459f-9b30-2e1afe913696.jpg?aki_policy=poster"
              />
              <p>
                <b>ATHENS</b>
              </p>
              <p>'True vs False' Funny Historical Game</p>
              <p>From $9/person</p>
              <span>
                <i class="fas fa-star"></i>
                <span>4.96 (255)</span>
              </span>
            </div>
            <div className="card">
              <img
                className="img"
                src="https://a0.muscache.com/im/pictures/a2a3a611-011b-48be-86f7-5d16cb8a443a.jpg?aki_policy=poster"
              />
              <p>
                <b>ATHENS</b>
              </p>
              <p>'True vs False' Funny Historical Game</p>
              <p>From $9/person</p>
              <span>
                <i class="fas fa-star"></i>
                <span>4.96 (255)</span>
              </span>
            </div>
            <div className="card">
              <img
                className="img"
                src="https://a0.muscache.com/im/pictures/f9e4d494-7be8-4994-8a36-4ba55560668c.jpg?aki_policy=poster"
              />
              <p>
                <b>ATHENS</b>
              </p>
              <p>'True vs False' Funny Historical Game</p>
              <p>From $9/person</p>
              <span>
                <i class="fas fa-star"></i>
                <span>4.96 (255)</span>
              </span>
            </div>
            <div className="card">
              <img
                className="img"
                src="https://a0.muscache.com/im/pictures/lombard/MtTemplate-1695402-media_library/original/e07fb238-0fe9-419a-a649-0e9b4957b411.jpeg?aki_policy=poster"
              />
              <p>
                <b>ATHENS</b>
              </p>
              <p>'True vs False' Funny Historical Game</p>
              <p>From $9/person</p>
              <span>
                <i class="fas fa-star"></i>
                <span>4.96 (255)</span>
              </span>
            </div>
            <div className="card">
              <img
                className="img"
                src="https://a0.muscache.com/im/pictures/lombard/MtTemplate-1694230-media_library/original/5060fc94-34d4-4697-baae-2b0f96519230.jpeg?aki_policy=poster"
              />
              <p>
                <b>ATHENS</b>
              </p>
              <p>'True vs False' Funny Historical Game</p>
              <p>From $9/person</p>
              <span>
                <i class="fas fa-star"></i>
                <span>4.96 (255)</span>
              </span>
            </div>
          </div>
        </Container>
      </div>
      <Container style={{ marginBottom: "40px" }}>
        <a style={{ color: "#17a2b8", fontSize: "15pt" }} href="#">
          <b>Show all online experiences</b>
        </a>
      </Container>
    </div>
  );
}
