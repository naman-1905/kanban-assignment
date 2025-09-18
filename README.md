# Kanban-Assignment Submission by Naman Chaturvedi
**Joyz AI Frontend Developer Role**

---

**Question 1**
**Refactor Into 3 Separate JavaScript Modules**


**Ans** I have divided the combined <script> tag from the base HTML to-do.html into 4 main javascript files in the root folder.
- storage.js:- This file contains the logic for data storage, i.e. the tasks are stored in localStorage with unique IDs. For this I used the Universally Unique Identifier (UUID for short) which generates a unique string for the task, which helps storing it under the JSON data in the tasks key in local Storage. For the fallback I used, the current Date, which in combination with UUID, provides the data for the column. Kindly check the screenshots below for reference:-

![Tasks Storage locally](/images/Screenshot3.png)
![Tasks Storage locally](/images/Screenshot2.png)

- render.js :- This is the DOM handling component which creates the elements, sorts tasks by priority and reorders without re-rendering the entire page. To avoid re-renders, renderNow function compares the desired structure of sorted tasks with the current DOM and DOM changes are made. The file ensures that only the missing tasks are created, for existing they are updated or kept same, and outdated tasks are removed. This keeps the page responsive and avoids re-renders on drag and drop or create/delete.

- dragdrop.js :- This script controls the drag and drop interactions between the three columns and updates the task status in the localStorage tasks key.
- main.js :- This is the main script connected to the to-do HTML file. This combines the other three and wires everything together, loads storage with the tasks, sets up event listeners and handles the form submission that goes to the To-Do Section.

---

**Question 2**
**Bug Fixing**

**Ans** 
- Bug 1 had the issue where the task lost the ID when it was dragged from one section to another.
For this, I fixed this by making every task element store its dataset Id in render.js. Now the ID is always preserved whenever the task is moved from one section to another.

- Bug 2 had the issue that wrong task was deleted because the IDs werent unique. As I mentioned above, I used the UUID for generating a unique string for every task which is stored with the task and the Date created as a fallback. So, when a task is deleted, the unique ID is deleted and no duplicate ID is present, this helps in deleting the correct one only.

---

**Question 3**
**Task Priority Feature and New Features**

**Ans** The HTML form did not have a priority select when it was provided. I added the select tag for priority in the form, with the options to select from the Low, Medium or High.
This helps in identifying the priority. For new features, I have a few ideas:-

- The reordering of the tasks in the same column is missing, can be added.</n>
- A due date for every task can be added.
- Google OAuth or Database with a proper backend to allow users to login and manage the tasks individually.
For organizations, the asignees and the assigned can be segregated with a DB like PostgreSQL or MongoDB (MongoDB since the Data is a JSON), similar to what Trello or JIRA do, if this is for production and will be used by the company's internal management.

![Priority Select](/images/Screenshot1.png)

