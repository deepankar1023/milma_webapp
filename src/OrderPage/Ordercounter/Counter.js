import React, { useState } from "react";

const Counter = () => {
    const [value, setValue] = useState(0);

    function decHandler() {
        if (value > 0) {
            setValue(value - 1);
        }
    }

    function incHandler() {
        setValue(value + 1);
    }

    return (
        <>
            <button onClick={decHandler}>-</button>
            <p>{value}</p>
            <button onClick={incHandler}>+</button>
        </>
    );
}

export default Counter;
