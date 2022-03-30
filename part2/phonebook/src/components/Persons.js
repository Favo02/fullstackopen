import React from "react";

const Persons = ({ filtered, deletePerson }) => {
    return (
        <>
            {filtered.map( person => {
                return (
                    <p key={person.id}>{person.name} {person.number}
                        <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                    </p>
                )
            })}
            
        </>
    )
}



export default Persons