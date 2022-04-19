import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'


export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations()
    
    return (
        // "flush" to get rid of the side borders on the left and right since
        // we already have the borders set previously from the Sidebar component
        <>
            <ListGroup variant="flush">
                {/* use index here instead since we don't have a conversation id */}
                {conversations.map((conversation, index) => (
                    <ListGroup.Item key={index} action onClick={() => selectConversationIndex(index)} active={conversation.selected}>
                        {conversation.recipients.map(r => r.name).join(', ')}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
        
    )
}