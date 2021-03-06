"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
  let eyeColor = getEyeColor(people);
  let gender = getGender(people);
  let occupation = getOccupation(people);
  let height = getHeight(people);
  let weight = getWeight(people);
  searchResults = searchByTraits(eyeColor, gender, occupation, height, weight, people);
  searchResults = chooseSinglePerson(searchResults)
  displayPerson(searchResults)
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    findFamily(person, people);
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    findDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function findSpouse(person, people){
  let spouse = people.filter(function(el){
    if(el.currentSpouse === person.id){
      return true;
    }
    else{
      return false;
    }
  })
  return spouse;
}

function findParents(person, people){
  let parentResults = []
  if(person.parents.length != 0){
    person.parents.forEach(parentId => {
    let results = people.filter(function(personObj){
        if(personObj.id === parentId){
          return true;
        }
        else{
          return false;
        }
      })
    parentResults.push(results[0])
})
    return parentResults;
  }}

function findSiblings(person, people, parents){
  let siblings = []
  if(parents && parents.length != 0){
      siblings = people.filter(function(personObj){
      if(personObj.parents.includes(parents[0].id) && person.id != personObj.id){
          return true;
      }
      else{
          return false;
        }
      })
  }
    return siblings;
}

function findDescendants(person, people){
  let parentResults = []
  if(person.parents.length != 0){
    person.parents.forEach(parentId => {
    let results = people.filter(function(personObj){
        if(personObj.id === parentId){
          return true;
        }
        else{
          return false;
        }
      })
    parentResults.push(results[0])
})
  }
  let descendants = []
  let descendantsResults = people.filter(function(descendantsObj){
    if(descendantsObj.parents.includes(person.id)){
      return true;

    }
    else{
      return false;
    }
  })
  descendants = descendantsResults
  let descendantInfo = ''
  if(descendants.length != 0){
  descendantInfo += `${person.firstName}'s children: ` + '\n'
  descendants.forEach(descendant => {
    descendantInfo += "First Name: " + descendant.firstName + '\n'
    descendantInfo += "Last Name: " + descendant.lastName + '\n'
  })}
  else{
    descendantInfo += `${person.firstName} doesn\'t have any children` + '\n'
  }
  alert(descendantInfo)
  let grandChildren = findGrandChildren(people, descendants)
  printGrandChildren(person, grandChildren)
}

function printGrandChildren(person, grandChildren){
  let grandChildrenInfo = ''
    if(grandChildren.length != 0){
      grandChildrenInfo += `${person.firstName}'s Grandchildren: ` + '\n'
      grandChildren.forEach(grandChildObj => {
        grandChildObj.forEach(el => {
          
        grandChildrenInfo += "First Name: " + el.firstName + '\n'
        grandChildrenInfo += "Last Name: " + el.lastName + '\n'
      })})
    }
    else{
      return false;
    }
  
  alert(grandChildrenInfo)
}
  
function findGrandChildren(people, children){
  let childIdArray = children.map(function(child){
    return child.id
  })
  let childArray = [];
  childIdArray.forEach(childId => {
    let childResults = people.filter(function(grandChild){
      if(grandChild.parents.includes(childId)){
        return true;
      }
      else{
        return false;
      }
    })
    if(childResults.length != 0){
      childArray.push(childResults)
    }
    
  })
  return childArray;
}

function findFamily(person, people){
  let familyInfo = ''
  let spouse = findSpouse(person, people)
  let parents = findParents(person, people)
  let siblings = findSiblings(person, people, parents)
if(spouse && spouse.length != 0){
  familyInfo += `${person.firstName}'s Spouse: ` + '\n'
  familyInfo += 'First Name: ' + spouse[0].firstName + '\n'
  familyInfo += 'Last Name: ' + spouse[0].lastName + '\n'
}
else{
  familyInfo += `${person.firstName} doesn\'t have a spouse` + '\n'
}
  
  if(siblings && siblings.length != 0){
      familyInfo += `${person.firstName}'s sibling/s: ` + '\n'
      siblings.forEach(sibling => {
        familyInfo +=  'First Name: ' + sibling.firstName + '\n'
        familyInfo +=  'Last Name: ' + sibling.lastName + '\n'
      })
    }
    else{
      familyInfo += `${person.firstName} doesn't have any siblings. ` + '\n'
    }
    if(parents && parents.length != 0){
      familyInfo += `${person.firstName}'s parents: ` + '\n'
      parents.forEach(parent => {
        familyInfo +=  'First Name: ' + parent.firstName + '\n'
        familyInfo +=  'Last Name: ' + parent.lastName + '\n'
      })
    }
  alert(familyInfo)
}

function getEyeColor(people){
  let userInput = promptFor('Do you want to search by eye color?', yesNo).toLowerCase();
  if(userInput == 'yes'){
   let eyeColor = promptForTheSequel('What is their eye color?', customValidation, 'eyeColor', people).toLowerCase();
   return eyeColor;
  }
  else{
    return '';
  }
}

function getGender(people){
  let userInput = promptFor('Do you want to search by gender?', yesNo).toLowerCase();
  if(userInput == 'yes'){
   let gender = promptForTheSequel('What is their gender?', customValidation, 'gender', people).toLowerCase();
   return gender;
  }
  else{
    return '';
  }
  }

function getOccupation(people){
  let userInput = promptFor('Do you want to search by occupation?', yesNo).toLowerCase();
  if(userInput == 'yes'){
    let gender = promptForTheSequel('What is their occupation?', customValidation, 'occupation', people).toLowerCase();
    return gender;
  }
  else{
    return '';
  }
  }

function getHeight(people){
  let userInput = promptFor("Do you want to search by height?",yesNo).toLowerCase();
  if (userInput == "yes") {
    let gender = promptForTheSequel("What is their height?", customValidation, 'height', people).toLowerCase();
    return gender;
  } else {
    return "";
  }
}

function getWeight(people){
  let userInput = promptFor('Do you want to search by weight?', yesNo).toLowerCase();
  if(userInput == 'yes'){
    let gender = promptForTheSequel('What is their weight?', customValidation, 'weight', people).toLowerCase();
    return gender;
  }
  else{
    return '';
  }
  }

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  let newObject = foundPerson[0]
  // TODO: find the person single person object using the name they entered.
  //Check that foundPerson is a single array entry, after that build a new object using the data found in that array, after we verify that its a single entry in the array
  //If not, then we know the name is not a match to the name entered, or its a multi-match: return the new object
  return newObject;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.


//TODO: add other trait filter functions here.

function searchByTraits(eyeColor = '', gender = '', occupation = '', height = '', weight = '', people){
  let searchResults = people
  if(eyeColor != ''){
    searchResults = searchResults.filter(function(el){
      if(el.eyeColor === eyeColor){
        return true;
      }
      else{
        return false;
      }
    })
  }
  if(gender != ''){
    searchResults = searchResults.filter(function(el){
      if(el.gender === gender){
        return true;
      }
      else{
        return false;
      }
    })
  }
  if(occupation != ''){
    searchResults = searchResults.filter(function(el){
      if(el.occupation === occupation){
        return true;
      }
      else{
        return false;
      }
    })
  }
  if(height != ''){
    searchResults = searchResults.filter(function(el){
      if(el.height === height){
        return true;
      }
      else{
        return false;
      }
    })
  }
  if(weight != ''){
    searchResults = searchResults.filter(function(el){
      if(el.weight === weight){
        return true;
      }
      else{
        return false;
      }
    })
  }
  return searchResults;
}

function searchByGender(people){
  let gender = prompt('What is the person\'s gender?')
  let foundPerson = people.filter(function(el){
    if(el.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson
} 

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n"
  personInfo += "Eye Color: " + person.eyeColor + "\n"
  personInfo += "Height: " + person.height + "\n"
  personInfo += "Weight: " + person.weight + "\n"
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function chooseSinglePerson(people){
  displayPeople(people)
  let userInput = prompt('Is the person you\'re looking for in this list?')
  if(userInput === 'yes'){
    let userInputFirstName = prompt('Please enter their first name ')
    let userInputLastName = prompt('Please enter their last name ')
    let foundPerson = people.filter(function(el){
      if(el.firstName === userInputFirstName && el.lastName === userInputLastName){
        return true;
      }
      else{
        return false;
      }
    })
    let newObject = foundPerson[0]
    return newObject;
  }
  else{
    alert('Then why are you here????')
  }
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

function promptForTheSequel(question, valid, type, people){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response, type, people);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.

function customValidation(input, type, people){
  let genderArray = ['male', 'female']
  let occupationArray = []
  let heightArray = []
  let weightArray = []
  let eyeColorArray = []
  let inputFlag = false;
  people.forEach(person => {
    weightArray.push(person.weight)
    heightArray.push(person.height)
    occupationArray.push(person.occupation)
    eyeColorArray.push(person.eyeColor)
  })
  if(type == 'eyeColor'){
    eyeColorArray.forEach(color => {
      if(color == input){
        inputFlag = true;
        return;
      }
    })
    return inputFlag;
  }
  if(type == 'weight'){
    weightArray.forEach(weight => {
      if(weight == input){
        inputFlag = true;
        return;
      }
    })
    return inputFlag;
  }
  if(type == 'height'){
    heightArray.forEach(height => {
      if(height == input){
        inputFlag = true;
        return;
      }
    })
    return inputFlag;
  }
  if(type == 'occupation'){
    occupationArray.forEach(occupation => {
      if(occupation == input){
        inputFlag = true;
        return;
      }
    })
    return inputFlag;
  }
  if(type == 'gender'){
    genderArray.forEach(gender => {
      if(gender == input){
        inputFlag = true;
        return;
      }
    })
    return inputFlag;
  }
}

//#endregion