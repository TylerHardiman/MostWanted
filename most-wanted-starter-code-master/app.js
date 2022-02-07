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
  let eyeColor = getEyeColor();
  let gender = getGender();
  let occupation = getOccupation();
  let height = getHeight();
  let weight = getWeight();
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

function findDescendants(person, people){
  let descendants = []
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
  if(parents.length != 0){
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
  descendantInfo += `${person.firstName}'s children: ` + '\n'
  descendants.forEach(descendant => {
    descendantInfo += "First Name: " + descendant.firstName + '\n'
    descendantInfo += "Last Name: " + descendant.lastName + '\n'
  })
  alert(descendantInfo)
  findGrandChildren(person, people, descendants)
}

function findGrandChildren(person, people, children){
  let grandChildren = []
  let results = people.forEach(personObj => {
      if(childObj.parents.includes(personObj.id)){
        return true;
      }
      else{
        return false;
      }
    })
    
  }
  let grandChildrenInfo = ''
  grandChildrenInfo += `${person.firstName}'s Grandchildren: ` + '\n'
  results.forEach(grandChild => {
  grandChildrenInfo += "First Name: " + grandChild.firstName + '\n'
  grandChildrenInfo += "Last Name: " + grandChild.lastName + '\n'
  })
  alert(grandChildrenInfo)
}

function findFamily(person, people){
  let familyInfo = ''
  let spouse = findSpouse(person, people)
  let parents = findParents(person, people)
  let siblings = findSiblings(person, people, parents)
if(spouse.length != 0){
  familyInfo += `${person.firstName}'s Spouse: ` + '\n'
  familyInfo += 'First Name: ' + spouse[0].firstName + '\n'
  familyInfo += 'Last Name: ' + spouse[0].lastName + '\n'
}
else{
  familyInfo += `${person.firstName} doesn\'t have a spouse` + '\n'
}
  
  if(siblings.length != 0){
      familyInfo += `${person.firstName}'s sibling/s: ` + '\n'
      siblings.forEach(sibling => {
        familyInfo +=  'First Name: ' + sibling.firstName + '\n'
        familyInfo +=  'Last Name: ' + sibling.lastName + '\n'
      })
    }
    else{
      familyInfo += `${person.firstName} doesn't have any siblings.`
    }
    if(parents.length != 0){
      familyInfo += `${person.firstName}'s parents: ` + '\n'
      parents.forEach(parent => {
        familyInfo +=  'First Name: ' + parent.firstName + '\n'
        familyInfo +=  'Last Name: ' + parent.lastName + '\n'
      })
    }
  alert(familyInfo)
}

function getEyeColor(){
  let userInput = promptFor('Do you want to search by eye color?', yesNo).toLowerCase();
  if(userInput == 'yes'){
   let eyeColor = prompt('What is their eye color?').toLowerCase();
   return eyeColor;
  }
  else{
    return '';
  }
}

function getGender(){
  let userInput = promptFor('Do you want to search by gender?', yesNo).toLowerCase();
  if(userInput == 'yes'){
   let gender = prompt('What is their gender?').toLowerCase();
   return gender;
  }
  else{
    return '';
  }
  }

function getOccupation(){
  let userInput = promptFor('Do you want to search by occupation?', yesNo).toLowerCase();
  if(userInput == 'yes'){
    let gender = prompt('What is their occupation?').toLowerCase();
    return gender;
  }
  else{
    return '';
  }
  }

function getHeight() {
  let userInput = promptFor("Do you want to search by height?",yesNo).toLowerCase();
  if (userInput == "yes") {
    let gender = prompt("What is their height?").toLowerCase();
    return gender;
  } else {
    return "";
  }
}

function getWeight(){
  let userInput = promptFor('Do you want to search by weight?', yesNo).toLowerCase();
  if(userInput == 'yes'){
    let gender = prompt('What is their weight?').toLowerCase();
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
function customValidation(input){
  
}

//#endregion