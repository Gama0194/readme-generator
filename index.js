const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "Please name your Project.",
    },
    {
      type: "input",
      name: "description",
      message: "Please describe the purpose and functionality of this project.",
    },
    {
      type: "input",
      name: "screenshot",
      message: "Please provide the relative path to the image you want to use as the screenshot."
    },
    {
      type: "input",
      name: "link",
      message: "Please provide a URL where a user can access your deployed application."
    },
    {
      type: "checkbox",
      name: "license",
      message: "Please select a license applicable to this project.",
      choices: ["MIT", "APACHE2.0", "Boost1.0", "MPL2.0", "BSD2", "BSD3", "none"],
    },
    
    {
      type: "input",
      name: "creator",
      message: "Write your GitHub username.",
    },
    {
      type: "input",
      name: "email",
      message: "Provide a valid email address.",
    },
    {
      type: "input",
      name: "test",
      message: "Provide walkthrough of required tests if applicable.",
    },
  ])
  .then((response) => {
    const licenseBadge = response.license === 'None' ? '' : `![License](https://img.shields.io/badge/License-${encodeURIComponent(response.license)}-green)`;

    const readme = `
# ${response.title}

${licenseBadge}

## Description

${response.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation

${response.installation}

## Usage

${response.usage}

## License

This application is covered under the ${response.license} license.

## Contributing

${response.contributing}

## Tests

${response.tests}

## Questions

For any questions or feedback, please contact me:
- GitHub: [${response.github}](https://github.com/${response.github})
- Email: ${response.email}
    `;

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `README_${timestamp}.md`;
    const filepath = path.join(__dirname, filename);

    fs.writeFile(filepath, readme, (err) => {
      if (err) {
        console.error('Error writing README file:', err);
      } else {
        console.log(`New README file (${filename}) has been successfully created!`);
      }
    });
  });