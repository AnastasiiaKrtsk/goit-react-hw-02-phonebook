import { nanoid } from 'nanoid';
//model.id = nanoid();=> "V1StGXR8_Z5jdHi6B-myT"

import { Component } from 'react';
import ContactForm from './contact-form/ContactForm';
import Contacts from './contacts/Contacts';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  handleNameChange = e => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Allow letters and spaces
    this.setState({
      name: value,
    });
  };
  formatPhoneNumber = input => {
    const value = input.replace(/\D/g, '');
    const formattedValue = value
      .slice(0, 7)
      .replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');

    return formattedValue;
  };
  handleNumberChange = e => {
    const formattedNumber = this.formatPhoneNumber(e.target.value);
    this.setState({ number: formattedNumber });
  };

  handleAddContact = () => {
    const { name, number, contacts } = this.state;
    const existingNameContact = contacts.find(
      contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    const existingNumberContact = contacts.find(
      contact => contact.number.trim() === number.trim()
    );

    if (existingNameContact && existingNumberContact) {
      alert(
        `Contact with the name "${name}" and number "${number}" already exists.`
      );
      return;
    } else if (existingNameContact) {
      alert(`Contact with the name "${name}" already exists.`);
      return;
    } else if (existingNumberContact) {
      alert(`Contact with the number "${number}" already exists.`);
      return;
    }
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      this.setState(prevState => ({
        name: '',
        number: '', // Clear the number input
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };
  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };
  onFilterChange = e => {
    const inputValue = e.target.value;
    this.setState({ filter: inputValue });
  };
  render() {
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase());
    });
    const { name, number } = this.state;
    return (
      <div className="main-div">
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          handleSubmit={this.handleAddContact}
        />
        <div className="filterContainer">
          <p>Find post</p>
          <input
            className="filterInput"
            onChange={this.onFilterChange}
            value={this.state.filter}
            type="text"
          />
        </div>
        <h2>Contacts</h2>
        <Contacts
          name={name}
          contacts={filteredContacts}
          number={number}
          id={nanoid()}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
