import React, { useState, useEffect, useRef } from 'react';
import { Icon, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './DropdownMenu.scss';

const DropdownMenu = ({menuItems, scrollToContent}) => {
	const [isOpen, setOpen] = useState(false);
	const panelRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (panelRef.current && !panelRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [panelRef]);
	
	useEffect(() => {
		const handleScroll = () => {
			if (isOpen) {
				setOpen(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isOpen]);

	const toggleMenu = () => {
		setOpen(prevState => !prevState);
	};

	const renderMenuItems = (menuItems) => {
		return menuItems.map((item, i) => (
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
		));
	};

	return (
		<div ref={panelRef}>
			<button onClick={toggleMenu} className={`hamburger-button ${isOpen ? 'open' : 'close'}`} />
			<div className={`panel ${isOpen ? 'open' : 'close'}`}>
				<List className='vertical-menu-items-list'>
					{renderMenuItems(menuItems)}
				</List>
			</div>
		</div>
	);
};

DropdownMenu.propTypes = {
	menuItems: PropTypes.array.isRequired,
	scrollToContent: PropTypes.func.isRequired
};

export default DropdownMenu;
