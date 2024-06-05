export const handleMenuItemHover = (index, type, removeAll) => {
    const selector = type === 'top-nav-link-static' ? '.top-nav-link-static' : '.top-nav-link-fixed';
    const items = document.querySelectorAll(selector);
    if (removeAll) {
        items.forEach(item => {
            item.classList.remove('dimmed');
        });
    } else {
        items.forEach((item, i) => {
            if (i !== index) {
                item.classList.add('dimmed');
            }
        });
    }
};
  