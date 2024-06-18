import React from "react";

const OrderCard = () => {
    return (
        <>
        <div className="order-container">
            <div className="heading">
                <p>Order</p>
            </div>
            <div className="options">
                <ul>
                    <li>Token History</li>
                    <li>Order History</li>
                </ul>
            </div>
        </div>

    </>
    );
}


export default OrderCard;