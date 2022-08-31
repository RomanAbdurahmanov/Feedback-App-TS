import React, { useEffect } from 'react'
import Card from './Shared/Card'
import Button from './Shared/Button'
import { useState } from 'react'
import RatingSelect from './RatingSelect'
import { FeedbackDataItem } from '../data/FeedbackData'
import { v4 as uuidv4 } from 'uuid'
import { useFeedbackContext } from '../context/FeedbackContext'

function FeedbackForm() {
  const { addFeedback, updateFeedback, feedbackEdit } = useFeedbackContext()
  const [text, setText] = useState<string>('')
  const [rating, setRating] = useState<number>(10)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)
  const [message, setMessage] = useState<string | null>()

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (e.target.value !== '' && e.target.value.trim().length < 10) {
      setBtnDisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  return (
    <Card>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault()
          if (text.trim().length >= 10) {
            const newFeedback: FeedbackDataItem = {
              text,
              rating,
              id: uuidv4(),
            }

            if (feedbackEdit.edit === true) {
              updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
              addFeedback!(newFeedback)
              setText('')
            }
          }
        }}
      >
        <h2>How would you rate your service with us</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
