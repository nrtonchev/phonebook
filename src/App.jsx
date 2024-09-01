import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';
import Notification from './components/Notification';
import Error from './components/Error';

function App() {
  const [persons, setPersons] = useState(null);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
          .then(personsData => {
            setPersons(personsData);
          })
          .catch(() => {
            setErrorMessage(`An error occured when attempting to get persons data`);
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
  }, [])

  const personsToShow = filter ? 
    persons.filter(x => x.name.includes(filter)) : persons;

  const handleCreateDataFromChild = (data) => {
    personService.create(data)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNotification(`Added ${createdPerson.name}`);
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(() => {
        setErrorMessage(`Could not create user: ${data.name}`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      });
  }

  const handleUpdateDataFromChild = (data) => {
    personService.update(data)
      .then(updatedPerson => {
        setPersons(persons.map(x => x.id !== updatedPerson.id ? x : updatedPerson));
        setNotification(`Updated ${updatedPerson.name}`);
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(() => {
        setErrorMessage(`Could not update user: ${data.name}`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      });
  }

  const handleUserDeletion = (id) => {
    personService.remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(x => x.id !== deletedPerson.id))
      })
      .catch(() => {
        setErrorMessage(`Could not delete user with id: ${id}`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      });
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Error message={errorMessage}/>
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
