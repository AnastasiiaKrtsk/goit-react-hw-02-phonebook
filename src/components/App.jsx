import { nanoid } from 'nanoid';
//model.id = nanoid();=> "V1StGXR8_Z5jdHi6B-myT"

import { Component } from 'react';
import Section from './section/Section';
import AddContact from './add/AddContact';
import Contacts from './contacts/Contacts';
class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };
  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };
  handleNumberChange = e => {
    const formattedNumber = this.formatPhoneNumber(e.target.value);
    this.setState({ number: formattedNumber });
  };
  formatPhoneNumber = input => {
    const value = input.replace(/\D/g, '');
    const formattedValue = value
      .slice(0, 9)
      .replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');

    return formattedValue;
  };
  handleAddContact = () => {
    const { name, number } = this.state;
    const letters = /^[A-Za-z]+$/;

    if (letters.test(name) && name.trim() !== '' && number.trim() !== '') {
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
        <Section tittle="Name">
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={this.handleNameChange}
            maxLength={20}
          />
          <input
            type="tel"
            name="number"
            required
            value={number}
            onChange={this.handleNumberChange}
          />
        </Section>

        <AddContact onAddContact={this.handleAddContact} />
        <Section tittle="Contacts">
          <Contacts
            name={name}
            contacts={contacts}
            number={number}
            id={nanoid()}
          />
        </Section>
      </div>
    );
  }
}

export default App;
