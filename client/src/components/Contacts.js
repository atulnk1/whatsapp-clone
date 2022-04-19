import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'


export default function Contacts() {
    const { contacts } = useContacts()

    return (
        // "flush" to get rid of the side borders on the left and right since
        // we already have the borders set previously from the Sidebar component
        <>
            <ListGroup variant="flush">
                {contacts.map(contact => (
                    <ListGroup.Item key={contact.id}>
                        {contact.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
        
    )
}