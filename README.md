# Lightning Now Workshop

##Exercise 4 – Using a Visualforce page in a Lightning Experience page

###Exercise Goals

* Modifying a Lightning Experience Record Home Page with App Builder
* Adding a Visualforce page to an existing Lightning Record Home page

###Step 1 - Create a custom Visualforce page
1. Open [**AccountContactList**](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-4/Snippets/AccountContactList.vfp) and copy its contents.
2. In the Dev Console, click **File > New > Visualforce Page**.
3. Name the page **AccountContactList**.
4. Replace the contents of the page with the contents that you copied.
5. Save the page.

###Step 2 - Add a custom Visualforce page to a Standard Page Layout

1. Click the Setup menu and choose **Setup Home**.
2. In the left column, choose **Objects and Fields > Object Manager**.
3. Click Account.
4. Scroll down to the **Page Layouts** section and click **Account Layout**.
5. In the **Account Layout** box at the top of the page, click **Related Lists** in the navigation panel.
5. Remove **Contacts** by clicking on the delete icon.
6. Click the **Quick Save** button.
7. Scroll back up to the **Account Details** section.
8. In the **Account Layout** box, click **Visualforce Pages**.
9. Drag a new Section into the **Account Details** section and place it under the **Address Information** section.
10. Give the new section a name of **Account Contacts**, and choose a single column layout.
11. Click OK.
12. Drag the **AccountContactList** tile from the **Account Layout** box and place it in the new section.
13. Click Save.
14. In the Sales app, click the Accounts tab.
15. Filter the list to show **All Accounts**.
16. Click on **United Oil & Gas Corp**.
17. Notice that the default Contacts Related List is not present.
18. Click the **Details** tab and scroll down to see your new Account Contacts section.

###Step 3 - Make a Visualforce page available as a component for Lightning pages
1. Click the Setup menu and choose **Setup Home**.
2. In the Quick Find, type "visualforce".
3. Click **Visualforce Pages**.
4. Click the **Edit** action for your **AccountContactList** page.
5. Check the box for **Available for Salesforce mobile apps and Lightning Pages**.
6. Click Save.

###Step 4 - Customize a Record Home page
1. Navigate back to the **United Oil & Gas Corp** page.
2. Click the Setup menu and choose **Edit page**.
2. Locate the **Visualforce** Lightning Component in the list of Standard Components in the Component List.
3. Drag the component onto the page and place it at the top of the right-hand column.
4. **AccountContactList** should automatically be selected in the Visualforce pick list on the right-hand side of App Builder.
5. In the Label field, type "Contacts" and press Tab.
6. Modify the Height field to be **200** and press Return.
7. Click the Save button.
8. Click the Activate button.
9. Leave the option set to **Assign this page as the default record page** and click Next.
10. Click Save.
11. Click the Back button in the upper righthand corner of App Builder to return to the account page.
12. (Optional) Follow the instructions from Step 2 to go back and remove the **Account Contacts** section that you created.
