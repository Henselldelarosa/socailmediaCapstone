import React from 'react'
import './DateCreated.scss'


const DateCreated = ({dateCreated}) => {
  const date = new Date(dateCreated)
  const month = date.toLocaleString('en-US', {month:'long'})
  const day = date.toLocaleString('en-Us', {day: '2-digit'})
  const year = date.getFullYear()
  return (
    <div>
        <div className='postDate'>
          {`${month}, ${day}, ${year}`}
        </div>
    </div>
  )
}

export default DateCreated
