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
                    Status={website.status}
                    onlyST={website.onlyST}
                    STonlyP={website.STonlyP}/>
                    
                ))
               
            }
        </div>
        
    );
}

const Frame = ({News , Sentence , FAI ,Status ,TAI ,INTFAI,onlyST,STonlyP}) => {
    const data = []
    let lengthonlyST =  onlyST.length;
    for(var i=0;i<lengthonlyST;i++){
        console.log(i);
        

        data.push(
            { name: onlyST[i], gender: STonlyP[i]  },
        )
    }

    // const data = [
    //     { name: onlyST[0], gender: STonlyP[]  },
    //     { name:onlyST[1], gender: STonlyP[1] },
    //     { name: onlyST[2], gender: STonlyP[2] },
    // ]

    console.log(News + " " + Sentence + " " + FAI + " " + TAI + " " + INTFAI+ " " + onlyST+ " " + STonlyP);
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
            <h5>เนื้อหาข่าว</h5>{News}
            </p>

            <div className="AppTable">
                <table>
                    <tr>
                        <th>ประโยคที่มีความคล้ายที่จะเป็นข่าวปลอม</th>
                        <th style={{borderLeft:"4px solid #3F89F3"}}>เปอร์เซ็นต์</th>
                    </tr>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.gender}</td>
                            <td style={{borderLeft:"4px solid #3F89F3"}}>{val.name}</td>
                        </tr>
                    )
                    })}
                </table>
            </div>
            
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
