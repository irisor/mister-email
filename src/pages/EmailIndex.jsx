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
    const { folder, emailId } = useParams()
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

    async function onUpdateEmail(emailToSave) {
        try {
            const email = await emailService.save(emailToSave)
            console.log("folder", folder)
            if (!emailToSave.id) {
                if (folder === 'draft') setEmails(prevEmail => [email, ...prevEmail])
                if (compose) setSearchParams(prev => ({ ...prev, compose: email.id }))
            } else {
                let newEmails = emails.map(email => email.id === emailToSave.id ? emailToSave : email)

                // If the update involved removing or sending an email, remove the email from the list immediately
                if (emailToSave.status === 'trash' || emailToSave.status === 'sent' || emailToSave.status === 'draft' && folder!== 'draft') {
                    newEmails = newEmails.filter(email => email.id !== emailToSave.id || emailService.isInFilter(email, filterBy))
                }
                setEmails(() => newEmails)
            }
        } catch (error) {
            console.log('Having issues updating e-mail: ', error)
        }
    }

    function onCloseEmail() {
        navigate(`/mail/${folder}`)
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className={`email-index ${menuCollapsed ? 'menu-collapsed' : ''} ${foldersHovered ? 'folders-hovered' : ''} `}>

            {/* Display EmailEdit only if compose search param exists*/}
            {compose ? <EmailEdit emailId={compose === 'new' ? 0 : compose} onUpdateEmail={onUpdateEmail} onCloseEmail={onCloseEmail} /> : null}
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
