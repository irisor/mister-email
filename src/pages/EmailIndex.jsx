import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx";
// import { EmailHeader } from "../cmps/EmailHeader.jsx";
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";
import { NavLink } from "react-router-dom";
import { EmailMenuButton } from "../cmps/EmailMenuButton.jsx";

import imgUrl from '../assets/images/logo_gmail.png'

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [menuCollapsed, setMenuCollapsed] = useState(false)
    const [foldersHovered, setFoldersHovered] = useState(false)

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

    function onMenuBtnClick() {
        console.log('menuBtnClicked')
        setMenuCollapsed(prev => !prev)
    }

    function onFoldersHover(status) {
        console.log('onFoldersHover', status)
        setTimeout(setFoldersHovered(status === 'start' ? true : false), 1000)
    }

    function onFoldersClick() {
        console.log('foldersClicked')
        if (window.innerWidth <= 768) {
            setMenuCollapsed(() => true)
        }
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className={`email-index ${menuCollapsed ? 'menu-collapsed' : ''} ${foldersHovered ? 'folders-hovered' : ''} `}>
            <header className="email-index__header">
                <div className="email-index__menu-logo">
                    <EmailMenuButton onMenuBtnClick={onMenuBtnClick} />
                    <NavLink className="email-index__logo" to="/">
                        <img src={imgUrl} width="109" height="40" alt="gmail logo" />
                    </NavLink>
                </div>
                <EmailFilter onMenuBtnClick={onMenuBtnClick} />
            </header>

            <EmailFolderList onFoldersHover={onFoldersHover} onFoldersClick={onFoldersClick} />

            <section className="email-index__list">
                <EmailList emails={emails} onRemoveMail={onRemoveMail} onStarClick={onStarClick} />
            </section>
        </section>
    )
}
