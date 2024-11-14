
# Payment Acknowledgment Project

The goal of this project is to make acknowledgment process paperless. Employees will receive their payment without physical signatures and give acceptance through system.
It’s a web application. At this application there are 2 sections. One for finance user and another one for general users. 
#### Finance User :
This part is controlled by selected finance employee who has access to this portal and define as admin. They send notification to employees through the system. They has employee list in application who receive cash salary and for iExpense they get current time approved bills which are ready for payment.
#### General User :
All the oracle users who have iExpense responsibility are able to provide confirmation through this system. When finance user sends notification, they get that in SMART app. There is a menu ‘Payment acknowledgment’ in SMART app. After clicking on that user can see notification. Also they can see their acknowledgment history too.


## 1. Application View
Finance User : 

There are 2 pages at this site 
1.	Search page

![image](https://github.com/user-attachments/assets/6a70a405-8a7d-49c4-a592-5ae9383aff97)


Fig 1.1 : Search page
2.	Send notification page
![image](https://github.com/user-attachments/assets/128f6161-47b4-4e08-a6e2-fc1f543e7f78)


Fig 1.2 : Send notification page
User :

After finance user sends notification, user can see that in their SMART app for both cash salary and iExpense bill.

![image](https://github.com/user-attachments/assets/23662f75-c0f0-4b1b-9a99-aa5b24b10ac0)


Fig 1.3 : User screen




## Tech Stack

**Client:** React JS, CSS, Tailwind CSS, Daisy UI, Bootstrap, Fontawsome

**Server:** Node JS, Express JS

**Database:** Oracle SQL
### Tools:

1.	Code Editor – Visual Studio Code

2.	Toad

3.	Postman

4.	Oracle Instantclient


## Installation

To configure this project in server, installing process below:

1.	Download Node JS and install it

2.	Download Oracle Instant Client and install it in C drive
3. 3.	Run command  

```bash
  npm install
```
on project folder path using terminal.

4.	At ‘package.json’ file of project folder all installed package list is defined.
5.	Install tailwind css by following steps :
```bash
  npm install -D tailwindcss
  npx tailwindcss init

```
6.	In ‘tailwind.config.js’ write below lines: 
```bash
 /** @type {import('tailwindcss').Config} *
module.exports = {

content: ["./src/**/*.{html,js}"],

theme: {

extend: {},

},

plugins: [],

}

```
7.	In ‘src/input.css’ write below codes: 

```bash
@tailwind base;
@tailwind components; 
@tailwind utilities;

```
8.	Install Daisy UI run below command: 
```bash
npm i -D daisyui@latest
```
9.	In ‘tailwind.config.js’ file write below code:
```bash
module.exports = {

//...

plugins: [

require('daisyui'),

],

}

```


    
## Run Locally

Clone the project

```bash
  git clone https://github.com/IshratEpsi16/Payment-Acknowledgment-Project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Run 2 terminal to start the server. One for backend and another for frontend:
(i)	Backend run command :
```bash
 node ‘backend_file_name.js’
```
(ii)	Frontend run command : 
```bash
 npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Deployment

To host project on the server PC securely and efficiently for production, here’s a structured approach:
1.	Install Node.js and npm on the server PC if they’re not already installed.
2.	Use secure file transfer methods like SCP (if using SSH) or SFTP to transfer files from your local machine to the server.
3.	Create a .env file on the server with production-specific configurations like database URLs, API keys, etc
4. Install PM2 which is a process manager for Node.js applications, ideal for production setups. Command is 
```bash
  npm install -g pm2
```
5.  Use PM2 to run your server (backend) application , command is
```bash
  pm2 start server.js
``` 
6.  For react frontend need to build in production. Run command 
```bash
  npm run build
``` 
7. Use PM2 to ensure applications restart automatically after server reboots by command
```bash
pm2 startup
pm2 save
``` 


## Features

- Give payment confirmation online
- No need any physical signatures
- Reduce printing costs
- Paperless


## Used By

This project is used by the following company:

- Seven Rings Cement



## Flowchart

Flowchart of system:

![image](https://github.com/user-attachments/assets/0f82b997-5497-48bb-afb0-b9cf0b744d5a)



Fig 1.4 : Flowchart of payment acknowledgment

## Summary
By using this web application we can make the process digitalize and paperless

