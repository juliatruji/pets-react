import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

export const Provider = ({ children }) => {
  const [search, setSearch] = useState('')


  const value = {
    search, 
    setSearch
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
