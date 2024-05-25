export function AboutUs() {
	return (
		<div>
			<h1>About Us</h1>
			<p>Mister Email is a team of people who care about creating great email experiences. We work together to make it easy to send emails that get opened and clicked.</p>
			<p>If you have any questions or want to learn more, feel free to reach out.</p>
			<hr />
			<h2>Meet the Team</h2>
			<div className="team-grid">
				<div className="team-member">
					<img src="https://loremflickr.com/200/200/kitten" alt="Cat" />
					<h3>Jane Doe</h3>
					<p>Developer</p>
					<p>jane@example.com</p>
				</div>
				<div className="team-member">
					<img src="https://loremflickr.com/200/200/puppy" alt="Dog" />
					<h3>John Doe</h3>
					<p>Designer</p>
					<p>john@example.com</p>
				</div>
			</div>
		</div>
	);
}