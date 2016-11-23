({
	stepUiChanged : function(component, event, helper) {
        var newStep = event.currentTarget.dataset.step;
        var uiStep = component.get("v.currentStep");
        if (newStep === uiStep) {
            return;
        }
        var steps = component.get("v.steps");
        component.set("v.currentStep", newStep);
        component.set("v.stepIndex", steps.indexOf(newStep));
        component.get("v.property").Status__c = component.get("v.currentStep");
        component.find("propertyService").saveRecord();
    },
    propertyChanged : function(component, event) {
        var newStep = component.get("v.property").Status__c;
        var steps = component.get("v.steps");
        component.set("v.currentStep", newStep);
        component.set("v.stepIndex", steps.indexOf(newStep));
        var changeType = event.getParams().changeType;
        if (changeType === "CHANGED") { 
            var service = component.find("propertyService");
            service.reloadRecord();
        }
    }
})