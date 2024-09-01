import { useState } from "react";

const PersonForm = ({persons, addPerson, updatePerson}) => {
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }
    
    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value);
    }

    const sendDataToParent = (event) => {
        event.preventDefault();

        if(persons.find(x => x.name === newName && x.number === newPhone)){
           alert(`${newName} is already added to phonebook`);
        }       
        else {
            const existingPerson = persons.find(x => x.name === newName && x.number !== newPhone);
            const newPerson = { 
                ...existingPerson,
                name: newName, 
                number: newPhone
            };

            if(existingPerson) {
                if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                    updatePerson(newPerson);
                    clearForm();
                }
            }
            else{
                addPerson(newPerson);
                clearForm();
            }
        }
    }

    const clearForm = () => {
        setNewName('');
        setNewPhone('');
    }

    return(
        <form onSubmit={sendDataToParent}>
            <div>
            name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
            number: <input value={newPhone} onChange={handlePhoneChange}/>
            </div>
            <div>
            <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default PersonForm