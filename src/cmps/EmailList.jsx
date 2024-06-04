import { EmailPreview } from "./EmailPreview";

// export function MailList({ mails, onRemoveMail }) {
export function EmailList({ emails, onStarClick, onRemoveMail, onToggleRead, onSetIsRead, onChangeStatus }) {

    return (
        <section className="email-list">
            <ul className="email-list__list clean-list">
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview email={email} onStarClick={onStarClick} onRemoveMail={onRemoveMail} onToggleRead={onToggleRead} onSetIsRead={onSetIsRead} onChangeStatus={onChangeStatus}/>
                    </li>
                )}
            </ul>
        </section>
    )
}