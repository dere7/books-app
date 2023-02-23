import { apiKey } from '@env'

const API = 'https://www.googleapis.com/books/v1/volumes'
const fetchBooks = async (query = 'Mobile+Technology') => {
  const res = await fetch(
    `${API}?q=${query}&orderBy=newest&maxResults=20&key=${apiKey}`
  )
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
  const url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${apiKey}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data
}

const fetchBooksInShelf = async (token, id) => {
  const url = `GET https://www.googleapis.com/books/v1/mylibrary/bookshelves/${id}/volumes?key=${apiKey}`
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
  fetchBooksInShelf
}
export default bookService
