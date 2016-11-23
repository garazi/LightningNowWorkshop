({
    doInit: function(component, event, helper) {
        var main = component.find('main');
        var recID = component.get("v.recordId");
        if (recID) {
            $A.util.removeClass(main, 'small');
            $A.util.addClass(main, component.get("v.designHeight"));
            helper.getLocalList(component, recID);
        } else {
            $A.util.removeClass(main, 'small');
            $A.util.removeClass(main, component.get("v.designHeight"));
            $A.util.addClass(main, 'autoHeight');
            var scrollableArea = component.find('scrollableArea');
            $A.util.removeClass(scrollableArea, 'scroll-container');
            $A.util.removeClass(scrollableArea, 'slds-scrollable--y');
            var spinner = component.find('spinner');
            $A.util.removeClass(spinner, "slds-hide");
            navigator.geolocation.getCurrentPosition(function(e) {
                component.set("v.location", e);
            }, function() {
                component.set("v.errorMessage", "Could not get your current geolocation.");
                var warning = component.find('warning');
                $A.util.removeClass(warning, 'slds-hide');
            });
        }
    },
    updateSearch: function(component, event, helper) {
        var recID = component.get("v.recordId");
        helper.getLocalList(component, recID);
    },
    showDetails: function(component, event) {
        var closeItem = component.get('v.openItem');
        if (closeItem) {
            closeItem = closeItem.querySelector('[data-details]');
            $A.util.addClass(closeItem, 'slds-hide');
        }
        var selectedItem = event.currentTarget;
        component.set('v.openItem', selectedItem);
        var itemDetails = selectedItem.querySelector('[data-details]');
        $A.util.removeClass(itemDetails, 'slds-hide');
    }
})