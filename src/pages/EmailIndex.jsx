import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx";
// import { EmailHeader } from "../cmps/EmailHeader.jsx";
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";
import { NavLink } from "react-router-dom";

import imgUrl from '../assets/images/logo_gmail.png'

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

    async function onStarClick(emailId) {
        try {
            await emailService.toggleStar(emailId)
            setEmails(prevMails => prevMails.map(mail => {
                if (mail.id === emailId) mail.isStarred = !mail.isStarred
                return mail
            }))
        } catch (error) {
            console.log('Having issues starring e-mail:', error)
        }
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <header className="email-index__header">
                <div className="email-index__menu-logo">
                    <div className="email-index__menu" aria-expanded="false" aria-label="Main menu" role="button">
                        <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                    </div>
                    <NavLink className="email-index__logo" to="/">
                        <img src={imgUrl} width="109" height="40" alt="gmail logo" />
                    </NavLink>
                </div>
                <EmailFilter />
            </header>

            <EmailFolderList />
            
            <section className="email-index__list">
                <EmailList emails={emails} onRemoveMail={onRemoveMail} onStarClick={onStarClick}/>
            </section>
        </section>
    )
}
