import React, { useContext, useEffect } from 'react'
import { createContext, useState } from 'react'
import { FeedbackDataItem } from '../data/FeedbackData'

interface FeedbackEditType {
  item: FeedbackDataItem
  edit: boolean
}

export interface FeedBackContextInterface {
  feedback: FeedbackDataItem[]
  feedbackEdit: FeedbackEditType
  isLoading: boolean
  deleteFeedback: (id: string) => void
  addFeedback: (feedbackItem: FeedbackDataItem) => void
  editFeedback: (item: FeedbackDataItem) => void
  updateFeedback: (id: string, updItem: FeedbackDataItem) => void
}

const FeedbackContext = createContext<FeedBackContextInterface | undefined>(
  undefined
)

interface Children {
  children: React.ReactNode
}

export const FeedbackProvider = ({ children }: Children) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([
    {
      id: '',
      text: '',
      rating: 0,
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

  useEffect(() => {
    fetchFeedback()
  }, [])

  //Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=rating&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Delete feedback
  const deleteFeedback = async (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add new feedback
  const addFeedback = async (newFeedback: FeedbackDataItem) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  //Update feedback item
  const updateFeedback = async (id: string, updItem: FeedbackDataItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    const data = await response.json()
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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
        isLoading,
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
