let domUtils = {

	emptyElement: function(parentEl) {
        while (parentEl.firstChild) {
            parentEl.removeChild(parentEl.firstChild);
        }
    },

	isDescendentByClass: function(parentClass, el) {
        if (el.classList.contains(parentClass)) {
            return el;
        }
        let node = el.parentNode;
        while (node != null) {
            if ((typeof node.classList !== 'undefined') && (node.classList.contains(parentClass))) {
                return node;
            }
            node = node.parentNode;
        }
        return false;
    }

};

export default domUtils;