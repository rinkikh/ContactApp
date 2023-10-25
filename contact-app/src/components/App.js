import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./Header"
import ContactList from "./ContactList"
import AddContact from "./AddContact"
import ContactDetail from './ContactDetail';
import api from '../api/contacts'
import EditContact from './EditContact';


function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([])
  // JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  const [searchContact, setSearchContact] = useState("")
  const [searchResult, setSearchResult] = useState([])


  //retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts")
    return response.data
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: generateUniqueId(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data])
  }

  const updateContactHandler = async (updatedContact) => {
    const response = await api.put(`/contacts/${updatedContact.id}`, updatedContact);
    const updatedContactData = response.data;
    setContacts((prevContacts) => {
      return prevContacts.map((contact) => {
        if (contact.id === updatedContactData.id) {
          return updatedContactData;
        } else {
          return contact;
        }
      });
    });
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id != id;
    })

    setContacts(newContactList)
  }

  const searchHandler = (searchContact) => {
    setSearchContact(searchContact)
    if (searchContact !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ")
          .toLowerCase().includes(searchContact.toLowerCase())
      })
      setSearchResult(newContactList)
    }
    else {
      setSearchResult(contacts)
    }
  }

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts()
      if (allContacts) setContacts(allContacts)
    }
    getAllContacts();
  }, [])

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  function generateUniqueId() {
    return '_' + Math.random().toString(36).slice(2, 9);
  }

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>

          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/edit/:id" element={<EditContact
            updateContactHandler={updateContactHandler} />} />

          <Route path="/" element={<ContactList
            contacts={searchContact.length < 1 ? contacts : searchResult}
             getContactId={removeContactHandler}
            term={searchContact}
            searchKeyword={searchHandler}
          />}
          />
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
