import React, { useState} from "react";
import "../app.css";
import { db } from "../firebase";
import './Slider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import {useNavigate} from "react-router-dom";
import Logo from './icons/LOGO.png'
import IMG1 from './icons/img1.jpg'
import { Button, Card , Row, Col, Container , Navbar, Nav, Jumbotron } from 'react-bootstrap'


const Contact = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [news, setNews] = useState("");
  const [sentence, setSentence] = useState("");
  const [status, setstatus] = useState("unread");
  const [FAI, setFAI] = useState("");
  const [intFAI, setintFAI] = useState("");
  const [TAI, setTAI] = useState("");
  const [STonlyP, setSTonlyP] = useState("");
  const [onlyST, setTonlyST] = useState("");

  const [loader, setLoader] = useState(false);

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("website").doc("aroi")
      .set({
        startDate: startDate,
        news: news,
        sentence: sentence,
        status:status,
        FAI:FAI,
        intFAI:intFAI,
        TAI:TAI,
        STonlyP:STonlyP,
        onlyST:onlyST,



      })
      .then(() => {
        navigate("./AI");
        
        setLoader(false);
        alert("Your message has been submitted👍");
      })

      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setStartDate("");
    setNews("");
    setSentence("");
    setstatus("");
    setFAI("");
    setintFAI("");
    setTAI("");
    setSTonlyP("");
    setTonlyST("");
    
  };

//   return (

//     <form className="form" onSubmit={handleSubmit} style={{position: "absolute" , left: "200px" ,top:"250px"}}>
//       <div className="container-slider">
//             {dataSlider.map((obj, index) => {
//                 return (
//                     <div
//                     key={obj.id}
//                     className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
//                     >
//                         <img 
//                         src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} 
//                         />
//                     </div>
//                 )
//             })}
//             <BtnSlider moveSlide={nextSlide} direction={"next"} />
//             <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

//             <div className="container-dots">
//                 {Array.from({length: 3}).map((item, index) => (
//                     <div 
//                     onClick={() => moveDot(index + 1)}
//                     className={slideIndex === index + 1 ? "dot active" : "dot"}
//                     ></div>
//                 ))}
//             </div>
//       </div>

//       <img src ={Logo} ></img>

//       <h2>ยินดีต้อนรับ</h2>
//       <h1>ตรวจสอบข่าวสาร</h1>


//       <label>กรุณาระบุรายละเอียดข่าวสารแบบข้อความ</label>
//       <textarea
//         placeholder="เนื้อหาข่าว"
//         value={news}
//         onChange={(e) => setNews(e.target.value)}
//         required
//       ></textarea>

//       <button
//         type="submit"
//         style={{ background: loader ? "#ccc" : "#3F89F3" }}
//       >
//         ส่ง
//       </button>

//     </form>
//   );
// };

// export default Contact;

return (

  <form className="form" onSubmit={handleSubmit}>
    <Navbar className="NewsProof-Logo" style={{background :"#B2FFF1"}} expand="lg  ">
      <Navbar.Brand>
      <img src ={Logo} style={{height:"auto" ,width:"200px",marginLeft:"30%"}}></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="me-auto"></div>
        <Nav>
          <Nav.Link href="https://www.antifakenewscenter.com" target="_blank"><h11 style={{marginLeft:"20px",marginRight:"20px"}}>Anti-Fake News Center Thailand</h11></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Container style={{ padding :"20px" ,marginTop:"20px"}}>
      <br />
      <h2 style={{ textAlign:"center"}}>NewsProof เว็ปไซต์คัดกรองข่าวสาร</h2>
      <br />
      <Row>
        <Col md={4} style={{marginTop:"20px"}}>
          <Card style={{ padding:"20px"}}>
            <Card.Body>
              <center>
              <Card.Img variant="top" src={Logo}></Card.Img>
              <br />
              <Card.Title>
                <h1>ตรวจสอบข่าวสาร</h1>
              </Card.Title>
              </center>
            </Card.Body>
          </Card>
        </Col>




        <Col md={4} style={{marginTop:"20px"}}>
          <Card style={{ padding:"20px"}}>
            <Card.Body>
              <center>
              <br />
              <Card.Title>
                <h5 style={{marginBottom:"20px"}}>กรุณาระบุรายละเอียดข่าวสาร</h5>
                <textarea placeholder="เนื้อหาข่าว" value={news} onChange={(e) => setNews(e.target.value)} required style={{ height:"295px",width:"100%",textAlign:"center"}}></textarea>
              </Card.Title>
              <Button type="submit" style={{ background: loader ? "#ccc" : "#3F89F3" ,width:"200px",height:"50px"}}>ส่ง</Button>
              </center>
            </Card.Body>
          </Card>
        </Col>




        <Col md={4} style={{marginTop:"20px"}}>
          <Card style={{ padding:"2px"}}>
            <Card.Body>
              <Card.Img variant="top" src={IMG1} style={{height:"460px"}}></Card.Img>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  </form>
);
};

export default Contact;

