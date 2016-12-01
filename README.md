# Lightning Now Workshop

##Exercise 7 – Building a Quick Prospect Component

###Exercise Goals

* Use Base Lightning Components to build a Lightning Component
* Understanding updating data and handling conflicts

###Step 1 - Import the Metadata Structure

1. Click the App Launcher and choose the Dreamhouse app.
2. In another browser tab, [navigate to this page](https://github.com/garazi/prospectObject).
3. Import two custom objects by clicking the **Deploy to Salesforce** button.
4. After the deployment completes, confirm that the Prospect custom object is there by navigating to **Setup Home > Objects and Fields > Object Manager**.
5. In the Quick Find, enter **field** and click on **Security > Field Accessibility**.
6. Click on **Prospect** in the list.
7. Click **View by Fields** and select **First Name** from the pop-up menu.
8. Click the **Hidden** link for System Administrator.
9. Click the **Visible** checkbox in the Field-Level Security section.
10. Repeat steps 7-9 for **Last Name**, **Email** and **Phone**.

###Step 2 - Create the QuickProspect component
1. In the Dev Console, create a new Lightning Component.
2. Give the component the name **QuickProspect**.
3. Check Lightning Record Page.
4. Replace the contents of your component with [QuickProspect_start](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-1/Snippets/QuickProspect_start.cmp).
5. Add another `<lightning:input>` element for last name with a minimum length of 2, `minlength=2`.
6. Add two more inputs for the email and phone:

```html
<lightning:input aura:id="email" name="email" label="Email" type="email" messageWhenTypeMismatch="Your entry must be a valid email address." />
<lightning:input aura:id="phone" type="tel" label="Phone" name="phone" placeholder="XXX-XXX-XXXX" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
```

7. Add a submit button:

```html
<lightning:button class="slds-m-top--small" variant="brand" aura:id="submitBtn" label="Submit" onclick="{!c.handleSaveProspect}" />
```

8. In the Dreamhouse app, click the Properties tab, then click any property.
9. Choose Edit Page from the Setup menu.
10. Locate the QuickProspect component, and drag it onto the page, placing it at the top of the right-hand column.
11. Click the Save button, and then click the Back button to return to the Property listing.

###Step 3 - Add a Component Controller
1. Click the Controller button in the Dev Console.
2. Replace the contents of the controller with the contents of [QuickProspectController](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-1/Snippets/QuickProspectController.js).
3. Save the file.

###Step 4 - Create the Apex Controller
1. In the Dev Console, create a new Apex Class, **File > New > Apex Class**.
2. Give it a name of **QuickProspectApexController**.
3. Replace the contents with the contents of [QuickProspectApexController](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-1/Snippets/QuickProspectApexController.cls).
4. Save the file.
5. Add a reference to the Apex controller in the `<aura:component>` tag in QuickProspect.cmp. `controller="QuickProspectApexController"`
6. Save the file.

###Step 5 - Limit the pages the component can be used on
1. In the Dev Console, switch back to your QuickProspect component.
2. Click the Design button on the right-hand side of the console.
3. Replace the contents of the file with:

```xml
<design:component>
<sfdc:objects>
        <sfdc:object>Property__c</sfdc:object>
    </sfdc:objects>
</design:component>
```

4. Save the file.

###Step 6 - Add Prospects as a related list
1. Click the Setup menu and select Setup Home.
2. Choose the Objects and Fields > Object Manager, and select the Property object.
3. Click the Property Layout in the Page Layouts section.
4. Select **Related Lists** in the left-hand column of the Object Manager box.
5. Drag **Prospect** into the Related Lists section and place it at the top.
6. Click the wrench icon to open the Related List Properties for Prospects.
7. Remove the ProspectAssociation from the Selected Fields list.
8. Add Prospect:Prospect Name, Prospect:Email and Prospect:Phone to the Selected Fields list.
9. Click OK.
10. Click **Save** at the top of the Object Manager box and click **Yes** in the resulting dialog.
11. Navigate back to the Property Record page you were using earlier.
12. Test the component by filling out the form and submitting it.
13. Click the **Related** tab to see the new Prospect.

###Step 7 - Make the component a Quick Action
1. Add `force:lightningQuickActionWithoutHeader` to the implements attribute of the QuickProspect component.
2. Save the file.
3. Navigate back to the Object Manager and choose the Property object.
4. Scroll down to the Buttons, Links and Actions section.
5. Click the New Action button.
6. Select Lightning Component as the Actions Type.
7. Select c:QuickProspect as the Lightning Component and set the height to 400px.
8. Type **Quick Prospect** in the Label field and Quick_Prospect as the name.
9. Click Save.
10. Navigate back to Property object page and click the **Property Layout** in the Page Layouts section.
11. Click the **override the predefined actions** link in the Salesforce1 and Lightning Experience Actions section.
12. Click the **Salesforce1 & Lightning Actions** link in the Property Layout box.
13. Drag the **Quick Prospect** tile to the Salesforce1 and Lightning Experience Actions section and place it as the first item.
14. Click the Save button in the Property Layout box.
15. Navigate back to a Property Record page.
16. Click the Quick Prospect Quick Action button to add a new prospect.
17. Click the Setup menu and choose **Edit Page**.
18. Select the Quick Prospect component on the page and delete it.
19. Click the Save button and then the Back button to return to the Property Record page.


