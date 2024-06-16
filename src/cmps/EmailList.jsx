import { EmailPreview } from "./EmailPreview";

// export function MailList({ mails, onRemoveMail }) {
export function EmailList({ emails, onUpdateEmail, folder }) {

    return (
        <section className="email-list">
            <ul className="email-list__list clean-list">
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview 
                            email={email} 
                            onUpdateEmail={onUpdateEmail}
                            folder={folder}
                            />
                    </li>
                )}
            </ul>
        </section>
    )
}