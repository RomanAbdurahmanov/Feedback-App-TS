import React, { useContext } from 'react'
import { createContext, useState } from 'react'
import { FeedbackDataItem } from '../data/FeedbackData'
import { v4 as uuidv4 } from 'uuid'

interface FeedbackEditType {
  item: FeedbackDataItem
  edit: boolean
}

export interface FeedBackContextInterface {
  feedback: FeedbackDataItem[]
  feedbackEdit: FeedbackEditType
  deleteFeedback: (id: string) => void
  addFeedback: (FeedbackItem: FeedbackDataItem) => void
  editFeedback: (Item: FeedbackDataItem) => void
  updateFeedback: (id: string, updItem: FeedbackDataItem) => void
}

const FeedbackContext = createContext<FeedBackContextInterface | undefined>(
  undefined
)

interface Children {
  children: React.ReactNode
}

export const FeedbackProvider = ({ children }: Children) => {
  const [feedback, setFeedback] = useState([
    {
      id: '1',
      text: 'This is feedback item 1',
      rating: 10,
    },
    {
      id: '2',
      text: 'This is feedback item 2',
      rating: 8,
    },
    {
      id: '3',
      text: 'This is feedback item 3',
      rating: 4,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {
      id: '',
      text: '',
      rating: 0,
    },
    edit: false,
  })

  // Delete feedback
  const deleteFeedback = (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add new feedback
  const addFeedback = (newFeedback: FeedbackDataItem) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  //Update feedback item
  const updateFeedback = (id: string, updItem: FeedbackDataItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }

  // Set item to be updated
  const editFeedback = (item: FeedbackDataItem) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedbackContext = (): FeedBackContextInterface => {
  const feedbackContext = useContext(FeedbackContext)
  if (!feedbackContext)
    throw new Error(
      'No FeedbackContext.Provider found when calling useFeedbackContext.'
    )
  return feedbackContext
}

export default FeedbackContext
