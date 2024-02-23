import React, { Fragment, useState } from 'react'
import styles from './navbar.module.scss';
import leftArrow from '../../Assets/icons/next.png'
import downArow from '../../Assets/icons/down-arrow.png'
import iconProduct from '../../Assets/icons/product.png'
import iconStore from '../../Assets/icons/shop.png'
import iconList from '../../Assets/icons/to-do-list.png'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();

    function handlePathPush(path) {
        navigate(path);
    }


    const menus = [
        {
            name: 'Store',
            path: 'Stores',
            submenus: {
                options: [
                    // {
                    //     label: 'List Store',
                    //     icon: iconList, 
                    //     path: '/list-store'
                    // },
                    {
                        label: 'Create Store',
                        icon: iconStore,
                        path: 'Stores/create-store'
                    }],

            }
        },
        {
            name: 'Products',
            path: 'Products',
            submenus: {
                options: [
                    // {
                    //     label: 'List Products',
                    //     icon: iconList,
                    //     path: 'list-products'
                    // },
                    {
                        label: 'Create Products',
                        icon: iconProduct,
                        path: 'Products/create-products'
                    }],

            }
        },
        {
            name: 'Stocks',
            path: 'Stocks',
        },
    ];
    const toggleSubMenu = (menuName, path) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
        handlePathPush(path)
    };

    const arrowMenu = (menuName) =>  activeMenu === menuName ? downArow : leftArrow

    return (
        <Fragment>
            <input className={styles.menuToggle} type="checkbox" id='menuToggle' />
            <label className={styles.menuBurguer} for="menuToggle">
                <span></span>
            </label>
            <nav className={styles.navbar}>
                {menus.map((menu) => (
                    <div key={menu.name}>
                        <button className={styles.menuBtn} onClick={() => toggleSubMenu(menu.name, menu.path)} >
                            {menu.name}
                            <img src={arrowMenu(menu.name)} alt='arrow-menu' />
                        </button>
                        {activeMenu === menu.name && (
                            <ul className={styles.submenu} >
                                {menu?.submenus && menu.submenus.options.map((submenu, index) => (
                                    <div className={styles.wrapperSubmenu} onClick={() => handlePathPush(submenu.path)}>
                                        <img src={submenu.icon} />
                                        <li key={index}>{submenu.label}</li>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </nav>
        </Fragment>
    )
}
