import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input
            value={filter}
            onChange={handleFilterChange}
          />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input
                value={props.newName}
                onChange={props.handleNameChange}
              />
        <br />
        number: <input
                  value={props.newNumber}
                  onChange={props.handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.id}>
          {person.name} {person.number}
          {' '}
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        })
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App
