# Lightning Now Workshop

##Exercise 5 – Creating a "Hello World" Lightning Component

###Exercise Goals

* Build a simple Hello World component
* Explore basic concepts of Lightning Component markup
* Understand how to use attributes for data binding

###Step 1 - Hello World

1. In the Developer Console, choose **New > Lightning Component**.
2. Give the component a name of **HelloWorld**.
3. Check the option **Lightning Record Page**.
4. Add "Hello World" to the component.
5. Save the file.

###Step 2 - Add the component to a page
1. Navigate to the **United Oil & Gas Corp** page.
2. Choose **Edit Page** from the Setup menu.
3. Locate your HelloWorld component in the Component List.
4. Drag it onto the page and place it at the top of the right-hand column, above the Activity and Chatter tabs.
5. Click the Save button.
6. Click the Back button in the upper righthand corner of App Builder to return to the account page.

###Step 3 - Understanding Lightning Component basics
1. Replace the "Hello World" text with:

		<aura:attribute name="greeting" type="String" default="World" />
    	Hello, {!v.greeting}!
    	
2. Save and reload the account page.
3. Add the following on a new line:

		<ui:inputText aura:id="userInput" change="{!c.updateGreeting}"></ui:inputText>
		
4. Click the Controller button on the right-hand side of the Dev Console.
5. Replace the Controller's contents with:

		({
			updateGreeting : function(component, event, helper) {
				var newGreeting = component.find("userInput").get("v.value");
				component.set("v.greeting", newGreeting);
			}
		})

6. Save the Controller file and the Component.
7. Refresh the account page.
8. Type your name in the input and press Tab or Return.