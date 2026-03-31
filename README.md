# Health Insurance Risk Calculator – Node.js & Azure API

**Name:** Fernando Montiel  
**Project Name:** Health Insurance Risk Calculator  
**Team Members:** Nana, Teju, Leland  
**License:** MIT  

---

## Project Description

This project is a full-stack web application that calculates a user's health insurance risk
based on medical and personal factors. The application uses a client-server architecture
where a frontend interface collects user input and a Node.js API server performs all
calculations.

The system evaluates risk using:
- Age  
- BMI (Body Mass Index)  
- Blood Pressure  
- Family Disease History  

The application is deployed using Microsoft Azure, with the frontend hosted as a static web
app and the backend API hosted using Azure App Service.

---

## Technologies Used

- HTML5  
- CSS3  
- JavaScript  
- Node.js  
- Express.js  
- Git & GitHub  
- Microsoft Azure Static Web Apps  
- Microsoft Azure App Service  

---

## File Structure

- server.js  
- package.json  
- package-lock.json  
- public/ (frontend files)  
- README.md  
- LICENSE  

Only source files required to execute the application, along with README.md and LICENSE,
are included.

---

## How to Run the Application

### Local Execution

1. Clone the repository  
2. Navigate to the project folder  
3. Install dependencies:  
   npm install  
4. Start the server:  
   node server.js  
5. Open a browser and go to:  
   http://localhost:3000  

---

### Live Deployment

The application is deployed using Microsoft Azure:
- Frontend hosted on Azure Static Web Apps  
- Backend API hosted on Azure App Service  

The application is accessible via HTTPS.

---

## API Endpoints

1. Ping (Wake-Up)  
   GET /api/ping  
   Confirms the server is running  

2. BMI  
   POST /api/bmi  
   Calculates BMI and returns category:  
   - Normal  
   - Overweight  
   - Obese  

3. Blood Pressure Category  
   POST /api/bp-category  
   Returns:  
   - Normal  
   - Elevated  
   - Stage 1  
   - Stage 2  
   - Crisis  

4. Risk Category  
   POST /api/risk-category  
   Returns:  
   - Total risk score  
   - Risk level (Low, Medium, High)  

---

## Coding Standards & Compliance

This project adheres to all required coding standards:

- All code executes without errors or warnings  
- All files are UTF-8 compatible text files  
- Tabs are used for indentation (not spaces)  
- Line endings use LF (\n) only  
- Lines are consistently wrapped under 120 characters  
- File names are meaningful and consistently named  
- Source code is commented where appropriate  
- Git and GitHub were used for version control  
- Each completed user story is associated with a GitHub commit message  
- Only required files are included in the submission  

---

## AI Usage Disclosure

ChatGPT was used to guide me with:

- Debugging API issues  
- Understanding the assignment requirements  
- Researching code  
- Writing and formatting documentation  

All code was reviewed, tested, and manually implemented by me.  
I understand the code submitted and can explain how it works.

---

## Academic Integrity

This project represents my own original work.  
No plagiarism is present.  

Any non-original guidance, including AI-assisted suggestions, is appropriately acknowledged
in this README file.

---

## License

This project is licensed under the MIT License.  
See the LICENSE file for details.
