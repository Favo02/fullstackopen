import React from "react";

const Sum = ({ parts }) => {
    let sum = parts.reduce( (oldSum, part) => oldSum + part.exercises, 0 )
    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

export default Sum