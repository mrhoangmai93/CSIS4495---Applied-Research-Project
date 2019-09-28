import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import './index.scss';

class CarouselScreen extends Component {
    render() {
        return (
            <Carousel>
            <Carousel.Item>
              <img
                className="carouselImage"
                src="/images/background-home.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carouselImage"
                src="/images/image2.jpg"
                alt="Second slide"
              />
          
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carouselImage"
                src="/images/image3.jpg"
                alt="Third slide"
              />
          
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        )
    }
}

export default CarouselScreen
