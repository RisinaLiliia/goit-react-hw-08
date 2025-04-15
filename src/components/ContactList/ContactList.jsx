import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  if (filteredContacts.length === 0) {
    return (
      <p className={css.emptyMessage}>No contacts found.</p>
    );
  }

  return (
    <ul className={css.ContactList}>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}
