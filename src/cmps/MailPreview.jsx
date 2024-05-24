import { Link } from "react-router-dom";

export function MailPreview({ mail }) {

    return (
        <article className={`mail-preview ${mail.isRead ? 'read' : ''}`} key={mail.id} id="robot-preview">
            <input type="checkbox" />
			<button className={`star ${mail.isStarred ? 'starred' : ''}`} onClick={() => console.log('star button clicked')}></button>
            <Link to={`/mail/${mail.id}`}>
				<div>{mail.sender}</div>
				<div><span className="mail-subject">{mail.subject}</span> {mail.content}</div>
				<div className="mail-date">{new Date(mail.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </Link>
        </article>
    )
}