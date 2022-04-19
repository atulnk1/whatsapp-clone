import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationContext = React.createContext()

// Shorthand to get our conversations that can be used by other components
export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationsProvider( {children} ) {
    // By default, we will have an empty array of conversations in local storage
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const { contacts } = useContacts()
    
    const createConversation = (recipients) => {
        // Appending our new contact to the end of our conversations list
        setConversations(prevConversations => {
            return[...prevConversations, {recipients, messages: []}]
        })
    }

    // variable to store the formatted conversations with the recipient id and name
    const formattedConversations = conversations.map(conversation => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient

            return { id: recipient, name }
        })

        return { ...conversations, recipients }
    })

    const value = {
        conversations: formattedConversations,
        createConversation
    }
    
    return(
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}