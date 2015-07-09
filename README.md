# PS-Automator
PeopleSoft Automation Tool for Quick Navigation and Automated Data Input

This Chrome Extension is designed to add functionality to Chrome when working in PeopleSoft. The page action icon will only be displayed when the subdomain of the active page is one of the four designated prefixes. Clicking on the page action icon will open a small window with navigation buttons (squares) and data entry buttons (rectangles).

## Special Features
- A left click on a navigation button (square buttons) will navigate to the specified page in the current browser tab. A right-click will maintain the content of the current page by opening and new tab and navigating to the specified page after the new tab has loaded.

- Typed EmpID : When the page action window is open simply type in a six digit EmpID number to use in the navigation. Once six digits are keyed in the characters will change from red text to black text. Once a navigation button is clicked on the 6 digit number will also be copied to your clipboard for further navigation/use.


### Additional Navigation
Some navigation pages have an additional step of processing. This additional processing automatically takes the next logical step for the user. The pages that have additional processing are defined below.

- Navigating to the time sheet with the extension will search for the EmpID specified, click search, and then it will set the date parameter on the search page to the last day of the most recent pay period and click on the employee name. This sets the default time sheet view to the most recently completed pay period which is often the desired date range. The date used comes from the ppDate() function.

- The TU nav button opens the Time Union query for the EmpID specified and uses the most recent pay period end date. The first step is to navigate to the query manager page, then click on the HTML link in the row with the "A_TIME_UNION" query name.
