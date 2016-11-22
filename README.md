# Lightning Now Workshop

##Exercise 8 – Building a Business Locator Component

###Exercise Goals

* Understand how to use Helpers
* Create component parameters for App Builder

###Step 1 - Build the intial component structure
1. In the Developer Console, select **File > New > Lightning Component**.
2. Name the bundle **BusinessLocator**.
3. Select the **Lightning Tab**, **Lightning Page**, and **Lightning Record Page** options.
4. Change the code in **BusinessLocator.cmp** to the contents of [this sample file](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocator.cmp).
5. Save the file.

###Step 2 - Add the Component to a Page
1. In your org, navigate to a Property Record page.
2. Click the **Setup** icon and select **Edit Page**.
3. Drag the **BusinessLocator** component from the Lightning Components list and place it on the page at the top of the right column.
5. Click **Save**.
6. Click the **Back** link in the upper-right corner to navigate back to the Property Record page.

###Step 3 - Create the component Controller and Helper
1. Click **Controller** on the right side of the Developer Console.
2. Change the default function name myAction to **doInit**, and add the following.

	```js
	doInit : function(component, event, helper) {
		helper.getLocalList(component);
	}
	```

3. Click **Helper** on the right side of the Developer Console.
4. Replace the code with:

	```js
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
	```
	
###Step 4 - Create the Apex Class
1. In the Developer Console, select **File > New > Apex Class**.
2. Name the Apex class **BusinessLocatorApexController**.
3. Replace the contents with the contents from [the sample file](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocatorApexController.cls).
4. In the BusinessLocator.cmp file, add a reference to the Apex Controller `controller="BusinessLocatorApexController"` in the `<aura:component>` tag. 
5. Click the **Setup Home** icon in your Salesforce org, and enter **remote** in the Quick Find field.
6. Click **Remote Site Settings**, and then click **New Remote Site**.
7. Name the remote site BusinessLocator, and add the URL from the Apex class. Add the URL including the **.com**, but you don't need to add the rest of the URL.






