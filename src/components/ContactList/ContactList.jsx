import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import { selectFilteredContacts, deleteContact } from '../../store/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} handleDeleteContact={handleDeleteContact} />
      ))}
    </ul>
  );
};

export default ContactList;
