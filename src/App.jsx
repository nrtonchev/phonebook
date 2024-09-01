import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';

function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll()
          .then(personsData => {
            setPersons(personsData);
          })
  }, [])

  const personsToShow = filter ? 
    persons.filter(x => x.name.includes(filter)) : persons;

  const handleCreateDataFromChild = (data) => {
    personService.create(data)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
      });
  }

  const handleUpdateDataFromChild = (data) => {
    personService.update(data)
      .then(updatedPerson => {
        setPersons(persons.map(x => x.id !== updatedPerson.id ? x : updatedPerson));
      });
  }

  const handleUserDeletion = (id) => {
    personService.remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(x => x.id !== deletedPerson.id))
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h2>Add a new</h2>
      <PersonForm 
        persons={persons} 
        addPerson={handleCreateDataFromChild} 
        updatePerson={handleUpdateDataFromChild}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onUserDelete={handleUserDeletion}/>
    </div>
  )
}

export default App
