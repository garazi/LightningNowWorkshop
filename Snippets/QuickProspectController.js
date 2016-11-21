({
    handleSaveProspect: function(component, event, helper) {
        var fname = component.find("firstname").get("v.value");
        var lname = component.find("lastname").get("v.value");
        var email = component.find("email").get("v.value");
        var phone = component.find("phone").get("v.value");
        var property_id = component.get("v.recordId");

        var action = component.get("c.getProspect");

        action.setParams({
            "firstname": fname,
            "lastname": lname,
            "phone": phone,
            "email": email,
            "propertyID": property_id
        });

        action.setCallback(this, function(response) {
            var res = response.getReturnValue();
            var resultsToast = $A.get("e.force:showToast");
            if (res) {
                resultsToast.setParams({
                    "title": "Prospect Saved",
                    "message": "The new prospect was created."
                });
            } else {
                resultsToast.setParams({
                    "title": "Duplicate Entry",
                    "message": "The prospect is already interested in this property."
                });
            }
            resultsToast.fire();
            $A.get("e.force:refreshView").fire();
            var dismissActionPanel = $A.get("e.force:closeQuickAction");
            dismissActionPanel.fire();
        });
        $A.enqueueAction(action);
    }
})