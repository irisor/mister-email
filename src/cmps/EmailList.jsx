import { EmailPreview } from "./EmailPreview";

// export function MailList({ mails, onRemoveMail }) {
export function EmailList({ emails }) {

    return (
        <ul className="mail-list">
            {emails.map(email =>
                <li key={email.id}>
                    <EmailPreview email={email} />
                </li>
            )}
        </ul>
    )
}