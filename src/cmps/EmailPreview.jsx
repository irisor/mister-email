import { Link } from "react-router-dom";

export function EmailPreview({ email }) {

    return (
        <article className={`email-preview ${email.isRead ? 'read' : ''}`} key={email.id} id="robot-preview">
            <input type="checkbox" />
			<button className={`star ${email.isStarred ? 'starred' : ''}`} onClick={() => console.log('star button clicked')}></button>
            <Link to={`/mail/${email.id}`}>
				<div>{email.fromFullname}</div>
				<div><span className="mail-subject">{email.subject}</span> {email.body}</div>
				<div className="mail-date">{new Date(email.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </Link>
        </article>
    )
}