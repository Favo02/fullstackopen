import React from "react";

const Form = ({ onChange, filter }) => {
    return (
        <>
            find countries <input value={filter} onChange={onChange} />
        </>
    )
}

export default Form