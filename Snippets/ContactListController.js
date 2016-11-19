({
	doInit : function(component, event, helper) {
		var recID = component.get("v.recordId");
        var action = component.get("c.getAccountContacts");
        action.setParams({
            recordId: recID
        });
        action.setCallback(this, function(response){
            var data = response.getReturnValue();
            component.set("v.contactList", data);
        });
        $A.enqueueAction(action);
	}
})