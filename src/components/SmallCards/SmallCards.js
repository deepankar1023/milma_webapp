import React from "react";
import "./styles.css";


import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";


const SmallCard =()=> {
    return(
        <>
            <div className="cards">
                <div className="card">
                    <div className="imgBox"><img src={img1} alt="#"/></div>
                    <div className="txtBx"><p className="txt">Order Online</p></div>
                </div>

                <div className="card">
                    <div className="image"><img src={img2} alt="#"/></div>
                    <div className="cardname"><p>Order Online</p></div>
                </div>

                <div className="card">
                <div className="image"><img src={img3} alt="#"/></div>
                <div className="cardname"><p>Pro and Pro Plus</p></div>
                </div>

                <div className="card">
                <div className="image"><img src={img4} alt="#"/></div>
                <div className="cardname"><p>Night Life and Clubs</p></div>
                </div>
            </div>
        </>
    );
}

export default SmallCard;


                

                