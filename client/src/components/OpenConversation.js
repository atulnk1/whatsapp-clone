import React, { useState, useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversation() {
    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])
    const { sendMessage, selectedConversation } = useConversations()

    const handleSubmit = (e) => {

        e.preventDefault()

        sendMessage(
            selectedConversation.recipients.map(r => r.id),
            text
        )

        // reset text after sending it to blank
        setText('')
    }

    return(
        // d-flex because we want to be able to change the size of things inside of here
        // flex-column we want the messages to stack on top of the actual flex box
        // flex-grow-1 to get this right side to fill the full height because it is stuck inside 
        // the Dashboard which is a d-flex
        <div className='d-flex flex-column flex-grow-1'>
            {/* overflow-auto to ensure that we are able to allow the right side to scroll
            independently of the page */}
            <div className='flex-grow-1 overflow-auto'>
                {/* h-100 to take 100% of the height remaining in this section */}
                {/* align-items-start to algin messages to the left */}
                {/* justify-content-end start messages at the bottom and work their way up */}
                {/* px-3 padding to the left and right to space them away from the sides */}
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index 
                        return (
                            <div ref={lastMessage ? setRef : null} key={index} className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}>
                                {/* rounded box with some padding on x and y axis */}
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right': ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    {/* InputGroup in order to have the Send button attach
                    to the Input */}
                    <InputGroup>
                        <Form.Control 
                         as="textarea" 
                         required 
                         value={text} 
                         onChange={e => setText(e.target.value)}
                         style={{ height: '75px', resize: 'none'}}

                        />
                        <Button type="submit">Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}