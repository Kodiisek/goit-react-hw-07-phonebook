import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { setFilter, fetchContacts } from '../../store/contactsSlice';

const Phonebook = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleChange = e => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Search contacts..."
      />
      <ContactList />
    </div>
  );
};

export default Phonebook;
