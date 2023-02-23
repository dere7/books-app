import { createContext, useContext, useReducer } from 'react'

const initialState = {
  user: null,
  auth: null,
  skipLogin: false,
  books: null,
  libraries: null,
  loading: false,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_AUTH':
        return {...state, auth: action.payload}
    case 'TOGGLE_SKIP_LOGIN':
        return {...state, skipLogin: !state.skipLogin}
    case 'SET_BOOKS':
        return {...state, books: action.payload}
    case 'SET_LIBRARIES':
        return {...state, libraries: action.payload}
    case 'TOGGLE_LOADING':
        return {...state, loading: !state.loading}
    case 'SET_ERROR':
        return {...state, error: action.payload}
    default:
      return state
  }
}

export const setUser = (payload) => ({ type: 'SET_USER', payload})
export const setAuth = (payload) => ({type: 'SET_AUTH', payload})
export const toggleSkipLogin = () => ({type: 'TOGGLE_SKIP_LOGIN'})
export const setBooks = (payload) => ({type: 'SET_BOOKS', payload})
export const setLibraries = (payload) => ({type: 'SET_LIBRARIES', payload})
export const toggleLoading = () => ({type: 'TOGGLE_LOADING'})
export const setError = payload => ({type: 'SET_ERROR', payload})

const Context = createContext({})

export const useAppState = () => useContext(Context)

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}
