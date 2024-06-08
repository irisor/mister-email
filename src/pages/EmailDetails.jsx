import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service.js"

export function EmailDetails() {

    const [email, setEmail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        if (params.emailId === "0") return
        const email = await emailService.getById(params.emailId)
        setEmail(email)
    }

    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <section className="email-header">
                <Link className="back" to={`/mail/${email.status}`}></Link>
            </section>
            <section className="email-content">
                <div className="email-subject">
                    <h2 >{email.subject}</h2>
                </div>
                <p className="email-from">{email.fromEmail}</p>
                <p className="email-to">to {emailService.isLoggedinUser(email.toEmail) ? 'me' : email.toEmail}</p>

                <p className="email-date">{utilService.displayFullDate(email.sentAt)}</p>
                <p className="email-body">{email.body}</p>
            </section>
        </section>
    )
}