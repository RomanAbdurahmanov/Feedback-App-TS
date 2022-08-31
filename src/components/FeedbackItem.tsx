import React from 'react'
import Card from './Shared/Card'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { FeedbackDataItem } from '../data/FeedbackData'
import { useFeedbackContext } from '../context/FeedbackContext'

interface FeedbackItemProps {
  item: FeedbackDataItem
}

function FeedbackItem({ item }: FeedbackItemProps) {
  const { deleteFeedback, editFeedback } = useFeedbackContext()
  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button
        onClick={() => {
          deleteFeedback!(item.id)
        }}
        className='close'
      >
        <FaTimes color='purple' />
      </button>
      <button
        onClick={() => {
          editFeedback(item)
        }}
        className='edit'
      >
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  )
}

export default FeedbackItem
