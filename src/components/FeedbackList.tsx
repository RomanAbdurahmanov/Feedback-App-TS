import React from 'react'
import { motion, AnimatePresence, AnimatePresenceProps } from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import Spinner from './Shared/Spinner'
import { useFeedbackContext } from '../context/FeedbackContext'

const CustomAnimatePresence: React.FC<AnimatePresenceProps & {
  children: React.ReactNode
}> = AnimatePresence

function FeedbackList() {
  const { feedback, isLoading } = useFeedbackContext()

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No feedback yet</p>
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <CustomAnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </CustomAnimatePresence>
    </div>
  )

  // return (
  //   <div className='feedback-list'>
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //     ))}
  //   </div>
  // )
}

export default FeedbackList
