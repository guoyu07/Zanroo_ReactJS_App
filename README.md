# Zanroo_ReactJS_App
A React JS single page application which can dynamically add, remove and update a table row as per user request.

# Prerequisite:
-node version 6.3.1 or higher must be installed on the system
-npm version 3.10.3 or higher must be installed 

# Instructions to run the application in linux system:
- Store the files in a directory named App(as per your wish).
- In the command prompt change the current directory to App 
- Run the command "npm install webpack-dev-server --save-dev" to install webpack-dev-server package as it is required
- Then run the command "npm run start"

The node server will start and allocate the port 9090 and the application can be accessed using a browser by entering the
url: http://localhost:9090/

# Applications and Working:
- User can use the application to insert a record or row into the existing table
  - The user has to provide input to the form available and the inputs to the provided are name, age and nick name
  - Once inputs are provided by the user the given data is validated
               - Name field cannot store special characters or numbers
               - Age field can store only numeric data between 0 - 200 only
               - Nick Name field can only store 4 special characters[ ! @ # $ ] and alphanumerics.
               - The Name field can store minimum of 2 and maximium of 40 characters
               - And the Nick Name field can Store a minimum of 2 and maximum of 20 characters
    
  - These are the constraints on the input field and the data inputed is validated for it.
  - User can also remove a specific record from the table using remove key
  - The data in the records can also be updated and while updating the data the new inputed data is again validated.
  
# The Design Layout of the Application:
- EmployeeApp: The app has a top-level component named as EmployeeApp. This component is composed of following components:
               
          - EmployeeList: EmployeeList component represents a list of employees and has code to render the same.

          - Employee    : Employee component represents a single employee and has an onClick event for removing and editing                             the employee details.

          - NewRow      : NewRow component is used to capture the data (employee information). It has an onSubmit form event                           to capture row submit.

           
