import React, { ReactElement } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddBook from "./components/addBook";
import BookDetails from "./components/BookDetails/bookDetails";
import Header from "./components/header";
import BookCards from "./components/BookList/BookCards";
import Register from "./components/registration";
import Login from "./components/login";
import { ContextProvider } from "./Context/UserContext";
import { Carousel } from "react-bootstrap";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpg";
import image5 from "./images/image5.jpg";

interface Props {}

export default function App({}: Props): ReactElement {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
            <Carousel fade>
            <Carousel.Item className="carousel-item">
              <img
                className="d-block w-100 carousel-wrap"
                src={image1}
                alt="First slide"
              />
              <Carousel.Caption>
                <p style={{fontSize:'larger',fontWeight:'bolder'}}>
                  Chase knowledge through the Pages of a Book and Chase the books through Bookishness
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <img
                className="d-block w-100 carousel-wrap"
                src={image2}
                alt="Second slide"
              />
              <Carousel.Caption>
                <p style={{fontSize:'larger',fontWeight:'bolder'}}>
                  Chase knowledge through the Pages of a Book and Chase the books through Bookishness
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <img
                className="d-block w-100 carousel-wrap"
                src={image3}
                alt="Third slide"
              />
              <Carousel.Caption>
                <p style={{fontSize:'larger',fontWeight:'bolder'}}>
                  Chase knowledge through the Pages of a Book and Chase the books through Bookishness
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <img
                className="d-block w-100 carousel-wrap"
                src={image4}
                alt="Fourth slide"
              />
              <Carousel.Caption>
                <p style={{fontSize:'larger',fontWeight:'bolder'}}>
                  Chase knowledge through the Pages of a Book and Chase the books through Bookishness
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <img
                className="d-block w-100 carousel-wrap"
                src={image5}
                alt="Fifth slide"
              />
              <Carousel.Caption>
                <p style={{fontSize:'larger',fontWeight:'bolder'}}>
                  Chase knowledge through the Pages of a Book and Chase the books through Bookishness
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
              <BookCards></BookCards>
            </Route>
            <Route exact path="/addBook">
              <AddBook></AddBook>
            </Route>
            <Route exact path="/bookDetails/:paramId">
              <BookDetails></BookDetails>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Register></Register>
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  );
}
/*
  {/* <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://live.staticflickr.com/5198/7092999077_c98e9a0361.jpg"
            style={{maxHeight:"30vw"}} alt="First slide"
          />
          <Carousel.Caption>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            ummyHeader>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://th.bing.com/th/id/R1419bb87b366eff6e4a2f593430a600b?rik=gZI3TJUQad%2fYPg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f06%2fBook-wallpaper-pictures-hd-wallpapers.jpg&ehk=9iJOfOeK1D7BsRFOmZdLjr15LRp2AAZAqOgRicIZq9U%3d&risl=&pid=ImgRaw"
            style={{maxHeight:"30vw"}} alt="Second slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <DummyHeader></DummyHeader>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://th.bing.com/th/id/Ra610222fc38ad42d0a79db225593d3c4?rik=0YXxSGVaIx2m%2fg&riu=http%3a%2f%2f2.bp.blogspot.com%2f-02vUJ8IVpWs%2fUoX14pFQR3I%2fAAAAAAAAECA%2fzPztjR3W2RY%2fs1600%2fwonderful-autumn-leaves-onbook-wallpapers-t.jpg&ehk=tVKO0%2fs4SQ82iGvm7lbUmueE8UPAoQClZGGjk8JngXQ%3d&risl=&pid=ImgRaw"
            style={{maxHeight:"30vw"}} alt="Third slide"
          />
          <Carousel.Caption>
             <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <DummyHeader></DummyHeader>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> 
*/
