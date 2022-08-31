import React from 'react'
import { useFeedbackContext } from '../context/FeedbackContext'

function FeedbackStats() {
  const { feedback } = useFeedbackContext()

  //Calcualte average rating
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating
    }, 0) / feedback.length

  average = Number(average.toFixed(1).replace(/[.,]0$/, ''))

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats
