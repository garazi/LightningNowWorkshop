({
    updateGreeting: function(component, event, helper) {
        var newGreeting = component.find("userInput").get("v.value");
        component.set("v.greeting", newGreeting);
    }
})
