# Lightning Now Workshop

##Exercise 2 – Styling a Visualforce page for Lightning Experience

###Exercise Goals

* Understand how to quickly add the Lightning look and feel to an existing Visualforce page
* Create a custom, scoped version of the Salesforce Lightning Design System (SLDS)
* Add your custom SLDS files as a static resource
* Create a custom JavaScript file to add SLDS styles to the page

###Step 1 - Create a custom version of the Salesforce Lightning Design System
1. Navigate to the [Salesforce Lightning Design System](http://getslds.com) site.
2. Choose Platforms > Visualforce in the sidebar.
3. Click on the link ["A tool to create your custom CSS is available here."](https://tools.lightningdesignsystem.com/css-customizer).
4. Provide a scoping class of **SLDS4VF** and click the Generate button.
5. Click the Download link once the file is generated.

###Step 2 - Add your custom SLDS file as a Static Resource
1. In your org, choose Setup Home from the Setup menu.
2. In the Quick Find field, enter **static** and then click on Static Resources item.
3. Click the **New** button to create a new static resource.
4. Give the resource a name of **SLDS4VF**, and upload the zip file that you downloaded. 
5. Click Save.

###Step 3 - Add a reference to the custom SLDS CSS to the Visualforce page
1. Add the following code to the Visualforce page after the opening `<apex:page>` tag:

		<link rel="stylesheet" type="text/css" href="{!URLFOR($Resource.SLDS4VF,'assets/styles/salesforce-lightning-design-system-vf.css')}" />
		
2. Add a `<div>` tag with a class of SLDS4VF to wrap the contents of the Visualforce page.

		<div class="SLDS4VF"> ... </div>
		
3. Add the following to the `<apex:page>` tag:

		standardStylesheets="false" applyHtmlTag="false" applyBodyTag="false" showHeader="false"

###Step 4 - Add a custom JavaScript as a static resource
1. Save vflex.js to your computer.
2. In Setup Home, navigate to the Static Resources section.
3. Click the **New** button to create a new static resource.
4. Give the resource a name of **vflex**.
5. Upload the vflex.js file that you saved.

###Step 5 - Add a reference to the custom JavaScript to the Visualforce page
1. Add a `<script>` tag to reference vflex.js as a static resource.
		
		<script src="{!URLFOR($Resource.vflex)}"></script>
2. Add `oncomplete="init();"` to the `<apex:actionSupport>` tag.
3. Save the page.
4. Refresh the custom Contact List page in your org.

###Step 6 - Add SLDS styling to the apex:selectList
1. Wrap the word "Filter" and the `<apex:selectList>` with:

		<div class="slds-form slds-m-left--large slds-m-bottom--small slds-size--1-of-6"> ... </div>
		
2. Wrap the word "Filter" with:

		<label class="slds-form-element__label" for="select-01"> ... </label>
		
3. Wrap the `<apex:selectList>` with:

		<div class="slds-select_container"> ... </div>
		
4. Add `styleClass="slds-select"` to the `<apex:selectList>` tag.
5. Save the page and reload the **Contact List** tab in your org.
		
