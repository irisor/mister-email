import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";
import { NavLink } from "react-router-dom";
import { EmailMenuButton } from "../cmps/EmailMenuButton.jsx";
import { EmailEdit } from "../cmps/EmailEdit.jsx";

import imgUrl from '../assets/images/logo_gmail.png'

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [menuCollapsed, setMenuCollapsed] = useState(false)
    const [foldersHovered, setFoldersHovered] = useState(false)
    const {folder, emailId} = useParams()
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter({ folder }))

    useEffect(() => {
        const newFilterBy = emailService.getDefaultFilter({ folder });
        setFilterBy(newFilterBy);
        loadMails(newFilterBy)
    }, [folder])

    async function loadMails(filterBy) {
        try {
            const emails = await emailService.query(filterBy);
            setEmails(emails);
        } catch (error) {
            console.log('Having issues with loading e-mails:', error);
        }
    }

    async function onUpdateEmail(newEmail) {
        try {
            await emailService.save(newEmail)
            let newEmails = emails.map(email => email.id === newEmail.id ? newEmail : email)

            // If the update involved removing an email, remove it from the list too
            if (newEmail.status === 'trash') {
                newEmails = newEmails.filter(email => email.id !== newEmail.id || emailService.isInFilter(email, filterBy))
            }
            setEmails(() => newEmails)

        } catch (error) {
            console.log('Having issues updating e-mail:', error)
        }
    }

    function onMenuBtnClick() {
        setMenuCollapsed(prev => !prev)
    }

    function onFoldersHover(status) {
        setTimeout(setFoldersHovered(status === 'start' ? true : false), 1000)
    }

    function onFoldersClick() {
        if (window.innerWidth <= 768) {
            setMenuCollapsed(() => true)
        }
    }


    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className={`email-index ${menuCollapsed ? 'menu-collapsed' : ''} ${foldersHovered ? 'folders-hovered' : ''} `}>
            <EmailEdit />
            <header className="email-index__header">
                <div className="email-index__menu-logo">
                    <EmailMenuButton onMenuBtnClick={onMenuBtnClick} />
                    <NavLink className="email-index__logo" to="/">
                        <img src={imgUrl} width="109" height="40" alt="gmail logo" />
                    </NavLink>
                </div>
                <EmailFilter onMenuBtnClick={onMenuBtnClick} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            </header>

            <EmailFolderList onFoldersHover={onFoldersHover} onFoldersClick={onFoldersClick} />

            <section className="email-index__content">
                {emailId ? <Outlet /> :
                    <EmailList 
                        emails={emails} 
                        onUpdateEmail={onUpdateEmail}
                     />
                }
            </section>
        </section>
    )
}
