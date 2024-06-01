export function EmailMenuButton({ onMenuBtnClick }) {
	return (
		<button className="email-index__menu simple-button" aria-expanded="false" aria-label="Main menu" role="button" onClick={() => onMenuBtnClick()}>
			<svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
		</button>
	)
}