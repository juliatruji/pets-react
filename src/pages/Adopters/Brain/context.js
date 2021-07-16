import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

export const Provider = ({ children }) => {
  const [modalAdopt, setModalAdopt] = useState({ open: false, type: '' })

  const [adopts, setAdopts] = useState([])

  const value = {
    modalAdopt,
    setModalAdopt,
    adopts,
    setAdopts,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
