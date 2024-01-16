import { NavLink } from "react-router-dom"
import './TitleLink.css'

export const TitleLink = ({title, link}) => {
    return <div className="card__title__link">
        <h1>{title}</h1>
        <NavLink to={link}>
            <span className="material-symbols-outlined">
                open_in_new
            </span>
        </NavLink>
    </div>
}