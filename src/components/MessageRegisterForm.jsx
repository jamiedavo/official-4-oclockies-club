import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getNewZealandLocalDate } from '../utils/dateHelpers'

const STATUS_OPTIONS = [
  'Raising a glass from afar',
  'Absent in body, present in spirit',
  'Officially excused',
  'On my way, allegedly',
  'Present and accounted for',
  'Running late, I cant find my vape',
  'Present, settled, and suitably refreshed',
  'On my way with snacks',
]

function MessageRegisterForm({ onMessagePosted }) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [formStatus, setFormStatus] = useState('idle')
  const [formMessage, setFormMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName) {
      setFormStatus('error')
      setFormMessage('Name is required before entering the official register.')
      return
    }

    if (!trimmedMessage) {
      setFormStatus('error')
      setFormMessage('A message is required before entering the official register.')
      return
    }

    setFormStatus('submitting')
    setFormMessage('')

    const localDate = getNewZealandLocalDate()

    const { error } = await supabase.from('messages').insert({
      name: trimmedName,
      status: status || null,
      message: trimmedMessage,
      local_date: localDate,
    })

    if (error) {
      console.error('Message submit error:', error)
      setFormStatus('error')
      setFormMessage(
        'Your message could not be posted. Please check your connection and try again.'
      )
      return
    }

    setFormStatus('success')
    setFormMessage('Your message has been posted to the official register.')
    setMessage('')

    if (typeof onMessagePosted === 'function') {
      onMessagePosted()
    }
  }

  const isSubmitting = formStatus === 'submitting'

  return (
    <form className="message-register-form" onSubmit={handleSubmit}>
      <div className="register-heading">
        <p className="eyebrow">Official Club Register</p>
        <h3>Leave a 4 O’Clockies Message</h3>
        <p>
          Add a note to the family register. The latest preview will refresh after
          posting, while the full history stays as placeholder entries until v1.4.
        </p>
      </div>

      <div className="form-field">
        <label htmlFor="message-name">Name</label>
        <input
          id="message-name"
          name="name"
          type="text"
          value={name}
          placeholder="Your name"
          required
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="message-status">Optional official status</label>
        <select
          id="message-status"
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">Optional official status</option>
          {STATUS_OPTIONS.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="message-body">Message</label>
        <textarea
          id="message-body"
          name="message"
          rows="5"
          value={message}
          placeholder="Write your 4 o’clockies message"
          required
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Posting to the Register...' : 'Post to Message Board'}
      </button>

      {formMessage && (
        <div
          className={`form-alert ${
            formStatus === 'success' ? 'form-alert-success' : 'form-alert-error'
          }`}
          role="status"
        >
          <p>{formMessage}</p>
        </div>
      )}

      <p className="form-note">
        Latest preview now refreshes from the official register. Full history remains
        placeholder entries until v1.4.
      </p>
    </form>
  )
}

export default MessageRegisterForm