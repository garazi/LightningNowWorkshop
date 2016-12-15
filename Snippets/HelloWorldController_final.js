({
    doInit : function(component, event, helper) {
        var action = component.get("c.getCurrentUser");
        action.setParams({
            
        });
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            console.log("foo: ", data);
            component.set("v.greeting", data.FirstName);
        })
        $A.enqueueAction(action);
    },
	updateGreeting : function(component, event, helper) {
		var newGreeting = component.find("userInput").get("v.value");
        component.set("v.greeting", newGreeting);
        
	}
})