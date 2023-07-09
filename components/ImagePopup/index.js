import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Modal from "react-modal";

const ImageSlider = ({projects, projectID, projectTitle}) => {
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [slidesToScroll, setSlidesToScroll] = useState(1);
  const [modalImages, setModalImages] = useState();

 console.log("project", projects)


 /* const images = [
    {
      id: 1,
      image:
        "https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg",
      title: "Lorem Ipsum Dolor Sit Amet",
    },
    {
      id: 2,
      image:
        "https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg",
      title: "Sed Do Eiusmod Tempor",
    },
    {
      id: 3,
      image:
        "https://media.istockphoto.com/id/1419044643/vector/artemis-1-rocket-on-its-way-to-the-moon.jpg?s=612x612&w=0&k=20&c=3JRllUj0hc-7S_zkQ-XDXA6uCb99LD8rk-1v6Kc7yPQ=",
      title: "Consectetur Adipiscing Elit",
    },
    {
      id: 4,
      image:
        "https://blog-cdn.reedsy.com/directories/admin/featured_image/417/large_how-to-become-a-childrens-book-illustrator-7396c5.jpg",
      title: "Tempor Incididunt",
    },
    {
      id: 5,
      image:
        "https://www.vectornator.io/blog/content/images/2022/03/611b8c046cc4036b1b6fc8e2_Cover-Children-Book--1-.png",
      title: "Ut Labore Et Dolore Magna Aliqua",
    }
  ];
  */

  const handleSlideClick = (index) => {
    sliderRef.current.slickGoTo(index);
    setCurrentSlide(index);
  };

  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    centerMode: true,
    infinite: true,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (current) => setCurrentSlide(current)
  };

  return (
    <>
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column"
          }}
          className="slider-container"
        >
          <Slider {...settings} ref={sliderRef}>
            {projects.map((project) => (
              
              <div style={{width: '100%', height: '100%', background: 'pink'}} key={project.id} className="slide">
                <img
                  style={{ objectFit: 'cover',  height: '300px', width: 'auto', objectFit: 'cover', margin: "4rem auto 0px auto" }}
                  src={project.imageSrc}
                />
              </div>
            ))}
          </Slider>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="dots"
          >
            {projects.map((project, index) => (
              <div
                key={projectID}
                className={index === currentSlide ? "dot active" : "dot"}
                onClick={() => handleSlideClick(index)}
              >
                <img src={project.imageSrc} 
                alt={projectTitle}
                 />
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default ImageSlider;
