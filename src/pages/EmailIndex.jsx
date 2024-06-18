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
    const [composeValue, setComposeValue] = useState(null);

    useEffect(() => {
        const newComposeValue = searchParams.get('compose');
        if (newComposeValue !== composeValue) {
            setComposeValue(newComposeValue);
        }
    }, [searchParams]);

    useEffect(() => {
        setFilterBy(emailService.getDefaultFilter({ folder }));
    }, [folder])

    useEffect(() => {
        loadMails(filterBy)
    }, [filterBy])

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
        setFoldersHovered(status === 'start' ? true : false)
    }

    function onFoldersClick() {
        if (window.innerWidth <= 768) {
            setMenuCollapsed(() => true)
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    async function onUpdateEmail(emailToSave, action = '') {
        try {
            const email = await emailService.save(emailToSave)
            if (!emailToSave.id) {
                if (folder === 'draft') setEmails(prevEmail => [email, ...prevEmail])
                if (composeValue) setSearchParams(prev => ({ ...prev, compose: email.id }))
            } else {
                let newEmails = emails.map(email => email.id === emailToSave.id ? emailToSave : email)

                // If the update involved removing or sending or archiving an email, or creating a draft when not in draft folderremove the email from the list immediately
                if (action === 'remove' || action === 'send' || action === 'archive' || action === 'draft' && folder !== 'draft') {
                    newEmails = newEmails.filter(email => email.id !== emailToSave.id || emailService.isInFilter(email, filterBy))
                }
                setEmails(newEmails)
            }
        } catch (error) {
            console.log('Having issues updating e-mail: ', error)
        }
    }

    function onCloseEmail() {
        navigate(`/mail/${folder}`)
        setComposeValue(null)
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className={`email-index ${menuCollapsed ? 'menu-collapsed' : ''} ${foldersHovered ? 'folders-hovered' : ''} `}>

            {composeValue ? <EmailEdit emailId={composeValue === 'new' ? 0 : composeValue} onUpdateEmail={onUpdateEmail} onCloseEmail={onCloseEmail} /> : null}
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
                {emailId ? <Outlet context={{ ping: 'ping', onCloseEmail }} /> :
                    <EmailList
                        emails={emails}
                        onUpdateEmail={onUpdateEmail}
                        folder={folder}
                    />
                }
            </section>
        </section>
    )
}

