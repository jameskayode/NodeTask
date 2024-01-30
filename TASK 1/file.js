const fs = require('fs');

function customRenameFile(commandFilePath, callback) {
  // Step 1: Read the content of the command file
  fs.readFile(commandFilePath, 'utf8', (readFileErr, data) => {
    if (readFileErr) {
      callback(readFileErr);
    } else {
      const [originalFileName, newFileName, content] = data.split('\n');

      // Step 2: Write the content to the new file
      fs.writeFile(newFileName, content, 'utf8', (writeFileErr) => {
        if (writeFileErr) {
          callback(writeFileErr);
        } else {
          console.log('File renamed successfully.');

          // Step 3: Remove the original file
          fs.unlink(originalFileName, (unlinkErr) => {
            if (unlinkErr) {
              callback(unlinkErr);
            } else {
              console.log('Original file removed successfully.');
              callback(null); 
            }
          });
        }
      });
    }
  });
}

// Example usage
const commandFilePath = 'command.txt';

customRenameFile(commandFilePath, (err) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('File renaming process completed successfully.');
  }
});
