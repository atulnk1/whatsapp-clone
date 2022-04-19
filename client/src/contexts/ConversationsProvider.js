import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationContext = React.createContext()

// Shorthand to get our conversations that can be used by other components
export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationsProvider( {id, children} ) {
    // By default, we will have an empty array of conversations in local storage
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    // set selectedConversationIndex to first conversation if available
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts()
    
    const createConversation = (recipients) => {
        // Appending our new contact to the end of our conversations list
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    // function to taking messages from others in the server as well as sending 
    // messages from our local to the server
    // All we have is an array of recipients and we need to find out what conversation the message 
    // needs to go to and if there are no conversations yet, create one with this new message at the start
    const addMessageToConversation = ( {recipients, text, sender} ) => {
        setConversations(prevConversations => {
            // check to see if we do have a conversation that matches the 
            // recipients that we pass to the function and if we don't we can add 
            // it at the end
            let madeChange = false
            const newMessage = { sender, text }
            const newConversations = prevConversations.map(
                conversation => {
                    if(arrayEquality(conversation.recipients, recipients)) {
                        madeChange = true
                        return {
                            ...conversation,
                            messages: [...conversation.messages, newMessage]
                        }
                    }

                    return conversation
                }
            )

            if(madeChange) {

                return newConversations

            } else {
                return [...prevConversations, {recipients, messages: [newMessage]}]
            }
        })
    }

    const sendMessage = (recipients, text) => {
        addMessageToConversation( {recipients, text, sender: id })        
    }
    // variable to store the formatted conversations with the recipient id and name
    const formattedConversations = conversations.map((conversation, index) => {
        
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient

            return { id: recipient, name }
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender 

            return { ...message, senderName: name, fromMe}
        })

        const selected = index === selectedConversationIndex
        return { ...conversation, recipients, messages, selected }
    })

    const value = {
        conversations: formattedConversations,
        // pass this to display the selected conversation on the main part of the app
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }
    
    return(
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}

const arrayEquality = (a, b) => {
    if (a.length !== b.length) return false 

    a.sort()
    b.sort()

    // ensure every element in a is equalt to b
    return a.every((element, index) => {
        return element === b[index]
    })
}