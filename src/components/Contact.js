import React, { useState} from "react";
import "../app.css";
import { db } from "../firebase";
import './Slider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import {useNavigate} from "react-router-dom";
import Logo from './icons/LOGO.png'


const Contact = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [news, setNews] = useState("");
  const [sentence, setSentence] = useState("");
  const [status, setstatus] = useState("unread");
  const [FAI, setFAI] = useState("");
  const [intFAI, setintFAI] = useState("");
  const [TAI, setTAI] = useState("");

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

    db.collection("website").doc()
      .set({
        startDate: startDate,
        news: news,
        sentence: sentence,
        status:status,
        FAI:FAI,
        intFAI:intFAI,
        TAI:TAI,


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
    
  };

  return (

    <form className="form" onSubmit={handleSubmit} style={{position: "absolute" , left: "200px" ,top:"250px"}}>
      <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} 
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 3}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
      </div>

      <img src ={Logo}></img>

      <h2>ยินดีต้อนรับ</h2>
      <h1>ตรวจสอบข่าวสาร</h1>


      <label>กรุณาระบุรายละเอียดข่าวสารแบบข้อความ</label>
      <textarea
        placeholder="เนื้อหาข่าว"
        value={news}
        onChange={(e) => setNews(e.target.value)}
        required
      ></textarea>

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : "#3F89F3" }}
      >
        ส่ง
      </button>

    </form>
  );
};

export default Contact;
