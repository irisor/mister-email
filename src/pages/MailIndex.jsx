import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { mailService } from "../services/mail.service"
import { MailList } from "../cmps/MailList.jsx";

export function MailIndex() {

    const [mails, setMails] = useState(null)
	const filter = useParams().filter

    useEffect(() => {
        loadMails()
    }, [filter])

    async function loadMails() {
        try {
            const mails = await mailService.query(filter)
            setMails(mails)
        } catch (error) {
            console.log('Having issues with loading e-mails:', error)
        }
    }

    async function onRemoveMail(mailId) {
        try {
            await mailService.remove(mailId)
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        } catch (error) {
            console.log('Having issues removing e-mail:', error)
        }
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>
    )
}
