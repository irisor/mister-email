import { MailPreview } from "./MailPreview";

// export function MailList({ mails, onRemoveMail }) {
export function MailList({ mails }) {

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                </li>
            )}
        </ul>
    )
}