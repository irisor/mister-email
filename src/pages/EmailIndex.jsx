import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx";
// import { EmailHeader } from "../cmps/EmailHeader.jsx";
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";
import { NavLink } from "react-router-dom";

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const folder = useParams().folder

    useEffect(() => {
        loadMails(folder)
    }, [folder])

    async function loadMails(folder) {
        try {
            const filterBy = emailService.getDefaultFilter({ folder })
            const emails = await emailService.query(filterBy)
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
        <section className="email-index">
            <header className="email-index__header">
                <section className="container">
                    <div className="header__menu"></div>
                    <NavLink className="header__logo" to="/" src="/images/logo.png"></NavLink>
                    <EmailFilter />
                </section>
            </header>

            <div className="email-index__folders">
                <EmailFolderList />
            </div>
            <section className="email-index__list">
                <EmailList emails={emails} onRemoveMail={onRemoveMail} />
            </section>
        </section>
    )
}
