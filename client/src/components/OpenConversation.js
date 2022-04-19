import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversation() {
    const [text, setText] = useState('')
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