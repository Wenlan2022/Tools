const fs = require('fs')

const folderPath = 'path'  // replace "path" with the path of the folder


try {
    const file = fs.readdirSync(folderPath)

    console.log('*****************************************')
    console.log('File in the folder: ')
    console.log(file)
    console.log('*****************************************')

    let fileType = file.filter((fileName) => fileName.includes('type')) // replce 'type' with the file type you want to delete
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


