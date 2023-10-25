import React from "react";
import { Link, useParams } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = (props) => {
    // Use the useParams hook to get the id parameter from the URL
    const { id } = useParams();

    // Retrieve the contact's data based on the id
    const contact = props.contacts.find((c) => c.id === id);

    // Check if a matching contact was found
    if (!contact) {
        return (
            <div className="main">
                <div className="ui card centered">
                    <div className="content">
                        <div className="header">Contact not found</div>
                    </div>
                </div>
            </div>
        );
    }

    // Display the contact details
    return (
        <div className="main" style={{ marginTop: "80px" }}>
            <div className="ui card centered" >
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{contact.name}</div>
                    <div className="description">{contact.email}</div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/">
                    <button className="ui button blue">Back to Contact List</button>

                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;
