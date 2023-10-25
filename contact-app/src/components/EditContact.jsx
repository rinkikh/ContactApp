import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const EditContact = (props) => {
    const location = useLocation();
    const { contact } = location.state;
    const [contactData, setContactData] = useState(contact);

    const navigate = useNavigate();

    const update = (e) => {
        e.preventDefault();
        if (contactData.name === "" || contactData.email === "") {
            alert("All fields are mandatory!");
            return;
        }

        props.updateContactHandler(contactData); // You need to implement this function
        navigate("/");
    }

    return (
        <div className="ui main" style={{ marginTop: "80px" }}>
            <h2>Edit contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    />
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
}

export default EditContact;
