({
    getLocalList: function(component, recID) {
        var spinner = component.find('spinner');
        $A.util.removeClass(spinner, "slds-hide");
        var objectType = component.get("v.sObjectName");
        var searchTerm = component.find("searchTerm").get("v.value");
        if (!searchTerm) {
            searchTerm = component.get("v.defaultSearch");
        }
        searchTerm = encodeURI(searchTerm);
        var action;
        if (recID) {
            action = component.get("c.getListByAddress");
            action.setParams({
                "recordId": recID,
                "objectType": objectType,
                "searchQuery": searchTerm
            });
        } else {
            var location = component.get("v.location");
            action = component.get("c.getLocal");
            action.setParams({
                "searchTerm": searchTerm,
                "lat": location.coords.latitude,
                "lon": location.coords.longitude
            });
        }
        action.setCallback(this, function(response) {
            this.doLayout(response, component);
        });
        action.setStorable();
        $A.enqueueAction(action);
    },
    doLayout: function(response, component) {
        var data = JSON.parse(response.getReturnValue());
        component.set("v.restaurantList", data.bizArray);
        var spinner = component.find('spinner');
        $A.util.addClass(spinner, "slds-hide");
    }
})