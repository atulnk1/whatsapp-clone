import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

// Shorthand to get our contacts that can be used by other components
export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider( {children} ) {
    // By default, we will have an empty array of contacts in local storage
    const [contacts, setContacts] = useLocalStorage('contacts', [])
    
    const createContact = (id, name) => {
        // Appending our new contact to the end of our contacts list
        setContacts(prevContacts => {
            return[...prevContacts, {id, name}]
        })
    }
    
    return(
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}