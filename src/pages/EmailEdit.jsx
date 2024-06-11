import { useState, useEffect, useRef } from "react"
import { emailService } from "../services/email.service"

export function EmailEdit({ emailId, onUpdateEmail, onCloseEmail }) {
	const [isMinimized, setIsMinimized] = useState(false)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [email, setEmail] = useState(emailService.createEmail())
	const [lastSavedEmail, setLastSavedEmail] = useState(email)
	const [title, setTitle] = useState('')
	const saveTimeout = useRef();
	const titleTimeout = useRef();
	const recentEmail = useRef();

	useEffect(() => {
		saveTimeout.current = null
		titleTimeout.current = null

		return () => {
			if (saveTimeout.current) {
				clearTimeout(saveTimeout.current)
			}

			if (titleTimeout.current) {
				clearTimeout(titleTimeout.current)
			}
		}
	}, [])

	useEffect(() => {
		// Save the previous email when switching to a new email
		if (email && isEmailChanged(email, lastSavedEmail)) {
			handleSaveEmail(email)
		}
		// Handle a new email that is newly composed
		if (!emailId || emailId === 0) {
			emailId = null
			const newEmail = emailService.createEmail()
			setEmail(newEmail)
			setLastSavedEmail(newEmail)
		} else {
			// Handle an existing email
			emailService.getById(emailId).then((_email) => {
				if (!_email.isRead) {
					_email.isRead = true
					onUpdateEmail(_email)
				}
				setEmail(_email);
				setLastSavedEmail(_email)
			});
		}

		// Reset timouts

		if (saveTimeout.current) {
			clearTimeout(saveTimeout.current)
			saveTimeout.current = null
		}

		if (titleTimeout.current) {
			clearTimeout(titleTimeout.current)
			titleTimeout.current = null
		}

	}, [emailId])

	useEffect(() => {
		// Handle saving the email on email changes
		if (onUpdateEmail && isEmailChanged(email, lastSavedEmail)) {
			recentEmail.current = email
			console.log("useEffect 2 timeout=", saveTimeout.current)
			if (!saveTimeout.current) {
				saveTimeout.current = setTimeout(() => {
					setLastSavedEmail(recentEmail.current)
					console.log("before onSaveEmail email=", recentEmail.current)
					handleSaveEmail(recentEmail.current)
				}, 5000)
			}
		}
		//Update the title
		if (title !== 'Draft saved') {
			setTitle(() => email.id ? email.subject : 'New Message')
		}
	}, [email])

	function handleChange({ target }) {
		let { name: field, value, type } = target
		switch (type) {
			case 'number':
			case 'range':
				value = +value
				break
			case 'checkbox':
				value = target.checked
				break
			default:
				break
		}
		setEmail(prev => ({ ...prev, [field]: value }))
	}

	function handleSaveEmail(_email) {
		onUpdateEmail(_email)
		if (saveTimeout.current) clearTimeout(saveTimeout.current)
		saveTimeout.current = null
		setTitle('Draft saved')
		titleTimeout.current = setTimeout(() => {
			setTitle(_email.id ? _email.subject : 'New Message')
		}, 2000)

	}

	function handleCloseEmail() {
		if (onUpdateEmail && isEmailChanged(email, lastSavedEmail)) {
			onUpdateEmail(email)
			if (saveTimeout.current) {
				clearTimeout(saveTimeout.current)
			}
		}
		onCloseEmail()
	}

	function handleSend(event) {
		event.preventDefault()
		handleSaveEmail ({ ...email, status: 'sent' })
		onCloseEmail()
	}

	function handleDelete(event) {
        event.preventDefault()
        handleSaveEmail({...email, status: 'trash'})
		onCloseEmail()
    }

	function isEmailChanged(email1, email2) {
		// eslint-disable-next-line no-unused-vars
		const { id: _id1, ...restEmail1 } = email1;
		// eslint-disable-next-line no-unused-vars
		const { id: _id2, ...restEmail2 } = email2;
		return JSON.stringify(restEmail1) !== JSON.stringify(restEmail2);
	}

	const { fromEmail, toEmail, subject, body } = email

	return (
		<section className={`email-edit ${isMinimized ? 'minimized' : ''} ${isFullScreen ? 'fullscreen' : ''}`}>
			<div className="email-edit__inner">
				<div className="email-edit__header">
					<h5 className="email-edit__title">{title}</h5>
					<div className="email-edit__actions">
						<div className="email-edit__action minimize" onClick={() => setIsMinimized(prev => !prev)}></div>
						<div className="email-edit__action fullscreen" onClick={() => setIsFullScreen(prev => !prev)}></div>
						<div className="email-edit__action close" onClick={() => handleCloseEmail()}></div>
					</div>
				</div>
				<form className="email-edit__form" onSubmit={event => handleSend(event)}>
					<div className="email-edit__from-container two-items">
						<label className="email-edit__from-label">From </label>
						<div className="email-edit__from" id="from" type="email">
							{email.id ? fromEmail : emailService?.getLoggedinUser()?.email}
						</div>
					</div>
					<div className="email-edit__to-container two-items">
						<label className="email-edit__to-label">To </label>
						<input className="email-edit__to" type="email" value={toEmail} onChange={event => handleChange(event)} name="toEmail" />
					</div>
					<input className="email-edit__subject" type="text" placeholder="Subject" value={subject} onChange={event => handleChange(event)} name="subject" />
					<textarea className="email-edit__body" type="text" value={body} onChange={event => handleChange(event)} name="body" />
					<div className="email-edit__footer">
						<button className="email-edit__footer-send" onClick={event => handleSend(event)}>Send</button>
						<button className="email-edit__footer-delete" onClick={event => handleDelete(event)}></button>
					</div>
				</form>
			</div>
		</section>
	)
}