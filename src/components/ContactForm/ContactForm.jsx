import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../store/contactsSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const number = formData.get('number');
    if (!name || !number) return;
    dispatch(addContact({ name, number }));
    e.target.reset();
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label className={styles.phoneLabel}>
        Name
        <input className={styles.phoneInput} type="text" name="name" required />
      </label>
      <br />
      <label className={styles.phoneLabel}>
        Number
        <input className={styles.phoneInput} type="tel" name="number" required />
      </label>
      <br />
      <button className={styles.addButton} type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
