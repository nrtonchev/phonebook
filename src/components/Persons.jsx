const Persons = ({ persons, onUserDelete }) => {

    const deleteUser = (person) => {
        if(window.confirm(`Delete ${person.name} ?`))
        {
            onUserDelete(person.id);
        }
    }

    if (!persons)
    {
        return null;
    }

    return (
        <>
            {persons.map(person =>
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deleteUser(person)}>delete</button>
                </li>
            )}
        </>
    )
}

export default Persons;