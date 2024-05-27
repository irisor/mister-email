import { EmailPreview } from "./EmailPreview";

// export function MailList({ mails, onRemoveMail }) {
export function EmailList({ emails }) {

    return (
        <section className="email-list">
            <h2>Inbox</h2>
            <ul className="email-list__list clean-list">
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview email={email} />
                    </li>
                )}
            </ul>
        </section>
    )
}