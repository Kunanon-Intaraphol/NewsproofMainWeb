import {db} from "../firebase";
import React, { useState } from 'react';
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./aroi.css";
import Logo from './icons/LOGO.png'
import { Button, Card , Row, Col, Container , Navbar, Nav, Jumbotron } from 'react-bootstrap'

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
            {/* <div style={{backgroundColor:"#AFD0FF"}}>
            <center>
            <img src ={Logo}  style={{height:"60px"}}></img>
            </center>
            </div> */}
            
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

            
            
            <center>
            <h2 style={{marginTop:"20px"}}>โปรดใช้ดุลพินิจของท่านในการตัดสินใจ</h2>
            {/* <button style={{    
            width: "250px",
            height: "60px",
            color: "#ebedf1",
            backgroundColor: '#3F89F3',
            fontSize:'20px',
            borderRadius:'10px',
            position:"absolute",
            top:"30%",
            left:"43%"
            }}
            onClick={() => window.location.reload(false)}
            >
            กดเพื่อรับผลคำตอบ
            </button> */}
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
    

    
    const fai = FAI
    let predict;
    let perpre;
    let TCL;
    let PCL;

    if(fai > TAI){
        predict = 'มีความเสี่ยงที่จะเป็นข่าวปลอม';
        perpre = INTFAI;
        TCL ="#FD645F";
        PCL ="#FD645F";
    } else{
        predict = 'มีความคล้ายที่จะเป็นข่าวจริง';
        perpre =Math.round(TAI);
        TCL = "#3f89f3";
        PCL = "#3f89f3";
    }


    if(Status == "read"){   
        console.log("inif")


        

        return(
        <div className="div">
            {/* <h3>ผลลัพธ์</h3>
            <p1>
            <center>
            <div style={{ width: 200, height: 200}}>
                 <CircularProgressbar value={perpre}  text={`${perpre}%`} circleRatio={0.75} circleRatio={0.75} styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    textColor:TCL,
                    width: "150px", 
                    height: "150px",
                    trailColor: "#909090",
                    pathColor:PCL,
                    })}
                />
            </div>
            </center>
            </p1>
            <h4 style={{color:TCL}}>{predict}</h4>
            <p>
            <h5>เนื้อหาข่าว</h5><h6>{News}</h6>
            </p>
            
            <div className="AppTable">
                <table> 
                    <tr>
                        <th>ประโยคที่มีความคล้ายที่จะเป็นข่าวปลอม</th>
                        <th>%</th>
                    </tr>
                    {data.map((val, key) => {
                    if(fai>TAI){
                        return (
                            <tr key={key}>
                                <td>{val.gender}</td>
                                <td>{val.name}</td>
                            </tr>
                        )
                    }
                    })}
                </table>
            </div> */}




<Container style={{ padding :"20px" ,marginTop:"20px"}}>
    <center>
      <Row>
        <Col md={4} style={{marginTop:"20px"}}>
          <Card style={{ padding:"20px"}}>
            <Card.Body>
              <center>
              <Card.Img variant="top" src={Logo}></Card.Img>
              <br />
              <Card.Title>
                <h1>ตรวจสอบข่าวสาร</h1>
                <div style={{ width: 200, height: 200,marginTop:"30px"}}>
                 <CircularProgressbar value={perpre}  text={`${perpre}%`} circleRatio={0.75} circleRatio={0.75} styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    textColor:TCL,
                    width: "150px", 
                    height: "150px",
                    trailColor: "#909090",
                    pathColor:PCL,
                    })}
                />
                </div>
                <h4 style={{color:TCL,marginTop:"20px",marginBottom:"20px"}}>{predict}</h4>
              </Card.Title>
              </center>
            </Card.Body>
          </Card>
        </Col>




        <Col md={4} style={{marginTop:"20px"}}>
          <Card style={{ padding:"5px"}}>
            <Card.Body>
              <br />
              <Card.Title>
                <h5>เนื้อหาข่าว</h5>
                <textarea value={News} style={{ height:"383px",width:"100%",textAlign:"center"}}></textarea>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>

        


        <Col md={4} style={{marginTop:"20px"}} >
          <Card style={{ padding:"2px",border:"0px"}}>
            <Card.Body>
            <div className="AppTable">
                
                    
                    {data.map((val, key) => {
                    if(fai>TAI){
                        return (
                            <table style={{border:"1px"}}> 
                            <tr style={{border: "1px solid #3F89F3"}}>
                                <th>ประโยคที่มีความคล้ายที่จะเป็นข่าวปลอม</th>
                                <th style={{borderLeft: "1px solid #3F89F3",textAlign:"center"}}>%</th>
                            </tr>
                            

                            <tr key={key}>
                                <td style={{borderBottom: "1px solid #3F89F3"}}>{val.gender}</td>
                                <td style={{borderBottom: "1px solid #3F89F3", borderLeft: "1px solid #3F89F3"}}>{val.name}</td>
                            </tr>
                            </table>
                        )
                    }
                    })}
                    
                
            </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </center>
    </Container>











            
        </div>
        );
    }

    else{
        
    setTimeout(function() {
        window.location.reload(false);
    }, 3000)

        return(
           
        
            <center>
                <div className="div">
    <p3 style={{fontSize: '20px'}}>โปรดรอสักครู่ ...ระบบกำลังประมวลผล... กรุณากดปุ่มเพื่อรับคำตอบ</p3>   

    <button style={{    
        width: "250px",
        height: "60px",
        color: "#ebedf1",
        backgroundColor: '#3F89F3',
        fontSize:'20px',
        borderRadius:'10px',
        position:"absolute",
        top:"30%",
        left:"43%"
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