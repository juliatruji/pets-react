import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

export const Provider = ({ children }) => {
  const [modalCreateDog, setModalCreateDog] = useState({open: false, type: ''})
  const [modalAdoptDog, setModalAdoptDog] = useState(false)

  const [dogs, setDogs] = useState([])

  const value = {
    modalCreateDog,
    setModalCreateDog,
    dogs, 
    setDogs,
    modalAdoptDog,
    setModalAdoptDog
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
