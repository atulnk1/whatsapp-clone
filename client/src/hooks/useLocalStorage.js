// Custom hook to use local storage to store any information
import { useEffect, useState } from 'react'

// To find application information more easily in the 
// local storage and prevent conflicts with other apps
const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    // Function to get value from local storage and put it into state
    // Getting values for local storage and parsing the json
    // is very slow so we want to get it just once when we run this function
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }  
    })

    // Get value and store it into local storage
    // Any time our value or key change we need to store it into local storage
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]

}