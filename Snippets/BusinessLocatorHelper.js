({
    getLocalList: function(component) {
        var recID = component.get("v.recordId");
        var location = component.get("v.location");        
        var searchTerm = component.find("searchTerm").get("v.value");
        if (searchTerm == null) {
            searchTerm = component.get("v.defaultSearch");
        }
        location = JSON.parse(location);
        var action = component.get("c.getListByAddress");
            action.setParams({
                "recordId": recID,
                "searchQuery": searchTerm
            });

        action.setCallback(this, function(response) {
            this.doLayout(response, component);
        });
        $A.enqueueAction(action);
    },
    doLayout: function(response, component) {
        var data = JSON.parse(response.getReturnValue());
        component.set("v.restaurantList", data.bizArray);
        console.log("The Data: ", data);
    }
})
