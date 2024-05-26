import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../store/contactsSlice';
import styles from './ContactItem.module.css';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.itemLi}>
      {name}: {number}
      <button className={styles.deletebtn} onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ContactItem;
