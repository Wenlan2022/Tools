const fs = require('fs')
const prompt = require("prompt-sync")({sigint:true});

// const folderPath = 'path'  // replace "path" with 

const folderPath = prompt("Please enter the path of your folder: ") // enter the path of the folder
const type = prompt("Please enter the type of files you want to delete: ") // enter the file type you want to delete


try {
    const file = fs.readdirSync(folderPath)

    console.log('*****************************************')
    console.log('File in the folder: ')
    console.log(file)
    console.log('*****************************************')

    let fileType = file.filter((fileName) => fileName.includes(type)) 
    console.log('-----------------------------------------')
    console.log('Here is the file is going to delete: ', fileType)
    console.log('-----------------------------------------')
    fileType.forEach((fileName) => {
        const filePath = folderPath + '\\' + fileName

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(`Error deleting ${fileName}: `, fileName)
            }
            else {
                console.log(`${fileName} deleted successfully`)
            }
        })


    })

    console.log('*****************************************')
    const files = fs.readdirSync(folderPath)
    console.log('Files in the folder: ')
    console.log(files)
    console.log('*****************************************')



} catch (e) {
    console.log(e)
}


// function logUserName() {
//     // Use the prompt function to get user input
//     const userName = prompt("Please enter your name:");
  
//     // Check if the user entered a name
//     if (userName !== null && userName !== "") {
//       // Log the entered name to the console
//       console.log("Hello, " + userName + "!");
//     } else {
//       // Handle the case where the user didn't enter a name
//       console.log("You did not enter a name.");
//     }
//   }
  
//   // Call the function to start the process
//   logUserName();
  