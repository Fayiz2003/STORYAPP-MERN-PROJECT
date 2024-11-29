import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const addResponseContext = createContext()
export const editResponseContext = createContext()
export const profileResponseContext = createContext()

const ContextShare = ({children}) => {
    const [addResponse,setAddResponse] = useState("")
    const [editResponse,setEditResponse] = useState("")
    const [profileResponse,setProfileResponse] = useState("")

  return (
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
       <editResponseContext.Provider value={{editResponse,setEditResponse}}>
        <profileResponseContext.Provider value={{profileResponse,setProfileResponse}}>
           {children}
        </profileResponseContext.Provider>
       </editResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default ContextShare