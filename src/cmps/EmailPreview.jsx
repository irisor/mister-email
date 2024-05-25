import { Link } from "react-router-dom";

export function EmailPreview({ email }) {

    return (
        <article className={`email-preview ${email.isRead ? 'read' : ''}`} key={email.id} id="robot-preview">
            <input type="checkbox" id={`email-${email.id}`}/>
			<button className={`email-preview__star ${email.isStarred ? 'starred' : ''}`} onClick={() => console.log('star button clicked')}></button>
            <Link to={`/email/${email.id}`}>
				<div>{email.fromFullname}</div>
				<div><span className="email-preview__subject">{email.subject}</span> {email.body}</div>
				<div className="email-preview__date">{new Date(email.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </Link>
        </article>
    )
}