import React from 'react'
import { useState, useEffect } from 'react'
import { useFeedbackContext } from '../context/FeedbackContext'

interface RatingSelectProps {
  select: (rating: number) => void
}

function RatingSelect({ select }: RatingSelectProps) {
  const [selected, setSelected] = useState<number>()

  const { feedbackEdit } = useFeedbackContext()

  useEffect(() => {
    setSelected(feedbackEdit.item.rating)
  }, [feedbackEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRating = Number(e.currentTarget.value)
    if (isNaN(selectedRating) || selectedRating < 1 || selectedRating > 10) {
      return
    }
    setSelected(selectedRating)
    select(selectedRating)
  }

  return (
    <ul className='rating'>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  )
}

export default RatingSelect
