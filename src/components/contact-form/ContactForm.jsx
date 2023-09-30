import React from 'react';
import styles from './ContactForm.module.css';
const ContactForm = ({
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
      <form onSubmit={onSubmit} className={styles.formStyle}>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
          maxLength={20}
          placeholder="Name"
          className={styles.inputStyle}
        />
        <input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
          placeholder="Phone Number"
          className={styles.inputStyle}
        />
        <button type="submit" className={styles.buttonStyle}>
          Add Contact
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
