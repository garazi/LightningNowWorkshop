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

###Step 2 - Create the QuickProspect component
1. In the Dev Console, create a new Lightning Component.
2. Give the component the name **QuickProspect**.
3. Check Lightning Record Page.
4. Replace the contents of your component with [QuickProspect_start](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-1/Snippets/QuickProspect_start.cmp).
5. Add another <lightning:input> element for last name with a minimum length of 2, `minlength=2`.
6. Add two more inputs for the email and phone:

		<lightning:input aura:id="email" name="email" label="Email" type="email" messageWhenTypeMismatch="Your entry must be a valid email address." />
		<lightning:input aura:id="phone" type="tel" label="Phone" name="phone" placeholder="XXX-XXX-XXXX" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />

7. Add a submit button:

		<lightning:button class="slds-m-top--small" variant="brand" aura:id="submitBtn" label="Submit" onclick="{!c.handleSaveProspect}" />


###Step 3 - Add a Component Controller
1. Click the Controller button in the Dev Console.
2. 