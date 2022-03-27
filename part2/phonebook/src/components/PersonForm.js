import React from "react";

const PersonForm = ({ addPerson, editInputName, editInputNumber }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input onChange={editInputName} />
          <br />
          number: <input onChange={editInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm