import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { emailService } from "../services/email.service"

export function EmailEdit({ onSaveEmail, onCloseEmail }) {
	const [isMinimized, setIsMinimized] = useState(false)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [searchParams] = useSearchParams()
	const [email, setEmail] = useState(emailService.createEmail())
	const compose = searchParams.get('compose')

	useEffect(() => {
		if (compose && compose !== 'new') {
			emailService.getById(compose).then(email => setEmail(email))
		}
	}, [compose])

	useEffect(() => {
		let timeout;
		if (onSaveEmail) {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				onSaveEmail(email)
			}, 5000)
		}

		return () => {
			if (timeout) clearTimeout(timeout)
			if (onSaveEmail) {
				onSaveEmail(email)
			}
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

	if (!compose) return <></>

	const { fromEmail, toEmail, subject, body } = email


	return (
		<section className={`email-edit ${isMinimized ? 'minimized' : ''} ${isFullScreen ? 'fullscreen' : ''}`}>
			<div className="email-edit__inner">
				<div className="email-edit__header">
					<h5 className="email-edit__title">{email.id ? subject : 'New Message'}</h5>
					<div className="email-edit__actions">
						<div className="email-edit__action minimize" onClick={() => setIsMinimized(prev => !prev)}></div>
						<div className="email-edit__action fullscreen" onClick={() => setIsFullScreen(prev => !prev)}></div>
						<div className="email-edit__action close" onClick={onCloseEmail}></div>
					</div>
				</div>
				<form className="email-edit__form" open>
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
				</form>
			</div>
		</section>
	)
}