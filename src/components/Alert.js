import { useEffect } from 'react'

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="alert-header">
          <h2>Error</h2>
          <button className="alert-close" onClick={onClose}>&times;</button>
        </div>
        <div className="alert-body">
          <p>{message}</p>
        </div>
        <div className="alert-footer">
          <button className="alert-btn" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  )
}

export default Alert
