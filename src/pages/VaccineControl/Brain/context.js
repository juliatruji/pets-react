import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

export const Provider = ({ children }) => {
  const [modalVaccine, setModalVaccine] = useState(false)

  const [vaccines, setVaccines] = useState([])

  const value = {
    modalVaccine,
    setModalVaccine,
    vaccines,
    setVaccines,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
