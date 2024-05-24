import { NavLink } from 'react-router-dom'

export function Nav() {

	return (
		<section className="nav">
			<nav>
				<NavLink to='/inbox'>Inbox</NavLink>
				<NavLink to='/starred'>Starred</NavLink>
				<NavLink to='/sent'>Sent</NavLink>
				<NavLink to='/draft'>Draft</NavLink>
			</nav>
		</section>
	)
}