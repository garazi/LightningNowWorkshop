# Lightning Now Workshop

##Exercise 3 – Modifying the Visualforce markup for Lightning Experience

###Exercise Goals

* Become familiar with the components and utility classes of the Salesforce Lightning Design System
* Understand how to use the markup from SLDS in a Visualforce page

###Step 1 - Explore the Salesforce Lightning Design System

1. Use your browser's Developer tools to examine the markup of the Visualforce page from the previous exercise.
2. Notice that the data is contained in a HTML table.
3. Navigate to the [Salesforce Lightning Design System](http://getslds.com) site.
4. Open the Components section and find the Data Tables section.
5. Copy the markup for the Basic Data Table.

###Step 2 - Update the Visualforce markup
1. Paste the markup into the Visualforce page just before the closing `</apex:pageBlock>` tag.
2. Delete the second `<tr>` block in the `<tbody>`.
3. Change the title and text of each `<th>` in the `<thead>` to match the four columns of the `<apex:column>` elements.
4. Delete the remaining 3 `<th>` elements.
5. Change the `data-label` of each `<th>` and `<td>` in the `<tbody>` to correspond with the column titles in the `<thead>`.
6. Remove the remaining 3 `<td>` elements in the `<tbody>`.
7. Change the `title` and text of each `<div>` in the `<td>` of the `<tbody>`.
8. Remove the `<a href="javascript:void(0);">` from the `<th>` and its closing `</a>` tag.
9. Wrap the `<tr>` of the `<tbody>` with:

		<apex:repeat value="{! contacts }" var="ct"> ... </apex:repeat>

10. Remove the `<apex:pageBlockTable>`.

###Step 3 - Adding more SLDS styling
1. Wrap the **contents** of the `<apex:pageBlock>` with:

		```html
		<div class="slds-card">
		```
2. Remove `title="Contact List"` from the `<apex:pageBlock>`.
3. Add the following after the opening `<div class="slds-card">` tag:

		```html
		<div class="slds-card__header">                    
                        <h2 class="slds-text-heading--small">
                            Contacts List
                        </h2> 
                </div>
		```

4. Wrap the word "Filter" and the `<apex:selectList>` with:

		<div class="slds-form slds-m-left--large slds-m-bottom--small slds-size--1-of-6"> ... </div>

5. Wrap the word "Filter" with:

		<label class="slds-form-element__label"> ... </label>

6. Wrap the `<apex:selectList>` with:

		<div class="slds-select_container"> ... </div>

7. Add `styleClass="slds-select"` to the `<apex:selectList>` tag.
8. Remove the `<script>` tag from the bottom of the page.
9. Save the page and reload the **Contact List** tab in your org.
