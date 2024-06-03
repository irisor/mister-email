import { useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";

export function EmailPreview({ email, onStarClick, onRemoveMail, onToggleRead, onChangeStatus }) {
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

    function onRemoveMailPreview(event) {
        event.preventDefault();
        onRemoveMail(email.id);
    }

    function onToggleReadPreview(event) {
        event.preventDefault();
        onToggleRead(email.id);
    }

    function onChangeStatusPreview(event, newStatus) {
        event.preventDefault();
        onChangeStatus(email.id, newStatus);
    }   

    return (
        <article className={`email-preview ${email.isRead ? 'read' : ''} ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''} `} id={email.id} key={email.id} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
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
                <div className="email-preview__date">{utilService.displayDate(email.sentAt)}</div>
                <div className="email-preview__actions">
                    <button className="email-preview__action archive" onClick={(event) => onChangeStatusPreview(event, 'archive')}></button>
                    <button className="email-preview__action delete" onClick={(event) => onRemoveMailPreview(event)}></button>
                    <button className="email-preview__action unread" onClick={(event) => onToggleReadPreview(event)}></button>
                </div>
            </Link>
        </article>
    )
}