function addClass(oldClass, newClass) {
    var elements = document.getElementsByClassName(oldClass);
    for (var i = 0; i < elements.length; i++) {
        elements[i].className = elements[i].className + ' ' + newClass;
    }
}

function init() {
    addClass('mainTitle', 'slds-text-heading--small');
    addClass('pbHeader', 'slds-card__header');
    addClass('pbBody', 'slds-card__body');
    addClass('pbFooter', 'slds-card__footer');
    addClass('pbBottomButtons', 'slds-m-around--medium');
    addClass('contactBlock', 'slds-card');
    addClass('btn', 'slds-button slds-button--neutral');
    addClass('list', 'slds-table slds-table--bordered slds-table--cell-buffer');
}

init();
