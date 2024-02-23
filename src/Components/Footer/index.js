import React from 'react'
import style from './footer.module.scss'
import iconFace from '../../Assets/icons/facebook.png'
import iconInst from '../../Assets/icons/instagram.png'
import iconIn from '../../Assets/icons/linkedin.png'


export default function Footer() {
    const redSocial = [
        {
            label: "Facebook",
            href: "https://www.facebook.com/Alexis",
            icon: iconFace
        },
        {
            label: "Instagram",
            href: "https://www.instagram.com/Alexis",
            icon: iconInst
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/alexis-e-duque-d/",
            icon: iconIn
        }
    ]
    return (
        <footer>
            <ul className={style.socialIcons}>
                {redSocial.map(item => 
                <li><a href={item.href} target="_blank"><img src={item.icon} alt={item.label} /></a></li>

                    )}
            </ul>
            <p>Todos los derechos reservados &copy; 2024 A.E.D.D</p>
        </footer>

    )
}
