# AI Multiple-Choices Questions generator
## Description
A website using Google Gemini API to generate multiple-choices questions using your sources. You can also import questionnaires exported from other users and all the questionnaires you generated will be saved in your browser storage.

## Installation
To install the project, you need to have NodeJS installed on your computer. You can download it [here](https://nodejs.org/en/download/). Once you have NodeJS installed, you can clone the repository and run the following command in the root folder of the project:
```bash
npm install
```
This will install all the dependencies needed for the project to run.

## Usage
To be able to run the project, you have to add this to `.env` file :
```env
VITE_GEMINI_API_KEY=your-gemini-api-key
```

To use the project, you need to run the following command in the root folder of the project:
```bash
npm start
```
This will start the server and you can access the project by going to [http://localhost:5173](http://localhost:5173) in your browser.

Result example (French) :
![image](https://github.com/user-attachments/assets/48c992af-954c-4a81-9e1b-fbf8bf79a9ed)

![image](https://github.com/user-attachments/assets/1c610a6d-f3f9-4a10-bc2c-5e631943ba6e)
