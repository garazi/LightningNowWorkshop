# Lightning Now Workshop

##Exercise 8 – Building a Business Locator Component

###Exercise Goals

* Understand how to use Helpers
* Create component parameters for App Builder

###Step 1 - Build the component structure
1. In the Developer Console, select **File > New > Lightning Component**.
2. Name the bundle **BusinessLocator**.
3. Select the **Lightning Tab**, **Lightning Page**, and **Lightning Record Page** options.
4. Change the code in **BusinessLocator.cmp** to the contents of [this sample file](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocator.cmp).

###Step 2 - Create the component Controller and Helper
1. Click **Controller** on the right side of the Developer Console.
2. Replace the contents of the controller with the following:

	```js
	({
		doInit : function(component, event, helper) {
			var recID = component.get("v.recordId");
			helper.getLocalList(component);
		},
		updateSearch: function(component, event, helper) {
   			var recID = component.get("v.recordId");
       	helper.getLocalList(component, recID);
    	}
    })
	```

3. Click **Helper** on the right side of the Developer Console.
4. Replace the code with:

	```js
	({
    getLocalList: function(component, recID) {
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
	
###Step 3 - Create the Apex Class
1. In the Developer Console, select **File > New > Apex Class**.
2. Name the Apex class **BusinessLocatorApexController**.
3. Replace the contents with the contents from [the sample file](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocatorApexController.cls).
4. In the BusinessLocator.cmp file, add a reference to the Apex Controller `controller="BusinessLocatorApexController"` in the `<aura:component>` tag. 
5. Click the **Setup Home** icon in your Salesforce org, and enter **remote** in the Quick Find field.
6. Click **Remote Site Settings**, and then click **New Remote Site**.
7. Name the remote site **BusinessLocator**, and add the URL for the remote HTTP call `https://grewis-yelp.herokuapp.com/` from the Apex class. Add the URL including the **.com**, but you don't need to add the rest of the URL.
8. Save all the files.
9. In your org, navigate to a Property Record page.
10. Click the **Setup** icon and select **Edit Page**.
11. Drag the **BusinessLocator** component from the Lightning Components list and place it on the page at the top of the right column.
12. Click **Save**.
13. Click the **Back** link in the upper-right corner to navigate back to the Property Record page.
14. Refresh the Property Record page you used earlier.

###Step 4 - Add additional styling and show details
1. In the Developer Console, switch back to the BusinessLocator component and click the Style button on the right side of the window.
2. Replace the contents with the contents of the [finished CSS file](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocator.css).
3. Update **BusinessLocatorController.js** with the following function (remember to add a comma after the **doLayout** function):

	```js
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
	```
4. Save the file.
5. Refresh the Property Record page.
6. Click on a business listing to see details about the business.

###Step 5 - Add design parameters and a custom icon
1. In the Developer Console, click the Design button for the BusinessLocator component on the right side of the window.
2. Replace the code with the following:

	```xml
	<design:component label="Business Locator">
    <sfdc:objects>
        <sfdc:object>Property__c</sfdc:object>
        <sfdc:object>Account</sfdc:object>
        <sfdc:object>Contact</sfdc:object>
    </sfdc:objects>
	<design:attribute name="defaultSearch" label="Default Search" default="Restaurants" description="What would you like to search for?" />
	<design:attribute name="designHeight" label="Height" datasource="small,medium,large" default="small" description="How tall should the component?" />
	</design:component>

	```
3. Save the file.
4. Click the **SVG** button on the right side of the Dev Console window.
5. Replace the contents of the file with the contents of [the finished file](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocator.svg).
6. Save the file.
7. Update the **BusinessLocator.js** file by adding the following before `var recID ... `:

	```js
	var main = component.find('main');
	$A.util.removeClass(main, 'small');
	$A.util.addClass(main, component.get("v.designHeight"));
	```
8. Save the file.


###Step 6 - Update the default search and component size
1. From the Property Record page, click the Setup menu and choose Edit Page.
2. Don't worry if you receive an error, this is simply because the parameters for the design file are blank.
3. Click the Business Locator component on the page to select it.
4. Add a default search term such as **Schools** in the design parameters on the right side of App Builder.
5. Pick a default size from the select list.
6. Click Save and then Back to see your updates.

###Step 7 - Make the component available for Salesforce 1
1. In your org, click the **Setup** icon and select **Setup Home**.
2. In the **Quick Find** box, enter "**builder**" and select **Lightning App Builder**.
3. Click **New** to create a Lightning Page.
4. In the dialog, select **App Page**, and click **Next**.
5. Select **One Column** for the layout, and click **Next**.
6. Label the app page **Biz Locator**, and click **Finish**.
7. Drag the **BusinessLocator** component onto the page.
8. Update **BusinessLocatorController.js** by replacing its contents with the contents of [BusinessLocatorController](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocatorController.js).
9. Update **BusinessLocatorHelper.js** by replacing its contents with the contents of [BusinessLocatorHelper](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-8/Snippets/BusinessLocatorHelper.js).

###Step 8 - Activate the App for Salesforce1

1. In Lightning App Builder, click **Save**.
2. If you are asked to activate the app, click **Activate**. Otherwise, click the **Activation** button.
3. Click **Change** next to the icon to change it to the globe icon or an icon of your choosing.
4. Leave page activation set to **Activate for all users**.
5. Click the **Salesforce1** tab at the top of the dialog.
6. Click **Add page to Menu**.
7. Drag the **Biz Locator** button into the location of your choice.
8. Click **Save**.
9. Click **Back** at the top of the Lightning App Builder.
10. Log in to the Salesforce1 app on your mobile phone using the credentials that you used to log in to this org.
11. Tap the **Menu** icon in the upper left corner.
12. Tap **Biz Locator**, and allow the browser to use your location.



