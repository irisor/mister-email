import { NavLink } from 'react-router-dom'

export function EmailFolderList({ onFoldersHover, onFoldersClick }) {

	return (

		<nav className="email-folder-list" onClick={(event) => onFoldersClick(event)}>
			<section className="email-folder-list__inner " onMouseEnter={() => onFoldersHover('start')} onMouseLeave={() => onFoldersHover('end')}>
				<NavLink className="email-folder-list__compose" to={`?compose=new`}>
					<button className="email-folder-list__compose-inner" >
						<div className='email-folder-list__item-text'>
							Compose
						</div>
					</button>
				</NavLink>
				<div className="email-folder-list__folders" id="email-folder-list" >
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
			</section>
		</nav>
	)
}