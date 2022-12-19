import './TodoList.css'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from '@apollo/client'
import { TODO_FEED } from '../queries'
import TodoListItem from './TodoListItem'

const TodoList = ({ listLength, pageLimit }) => {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(pageLimit)
  const { data, loading, error, fetchMore } = useQuery(TODO_FEED, {
    variables: { offset, limit }
  })
  
  const pageCount = Math.ceil(listLength / pageLimit)

  const handleFeed = () => fetchMore({ variables: { offset, limit } })

  const handlePagination = (e) => {
    if (e.nextSelectedPage !== undefined) {
      const newOffset = e.nextSelectedPage * pageLimit
      
      // last page should only show as many todos as there are left
      listLength - newOffset < pageLimit
        ? setLimit(listLength % pageLimit)
        : setLimit(pageLimit)

      setOffset(newOffset)
      handleFeed(e.nextSelectedPage)
    }
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p className="warning">Data fetching error</p>
  }

  if (!data) {
    return <p className="warning">Missing data</p>
  }

  return (
    <>
      <ul>
        {data.todoFeed.map((todo) =>
          <TodoListItem key={todo.id} todo={todo} />
        )}
      </ul>
      <ReactPaginate
        onClick={(e) => handlePagination(e)}
        pageCount={pageCount}
        breakLabel="..."
        previousLabel="< prev"
        nextLabel="next >"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default TodoList
