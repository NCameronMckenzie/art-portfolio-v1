import { useRef, useState } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import Modal from "react-modal";
import ImagePopup from "../components/ImagePopup";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

//import jsonlint from 'jsonlint-mod';

// Local Data
import data from "../data/portfolio.json";

import styles from "../styles/popup.module.css";
import backgroundpic from '/public/wavey_background.png';

export default function Home() {
  //usestate
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImages, setModalImages] = useState();
  const projectID = 0;
  const projectTitle = '';
 
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  const openModal = (projectid) =>  {
    //console.log(JSON.stringify(data.projects[projectid-1].title));
    projectID = projectid-1;
    projectTitle = JSON.stringify(data.projects[projectID].title);
    //console.log("projectID", projectID);
    //console.log("project title", projectTitle);
    let project = data.projects.filter(e=>e.id == projectid);
    //console.log("og project" + JSON.stringify(project[0].moreImageSrcs[0]));
    //console.log(JSON.parse(JSON.stringify(data.projects[projectid-1])));
    setModalImages(JSON.parse(JSON.stringify(data.projects[projectID].moreImageSrcs)));
    setModalIsOpen(true);
  }

  // Handling Scroll for menu
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
    <div style={{
      zIndex:-1,
      position: 'fixed',
      width:'100vw',
      height:'100vh'
    }}>
      <Image
        src={backgroundpic}
        //priority={true}
        //placeholder = 'blur'
        layout="fill"
        objectFit="cover"
        alt='background image'
        //height='1vw'
        //sizes="width:1vw"
      />

    </div>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div align='center' className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          
          <Socials align='center' className="mt-2 laptop:mt-5" />

        </div>
        <div className="mt-10 laptop:mt-30 p-auto laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>

          {/* Image Modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{overlay:{ position:'fixed'}, content:{ position:'absolute', top:'0px', left:'0px', right:'0px', bottom:'0px', border:'0px', background:'rgba(0,0,0,04)', padding: '1px'}}}
          >
            <div style={{ position: "relative", width: '100%', height: '25%' }}>
              {/* close button */}
              <button
                style={{ position: "absolute", right: "25%", bottom: '0px'  }}
                onClick={() => setModalIsOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            {
              <ImagePopup projects={modalImages} projectID={projectID} projectTitle={projectTitle} />
            }
          </Modal>

          {console.log("Work Card All Data ===> ", data)}

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => openModal(project.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
