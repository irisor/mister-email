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
        const email = await emailService.getById(params.emailId)
        setEmail(email)
    }

    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <Link to={`/mail/${email.status}`}>Back</Link>
            <h2 className="email-subject">{email.subject}</h2>
			<p className="email-from">{email.fromEmail}</p>
			<p className="email-to">to {emailService.isLoggedinUser(email.toEmail) ? 'me' : email.toEmail}</p>
			<p className="email-to">{utilService.displayFullDate(email.sentAt)}</p>
			<p className="email-body">{email.body}</p>
        </section>
    )
}