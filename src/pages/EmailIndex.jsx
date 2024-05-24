import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx";

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
	const filter = useParams().filter

    useEffect(() => {
        loadMails()
    }, [filter])

    async function loadMails() {
        try {
            const emails = await emailService.query(filter)
            setEmails(emails)
        } catch (error) {
            console.log('Having issues with loading e-mails:', error)
        }
    }

    async function onRemoveMail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevMails => prevMails.filter(mail => mail.id !== emailId))
        } catch (error) {
            console.log('Having issues removing e-mail:', error)
        }
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <EmailList emails={emails} onRemoveMail={onRemoveMail} />
        </section>
    )
}
