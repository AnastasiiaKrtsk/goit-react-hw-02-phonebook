import { nanoid } from 'nanoid';
//model.id = nanoid();=> "V1StGXR8_Z5jdHi6B-myT"

import { Component } from 'react';
import ContactForm from './contact-form/ContactForm';
import Contacts from './contacts/Contacts';
class App extends Component {
  state = {
    contacts: [],
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

  handleNumberChange = e => {
    const formattedNumber = this.formatPhoneNumber(e.target.value);
    this.setState({ number: formattedNumber });
  };
  formatPhoneNumber = input => {
    const value = input.replace(/\D/g, '');
    const formattedValue = value
      .slice(0, 7)
      .replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');

    return formattedValue;
  };

  handleAddContact = () => {
    const { name, number } = this.state;

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

  render() {
    const { name, contacts, filter, number } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          handleSubmit={this.handleAddContact}
        />
        <h2>Contacts</h2>
        <Contacts
          name={name}
          contacts={contacts}
          number={number}
          id={nanoid()}
        />
      </div>
    );
  }
}

export default App;
