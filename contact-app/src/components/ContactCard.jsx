import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png"

const ContactCard = (props) => {

    const { id, name, email } = props.contact
    return (
        <div className="item" style={{ display: "flex", padding: "20px" }}>
            <div style={{ display: "flex" }}>
                <img className="ui avatar image" src={user} alt="user" />
                <div className="content">
                    <Link to={`/contact/${id}`}>
                        <div className="header">{name}</div>
                        <div>{email}</div>
                    </Link>
                </div>

            </div>

            <div style={{ marginLeft: "auto", padding: "2px", }}>
                <i className="trash alternate outline icon"
                    style={{ color: "red", fontSize: "20px" }}
                    onClick={() => props.clickHandler(id)}>
                </i>

                <Link to={`/edit/${id}`} state={{ contact: props.contact }}>
                    <i className="edit alternate outline icon"
                        style={{ color: "blue", fontSize: "20px" }}
                        >
                    </i>
                </Link>
            </div>



        </div>
    )
}
export default ContactCard;