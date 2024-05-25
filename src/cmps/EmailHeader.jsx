import { NavLink } from "react-router-dom";

export function EmailHeader() {
    return (
        <section className="header">
            <div className="header__menu"></div>
            <NavLink className="header__logo" to="/" src="/images/logo.png"></NavLink>
            {/* <EmailFilter /> */}
        
        </section>
    )
}