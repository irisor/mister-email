import { NavLink } from 'react-router-dom'
import logoUrl from '../assets/images/io-mail1.svg'

export function HomePage() {
	return (
		<section className='home-page'>
			<div className="home__logo">
				<img src={logoUrl} alt="logo" />
			</div>
			<div className="home__text-header">
				<h1>I am writing a letter</h1>
				<h2>I’ve come to the end of the page</h2>
			</div>
			<div className="home__text-content">
				<h3>To avoid having you wait forever,</h3>
				<h3>you’re welcome to engage!</h3>
			</div>
			<div className="home__enter">
				<NavLink className="button" to='/mail/inbox'>Enter</NavLink>
			</div>
			<div className='home__about'>
				<NavLink className="button" to='/about'>About</NavLink>
			</div>
		</section>
	);
}