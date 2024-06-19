import React, { useState } from "react";
import OrderCard from "../Ordercard/OrderCard";
import data from "../../data";

const OrderPage = ()  => {

    const [foods,setFood]= useState(data);
    return(
        <>
            <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">

                {
                    foods.map( (food) => {
                        return <OrderCard key={food.id} {...food} ></OrderCard>
                    } )
                }

          </div>
        </div>
      </section>
        </>
    );
}

export default OrderPage;