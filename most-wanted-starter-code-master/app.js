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
  let eyeColorArray = switchToEyeColor(people);
  let genderArray = switchToGender(eyeColorArray);
  let occupationArray = switchToOccupation(genderArray);
  

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
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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
function switchToEyeColor(people){
  let searchType = promptFor("Do you know the person's eye color?", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      let searchResults = searchByEyeColor(people);
      return searchResults;
    case 'no':
      switchToGender(people)
      break;
    default:
      switchToGender(people)
      break;
  }}

function switchToGender(people){
  let searchType = promptFor("Do you know the person's gender?", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      let searchResults = searchByGender(people);
      return searchResults;
    case 'no':
      switchToOccupation(people);
      break;
    default:
      switchToOccupation(people);
      break;
    }}
  
function switchToOccupation(people){
  let searchType = promptFor('Do you know this persons occupation?', yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      let searchResults = searchByOccupation(people);
      return searchResults;
    case 'no':
      switchToWeight();
      break;
    default:
      switchToWeight();
      break;
    }}

function switchToWeight(people){
  let searchType = promptFor('Do you know this persons weight?', yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    let searchResults = searchByWeight(people);
      break;
    case 'no':
      switchToHeight();
      break;
    default:
      switchToHeight()
}}

//TODO: add other trait filter functions here.

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






function searchByEyeColor(people){
  let eyeColor = prompt('What is this person\'s eye color?')
  let foundPerson = people.filter(function(el){
    if(el.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson
} 



function searchByWeight(people){
  let weight = prompt('What is this persons weight?')
  let foundPerson = people.filteer(function(el){
    if(el.weight === weight){
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
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
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