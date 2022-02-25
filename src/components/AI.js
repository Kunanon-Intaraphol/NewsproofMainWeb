import {db} from "../firebase";
import React, { useState } from 'react';
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./aroi.css";

const Read = () => {
    
    const [info , setInfo] = useState([]);
  
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
  
    const Fetchdata = ()=>{
        db.collection("website").get().then((querySnapshot) => {
                
            querySnapshot.forEach(element => {
                var website = element.data();
                setInfo(arr => [...arr , website]);
            });
        })
    }
      
    return (
        <div>
            <center>
            <h1>NewsProof</h1> 
            <h2>โปรดใช้ดุลพินิจของท่านในการตัดสินใจ</h2>
            </center>   
            {
                info.map((website) => (
                <Frame News={website.news} 
                    Sentence={website.sentence} 
                    FAI={website.FAI}
                    INTFAI={website.intFAI}
                    TAI={website.TAI}
                    Status={website.status}/>
                    
                ))
               
            }
        </div>
        
    );
}

const Frame = ({News , Sentence , FAI ,Status ,TAI ,INTFAI}) => {

    console.log(News + " " + Sentence + " " + FAI + " " + TAI + " " + INTFAI);
    if(Status == "read"){
        console.log("inif")

        return(
        <div className="div">
            <h3>ผลลัพธ์</h3>


            <div style={{ width: 200, height: 200 , position: "absolute" ,top:"45%",left:"25%"}}>
                 <CircularProgressbar value={INTFAI}  text={`${INTFAI}%`} circleRatio={0.75} circleRatio={0.75} styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    textColor:"#FD645F",
                    width: "150px", 
                    height: "150px",
                    trailColor: "#909090",
                    pathColor:"#FD645F"
                    })}
                />
            </div>


            <h4>มีความเสี่ยงที่จะเป็นข่าวปลอม {FAI}%</h4>

            <p>
            {/* <h5>เพิ่มเติม</h5> */}
            <h5>เนื้อหาข่าว</h5>{News}
            </p>
    
        </div>
        );
    }

    else{

        return(
           
        
            <center>
                <div className="div">
    <p style={{fontSize: '20px'}}>โปรดรอสักครู่ ...ระบบกำลังประมวลผล... กรุณากดปุ่มเพื่อรับคำตอบ</p>     

    <button style={{    
        width: "250px",
        height: "60px",
        marginTop:'30px',
        color: "#ebedf1",
        backgroundColor: '#3F89F3',
        fontSize:'20px',
        borderRadius:'5px',
        }}
        onClick={() => window.location.reload(false)}
        >
        กดเพื่อรับผลคำตอบ
    </button>
                </div>
            </center>
           
        );
    }
    
;
}


export default Read;
