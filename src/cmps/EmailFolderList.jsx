import { NavLink } from 'react-router-dom'

export function EmailFolderList() {

	return (
		<section className="email-foler-list">
			<nav>
				<NavLink to='/mail/inbox'>Inbox</NavLink>
				<NavLink to='/mail/starred'>Starred</NavLink>
				<NavLink to='/mail/sent'>Sent</NavLink>
				<NavLink to='/mail/draft'>Draft</NavLink>
			</nav>
		</section>
	)
}