import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';


function App() {
  const [id, setId] = useLocalStorage('id')

  // Need to wrap the ContactProvider around the Dashboard component so 
  // that we can provide the contacts and the creatContacts function to the Dashboard
  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />
    // <>
    //   {id}
    //   <Login onIdSubmit={setId} />
    // </>
  ) 
}

export default App;
