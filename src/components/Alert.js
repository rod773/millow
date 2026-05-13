import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Alert = ({ message, onClose }) => {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleClose = () => {
    setClosing(true)
  }

  return (
    <motion.div
      className="alert-overlay"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={closing ? { opacity: 0 } : { opacity: 1 }}
      onAnimationComplete={() => { if (closing) onClose() }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="alert-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={closing ? { opacity: 0, scale: 0.85, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="alert-header">
          <h2>Error</h2>
          <button className="alert-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="alert-body">
          <p>{message}</p>
        </div>
        <div className="alert-footer">
          <motion.button
            className="alert-btn"
            onClick={handleClose}
            whileTap={{ scale: 0.9 }}
          >
            OK
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Alert
