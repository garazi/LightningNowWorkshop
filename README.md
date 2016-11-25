# Lightning Now Workshop

##Exercise 9 – Building a Sales Process Component

###Exercise Goals

* Build a service component
* Explore simplified CRUD transactions with force:recordPreview

###Step 1 - Create a service component
1. Create a new Lightning Component with the name **PickList**. Leave all of the checkboxes unchecked.
2. Replace the component code with:

	```html
	<aura:component controller="GetPickListValuesController">
	<aura:attribute name="sobject" type="String" />
	<aura:attribute name="picklistfield" type="String" />
	<aura:attribute name="values" type="String[]" />

	<aura:handler name="init" value="{!this}" action="{!c.init}" />
	
	</aura:component>
	```
	
3. Click the Controller button, then replace the code with:

	```js
	({
	init: function(component, event, helper) {
		var action = component.get("c.getPicklistValues");
		action.setParams({
			"objectName" : component.get("v.sobject"),
			"fieldName" : component.get("v.picklistfield")
		});
		action.setCallback(this, function(a) {
            component.set("v.values", a.getReturnValue());
    	});
    	$A.enqueueAction(action);
	}
	})
	```
	

4. Create a new Apex Class with the name **GetPickListValuesController** with the following:

	```java
	global with sharing class GetPickListValuesController {

    @AuraEnabled
    public static List<String> getPicklistValues(String objectName, string fieldName) {
		List<String> values = new List<String>();
        Schema.DescribeSObjectResult[] descResults = Schema.describeSObjects(new String[]{objectName});

        if (descResults.size() == 0) {
            System.debug('Error, could not retrieve the describe results for ' + objectName);
            return null;
        } else {
            Schema.DescribeSObjectResult result = descResults[0];
            Schema.SObjectField field = result.fields.getMap().get(fieldName);
            Schema.DescribeFieldResult fieldResult = field.getDescribe();
            List<Schema.PicklistEntry> ples = fieldResult.getPicklistValues();
            for (Schema.PicklistEntry ple : ples) {
                values.add(ple.getValue());
            }
        }
        return values;
    }
	}
	```
	
5. Save all the files.

###Step 2 - Build the intial component structure

1. In the Dev Console, create a new Lightning Component (**File > New > Lightning Component).
2. Give the component a name of **SalesStatus** and check the Lightning Record Page checkbox.
3. Go to the SLDS site and navigate to the [Process component](https://www.lightningdesignsystem.com/components/process/).
4. Copy the markup for the **Sales Path Coach** component and paste it into the **SalesStatus** component.
5. Remove 4 of the `<li>` elements, leaving a single `<li>`.
6. Remove the `<svg>` element from the `<li>` and replace it with:

	```html
	<lightning:icon iconName="action:approval" size="large" alternativeText="Indicates approval"/>
	```
	
7. Remove the `<svg>` from the `<button>` and replace it with:

	```html
	<lightning:button variant="brand" label="Mark Status Complete" class="slds-path__mark-complete slds-no-flex slds-m-horizontal--small" onclick="{! c.handleClick }" />  
	```
	
8. Add the following before the initial `<div>` in the component:

	```html
	    <aura:attribute name="recordId" type="Id" />
    <aura:attribute name="fields" type="String[]" default="['Id', 'Status__c']"/>
    <aura:attribute name="property" type="Property__c" /> 
    <aura:attribute name="steps" type="Object[]" />
    <aura:attribute name="stepIndex" type="Integer" />
    <aura:attribute name="currentStep" type="String" />
    
    <c:Picklist sobject="Property__c" picklistfield="Status__c" values="{!v.steps}" />
    
    <force:recordPreview aura:id="propertyService"
                         recordId="{!v.recordId}"
                         targetRecord="{!v.property}"
                         fields="{!v.fields}"
                         recordUpdated="{!c.propertyChanged}"
                         mode="EDIT"/>
	```
	
9. Wrap the `<li>` with:

	```html
	<aura:iteration items="{!v.steps}" var="item" indexVar="i"> ... </aura:iteration>
	```

10. Replace the opening `<li>` tag with:

	```html
	<li class="{! 'slds-tabs--path__item ' + (i&lt;v.stepIndex ? 'slds-is-complete' : (i==v.stepIndex ? 'slds-is-current' : 'slds-is-incomplete'))}" id="{!item}" aura:id="{!item}" data-step="{!item}" role="presentation" onclick="{!c.stepUiChanged}">
	```
	
11. Change the text in the `<span class="slds-tabs--path__title">` to **{!item}**.
12. Save the file.
13. Switch back to a Property Record page and click **Setup > Edit Page**.
14. Select the PropertyStatus component that is already on the page and remove it.
15. Locate the **SalesStatus** component and drag it onto the page above the Related and Details tabs.
16. Click Save and then Back.

###Step 3 - Add the component controller
1. Switch back to the **SalesStatus** component in the Dev Console and click the Controller button.
2. Replace the code with the following:

	```js
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
	```
	
3. Save the file.
4. Reload the Property Record page to see the SalesStatus component update to reflect the current status.
5. Click a status in the SalesStatus and notice the status in the Details section change.
6. Change the status in the Details section, then Save. Notice the SalesStatus component updates.