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
    const { folder } = useParams()
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter({ folder }))

    useEffect(() => {
        const newFilterBy = emailService.getDefaultFilter({ folder });
        setFilterBy(newFilterBy);
        loadMails(newFilterBy)
    }, [folder])

    useEffect(() => {
        debouncedLoadMails(filterBy)
    }, [filterBy])

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }

    const debouncedLoadMails = debounce((filterBy) => {
        loadMails(filterBy)
    }, 300)

    async function loadMails(filterBy) {
        try {
            const emails = await emailService.query(filterBy);
            setEmails(emails);
        } catch (error) {
            console.log('Having issues with loading e-mails:', error);
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
            }).filter(email => email.id !== emailId || emailService.isInFilter(email, filterBy)))
        } catch (error) {
            console.log('Having issues starring e-mail:', error)
        }
    }

    async function onToggleRead(emailId) {
        try {
            await emailService.toggleRead(emailId)
            setEmails(prevMails => prevMails.map(mail => {
                if (mail.id === emailId) mail.isRead = !mail.isRead
                return mail
            }).filter(email => email.id !== emailId || emailService.isInFilter(email, filterBy)))
        } catch (error) {
            console.log('Having issues toggling read status of e-mail:', error)
        }
    }

    async function onChangeStatus(emailId, newStatus) {
        try {
            await emailService.changeStatus(emailId, newStatus)
            setEmails(prevMails => prevMails.map(mail => {
                if (mail.id === emailId) mail.status = newStatus
                return mail
            }).filter(email => email.id !== emailId || emailService.isInFilter(email, filterBy)))
        } catch (error) {
            console.log('Having issues changing status of e-mail:', error)
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

            <section className="email-index__list">
                <EmailList emails={emails} onRemoveMail={onRemoveMail} onStarClick={onStarClick} onToggleRead={onToggleRead} onChangeStatus={onChangeStatus} />
            </section>
        </section>
    )
}
