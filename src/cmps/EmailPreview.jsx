import { Link } from "react-router-dom";

export function EmailPreview({ email, isSelected=false }) {

    return (
        <article className={`email-preview ${email.isRead ? 'read' : ''} ${isSelected ? 'selected' : ''}`} key={email.id} id="email-preview">
			<button className={`email-preview__checkbox ${isSelected ? 'selected' : ''}`} onClick={() => console.log('select button clicked')}></button>
			<button className={`email-preview__star ${email.isStarred ? 'starred' : ''}`} onClick={() => console.log('star button clicked')}></button>
            <Link className="email-preview__link" to={`/email/${email.id}`}>
				<div>{email.fromFullname}</div>
				<div>
                    <span className="email-preview__subject">{email.subject}</span>
                    <span className="email-preview__body">&nbsp;-&nbsp;{email.body}</span>
                </div>
				<div className="email-preview__date">{new Date(email.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </Link>
        </article>
    )
}