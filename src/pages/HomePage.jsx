import { NavLink } from 'react-router-dom'

export function HomePage() {
	return (
		<section className='home-page'>
			<div className="home__logo"></div>
			<div className="home__text">
				<h1>I am writing a letter</h1>
				<h2>I’ve come to the end of the page</h2>
				<h3>To keep you from waiting forever,</h3>
				<h3>you’re welcome to engage!</h3>
			</div>
			<div className="home__enter">
				<NavLink to='/email'>Enter</NavLink>
			</div>
			<div className='home__about'>
				<NavLink to='/about'>About</NavLink>
			</div>
		</section>
	);
}