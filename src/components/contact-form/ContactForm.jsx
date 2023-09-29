import React from 'react';

const ContactForm = ({
  title,
  name,
  number,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  const onSubmit = e => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
          maxLength={20}
          placeholder="Name"
        />
        <input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
          placeholder="Phone Number"
        />
        <button type="submit">Add Contact</button>
      </form>
    </section>
  );
};

export default ContactForm;
