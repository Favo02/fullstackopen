import React from "react";

const PersonForm = ({ addPerson, editInputName, valueInputName, editInputNumber, valueInputNumber }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input onChange={editInputName} value={valueInputName} />
          <br />
          number: <input onChange={editInputNumber} value={valueInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm