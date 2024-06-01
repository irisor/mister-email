import { NavLink } from 'react-router-dom'

export function EmailFolderList({ onFoldersHover, onFoldersClick }) {

	return (

		<nav className="email-folder-list" onClick={() => onFoldersClick()}>
			<div className="email-folder-list__inner" id="email-folder-list" onMouseEnter={() => onFoldersHover('start')} onMouseLeave={() => onFoldersHover('end')}>
				<NavLink className="email-folder-list__item" to='/mail/inbox'>
					<div className="email-folder-list__item-icon inbox"></div>
					<span className='email-folder-list__item-text'>Inbox</span>
				</NavLink>
				<NavLink className="email-folder-list__item" to='/mail/starred'>
					<div className="email-folder-list__item-icon starred"></div>
					<span className='email-folder-list__item-text'>Starred</span>
				</NavLink>
				<NavLink className="email-folder-list__item" to='/mail/sent'>
					<div className="email-folder-list__item-icon sent"></div>
					<span className='email-folder-list__item-text'>Sent</span>
				</NavLink>
				<NavLink className="email-folder-list__item" to='/mail/draft'>
					<div className="email-folder-list__item-icon draft"></div>
					<span className='email-folder-list__item-text'>Draft</span>
				</NavLink>
			</div>
		</nav>
	)
}