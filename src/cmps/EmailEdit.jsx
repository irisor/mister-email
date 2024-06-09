import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { emailService } from "../services/email.service"

export function EmailEdit() {
	// const [windowState, setWindowState] = useState ('normal')
	const [isMinimized, setIsMinimized] = useState (false)
	const [isFullScreen, setIsFullScreen] = useState (false)
	const [searchParams, setSearchParams] = useSearchParams()
	const [email, setEmail] = useState(null)
	const compose = searchParams.get('compose')
	
	useEffect(() => {
		if (compose &&compose !== 'new') {
			getEmail(compose).then(email => setEmail(email))
		} else {
			setEmail(null)
		}
	}, [compose])

	const removeParam = (paramKey) => {
		if (searchParams.has(paramKey)) {
			searchParams.delete(paramKey);
			setSearchParams(searchParams);
		}
	}

	async function getEmail(emailId) {
		return await emailService.getById(emailId)
	}

	if (!compose) return <></>
	
	// const email = compose === 'new' ? null : getEmail(compose)
	return (
		<section className={`email-edit ${isMinimized ? 'minimized' : ''} ${isFullScreen ? 'fullscreen' : ''}`}>
			<div className="email-edit__inner">
				<div className="email-edit__header">
					<h2 className="email-edit__subject">{email ? email.subject : 'New Message'}</h2>
					<div className="email-edit__actions">
						<div className="email-edit__action minimize" onClick={() => setIsMinimized(prev => !prev)}></div>
						<div className="email-edit__action fullscreen" onClick={() => setIsFullScreen(prev => !prev)}></div>
						<div className="email-edit__action close" onClick={() => removeParam('compose')}></div>
					</div>
				</div>
				<form className="email-edit__form" open>
					EmailEdit
				</form>
			</div>
		</section>
	)
}