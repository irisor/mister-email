import { useState } from "react";
import { Link } from "react-router-dom";

export function EmailPreview({ email, onStarClick }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    function onChecked(event) {
        event.preventDefault();
        setIsSelected(!isSelected);
    }

    function onStarClickPreview(event) {
        event.preventDefault();
        onStarClick(email.id);
    }

    return (
        <article className={`email-preview ${email.isRead ? 'read' : ''} ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`} key={email.id} id="email-preview" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <Link className="email-preview__link" to={`/email/${email.id}`}>
                <button className={`email-preview__checkbox`} onClick={(event) => onChecked(event)}></button>
                <button className={`email-preview__star ${email.isStarred ? 'starred' : ''}`} onClick={(event) => onStarClickPreview(event)}></button>
                <div className="email-preview__from">{email.fromFullname}</div>
                <div className="email-preview__text">
                    <span className="email-preview__subject">{email.subject}</span>
                    <span className="email-preview__body">
                        <span className="email-preview__dash">&nbsp;-&nbsp;</span>{email.body}
                    </span>
                </div>
                <div className="email-preview__date">{new Date(email.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div className="email-preview__actions">
                    <button className="email-preview__action archive" onClick={() => console.log('archive button clicked')}></button>
                    <button className="email-preview__action delete" onClick={() => console.log('delete button clicked')}></button>
                    <button className="email-preview__action unread" onClick={() => console.log('unread button clicked')}></button>
                    <button className="email-preview__action snooze" onClick={() => console.log('snooze button clicked')}></button>
                </div>
            </Link>
        </article>
    )
}