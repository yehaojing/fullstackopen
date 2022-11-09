import { useState, useEffect } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useMutation, useQuery } from '@apollo/client'


const SetBirthyear = (props) => {
  const [author, setAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  console.log(authors)

  useEffect(() => {
    if (!authors.loading) {
      setAuthor(authors.data.allAuthors[0].name);
    }
  }, [authors]); 

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  if (!props.show) {
    return null
  }



  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: author,
        setBornTo: Number(birthyear),
      }
    })

    setAuthor('')
    setBirthyear('')
  }
  
  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Author
          <select
            style={{ marginLeft: 10}}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {
            authors.loading ? 
              null : 
              authors.data.allAuthors.map((author) => <option value={author.name} key={author.name}>{author.name}</option>)
            }
          </select>
        </div>
        <div>
          Birthyear
          <input
            style = {{ marginLeft: 10}}
            type="number"
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear