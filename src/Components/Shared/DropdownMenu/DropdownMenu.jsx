import React, { useState, useEffect, useRef } from 'react';
import { Icon, List } from 'semantic-ui-react';

import './DropdownMenu.scss';

const DropdownMenu = (props) => {
	const {menuItems, scrollToContent} = props;

	const [isOpen, setOpen] = useState(false),
		panelRef = useRef(null);

	useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setOpen(false);
            }
        };

        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
		document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

	const renderMenuItems = () => (
		menuItems.map((item, i) => (
			<List.Item key={i} onClick={() => scrollToContent(item.id)}>
			  	<div className='item-text-container'>
					<span className='item-number'>
						<Icon name='chevron right' />
					</span>
					<span className='dropdown-menu-item-text'>
						{item.name}
					</span>
				</div>
			</List.Item>
		))
	);

	return (
		<div>
			<button onClick={() => setOpen(!isOpen)} className={`hamburger-button ${isOpen ? 'open' : 'close'}`} />
			<div className={`panel ${isOpen ? 'open' : 'close'}`} ref={panelRef}>
				<List className='vertical-menu-items-list'>
					{renderMenuItems()}
				</List>
			</div>
		</div>
	)
};

export default DropdownMenu;
