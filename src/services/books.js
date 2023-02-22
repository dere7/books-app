import { apiKey } from '@env'

const API = 'https://www.googleapis.com/books/v1/volumes'
const fetchBooks = async (query = 'Mobile+Technology') => {
  const res = await fetch(`${API}?q=${query}&orderBy=newest&key=${apiKey}`)
  const data = await res.json()
  if (data.error) {
    throw new Error(data.error.message)
  }
  return data
}

const fetchBook = async (id) => {
  const res = await fetch(`${API}/${id}?key=${apiKey}`)
  const data = await res.json()
  if (data.error) {
    throw new Error(data.error.message)
  }
  return data
}

const fetchLibraries = async (token) => {
  const url = ` https://www.googleapis.com/books/v1/users/${userId}/bookshelves&key=${apiKey}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data
}

const bookService = {
  fetchBooks,
  fetchBook,
  fetchLibraries,
}
export default bookService
