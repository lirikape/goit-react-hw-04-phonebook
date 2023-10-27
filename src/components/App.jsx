import { ContactForm } from "./ContactForm/ContactForm";
import React from 'react'
import { ContactList } from "./ContactList/ContactList";
import { SearchUser } from "./Filter/SearchUser"



export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
      filter: '',
  };

componentDidMount() {
const contacts = JSON.parse(window.localStorage.getItem('contacts'))
if(contacts?.length) {
  this.setState({contacts})
}
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.contacts !== this.state.contacts) {
    window.localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
}
}

  handleDeleteUser = id => {
		this.setState(prev => ({ contacts: prev.contacts.filter(user => user.id !== id) }))
	}

handleAddNewUser = newData => {
  this.setState((prevState) => ({
    contacts: [...prevState.contacts, newData],
  }));
}

handleChangeFilter = e => {
  this.setState({filter: e.target.value})
}

getFilterData =() => {
  return this.state.contacts.filter(user => user.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase()))
  // взяти массив даних
		// зробити фільтр
		// поввернути фільтрований масив
}

render() {
const filteredData = this.getFilterData()
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddNewUser={this.handleAddNewUser} contacts={this.state.contacts} />

      <h2>Contacts</h2>
      <SearchUser  setFilter={this.handleChangeFilter}/>
      <ContactList dataContact={filteredData} 
      deleteUser={this.handleDeleteUser}/>
    </div>
  )
}



}
