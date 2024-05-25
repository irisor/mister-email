// export function EmailFilter({ filterBy, onSetFilter }) {
export function EmailFilter() {
	return (
		<section className="email-filter">
			<input
				type="text"
				className="search"
				placeholder="Search mail"
				// value={filterBy.text}
				// onChange={(ev) => onSetFilter({ text: ev.target.value })}
			/>
			<select
				className="read-status"
				// value={filterBy.readStatus}
				// onChange={(ev) => onSetFilter({ readStatus: ev.target.value })}
			>
				<option value="All">All</option>
				<option value="Read">Read</option>
				<option value="Unread">Unread</option>
			</select>
		</section>
	);
}