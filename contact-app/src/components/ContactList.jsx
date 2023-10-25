import React, { useRef } from "react";
import { Link } from 'react-router-dom'
import ContactCard from "./ContactCard"

const ContactList = (props) => {

    const inputEl = useRef("")

    const deleteContactHandler = (id) => {
        const confirmed = window.confirm("Are you sure want to delete this contact")
        if (confirmed) {
            props.getContactId(id)
        }
    }

    const updateContactHandler = (id) => {
        const confirmed = window.confirm("Are you sure want to edit this contact")
        if (confirmed) {
            props.getContactId(id)
        }
    }

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                clickHandler={deleteContactHandler}
                updateClickHandler={updateContactHandler}
                key={contact.id}
            />
        )
    })

    const getSearchContact = () => {
        props.searchKeyword(inputEl.current.value)
    }


    return (
        <div className="main" style={{ margin: "40px" }}>
            <h2 style={{ marginTop: "80px" }} >Contact List </h2>

            <Link to="/add">
                <button className="ui button blue right">Add Contact</button>

            </Link>

            <div className="ui search" style={{ marginTop: "20px" }}>
                <div className="ui icon input">
                    <input
                        ref={inputEl}
                        type="text" placeholder="search contact"
                        className="prompt" value={props.term} onChange={getSearchContact} />
                    <i className="serach icon"></i>

                </div>
            </div>


            <div className="ui celled list">
                {renderContactList.length >0 ? renderContactList:"No Contacts Available" }
            </div>

        </div>


    )

}

export default ContactList;