import { useEffect, useState } from "react"
import { Outlet, useParams, useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";
import { NavLink } from "react-router-dom";
import { EmailMenuButton } from "../cmps/EmailMenuButton.jsx";
import { EmailEdit } from "./EmailEdit.jsx";

import imgUrl from '../assets/images/logo_gmail.png'

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [menuCollapsed, setMenuCollapsed] = useState(false)
    const [foldersHovered, setFoldersHovered] = useState(false)
    const {folder, emailId} = useParams()
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter({ folder }))
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const compose = searchParams.get('compose')

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

    async function onSaveEmail(emailToSave) {
        try {
            const email = await emailService.save(emailToSave)
            if (!emailToSave.id) {
                setEmails(prevEmail => [email, ...prevEmail])
                setSearchParams(prev => ({ ...prev, compose: email.id }))
            } else {
                setEmails(prevEmails => prevEmails.map(_email => _email.id === email.id ? email : _email))
            }
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onCloseEmail() {
        navigate(`/mail/${folder}`)
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className={`email-index ${menuCollapsed ? 'menu-collapsed' : ''} ${foldersHovered ? 'folders-hovered' : ''} `}>
            
            {/* Display EmailEdit only if compose search param exists*/}
            {compose ? <EmailEdit emailId={compose === 'new' ? 0 : compose} onSaveEmail={onSaveEmail} onCloseEmail={onCloseEmail} /> : null}
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
