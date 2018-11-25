require('dotenv').config();
const request = require('request');

var recipeName;
var totalTime;
var id;
var rating;
var attributes;

yummlyKey = process.env.YUMMLY_API_KEY;
yummlyID = process.env.YUMMLY_API_ID;

// validates keys
if (typeof yummlyKey !== 'undefined' && typeof yummlyID !== 'undefined') {
  var appQuery = '?_app_id=' + yummlyID + '&_app_key=' + yummlyKey;
} else {
  throw new Error("API credentials improperly passed into yummly.js");
}

const Config = {
  "endpoints": {
    "recipeUrl" : "https://api.yummly.com/v1/api/recipe/",
    "recipesUrl" : "https://api.yummly.com/v1/api/recipes",
  }
};

// Builds recipe query using the recipes endpoint
function searchForRecipe(ingredientList) {
  var url = Config.endpoints.recipesUrl + appQuery;

  if (ingredientList && ingredientList.length && Array.isArray(ingredientList)) {
    var searchQuery = '';
    for (let i = 0; i < ingredientList.length; i++) {
      if (typeof ingredientList[i] === 'string') {
        searchQuery += ingredientList[i];
        if (i >= 0 && i < ingredientList.length - 1) {
          searchQuery += '+';
        }
      }
    }
    url += '&q=' + encodeURIComponent(searchQuery);

    return {
      maxRecipeTime: function (input) {
        if (input && typeof input === 'number') {
          url += '&maxTotalTimeInSeconds=' + input;
        }

        return this;
      },

      requiredIngredients: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedIngredient[]=' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&allowedIngredient[]=' + encodeURIComponent(input);
          }

        }

        return this;
      },

      maxResults: function (input) {
        if (input && typeof input === 'number') {
          url += '&maxResult=' + input;
        }

        return this;
      },

      includedAllergies: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&includedAllergy[]=' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&includedAllergy[]=' + encodeURIComponent(input);
          }
        }

        return this;
      },

      requiredDiets: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedDiet[]=' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&allowedDiet[]=' + encodeURIComponent(input);
          }
        }

        return this;
      },

      requiredCuisines: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedCuisine[]=cuisine^cuisine-' + encodeURIComponent(item.toLowerCase());
            });

          } else if (typeof input === 'string') {
            url += '&allowedCuisine[]=cuisine^cuisine-' + encodeURIComponent(input.toLowerCase());
          }
        }

        return this;
      },

      excludedCuisines: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&excludedCuisine[]=cuisine^cuisine-' + encodeURIComponent(item.toLowerCase());
            });

          } else if (typeof input === 'string') {
            url += '&excludedCuisine[]=cuisine^cuisine-' + encodeURIComponent(input.toLowerCase());
          }
        }

        return this;
      },

      requiredCourses: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedCourse[]=course^course-' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&allowedCourse[]=course^course-' + encodeURIComponent(input);
          }
        }

        return this;
      },

      excludedCourses: function (input) {
        if (input && input.length) {
          if (input instanceof Array) {
            input.forEach(function (item) {
              url += '&excludedCourse[]=course^course-' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&excludedCourse[]=course^course-' + encodeURIComponent(input);
          }
        }

        return this;
      },

      minRating: function(input) {
        if (typeof input === 'number') {
            url += '&minRating=' + input;
          }

        return this;
      },

      getURL: function () {
        return url;
      }
    }
  }

}

// TODO: Add timeout
function getJSON(url, cb) {
  var options = {
    url: url
  };

  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      cb(info);
      // console.log(body);
    } else {
       console.log("error: " + error);
      return callback(error);
    }
  }

  request(options, callback);
}


ingredientsList = ['juice', 'carrot', 'milk'];

function getRecipe(ingredientsList,maxRes,Cuisine) {
    var searchQ = searchForRecipe(ingredientsList)
        .requiredIngredients(ingredientsList)
        .maxResults(maxRes)
        .requiredCuisines(Cuisine)
        .getURL();
    return searchQ;
}
function getRecipeId() {
  return id;
}
function getRecipeName() {
    return recipeName;
}
function getTotalTime() {
    return totalTime;
}

function assign(ingredientsList,maxRes,Cuisine) {
  var searchQ = getRecipe(ingredientsList,maxRes,Cuisine);
  getJSON(searchQ, function(get) {
    get.matches.forEach(function(recipe) {
    recipeIDQueue.push(JSON.parse(recipe.id));

    recipeName = recipe.id.name;
    console.log(recipe.id.name);

      totalTime = recipe.id.totalTime;
      console.log(recipe.id.totalTime);

      id=recipe.id;
      console.log(recipe.id);

      // rating = recipe.id.ratin;
      attributes= recipe.id.attributes;
     console.log(recipe.id.attributes);
    });
  });
}
// THIS IS HOW TO GET specific data from the JSON request
// getJSON(searchQ, function(get) {
//   get.matches.forEach(function(recipe) {
//     recipeIDQueue.push(JSON.parse(recipe.id));
//     console.log(recipe.recipeName);
//     console.log(recipe.id);
//     console.log(recipe.ingredients);
//     console.log(recipe);
//   });
// });

// Function that will recieve a recipeURL and return detailed info about recipe (JSON)
// uses recipe endpoint
// TODO: figure out how to send input, sending to console is temporary
function getRecipeInfo(urlList) {
  if (Array.isArray(urlList)) {
    for (var i = 0; i < urlList.length; i++) {
      getJSON(urlList[i], function (get) {
        console.log(get)
      })
    }
  }

}

// Builds recipe url for the recipe endpoint
function getRecipeURLs(input) {
  var recipeUrlQueue = [];

  if (Array.isArray(input)) {
    for (var i = 0; i < input.length; i++) {
      url = Config.endpoints.recipeUrl;
      url += input[i];
      url += appQuery;
      recipeUrlQueue.push(url);
    }
  }

  else if (typeof input === 'string') {
    url = Config.endpoints.recipeUrl;
    url += input;
    url += appQuery;
    recipeUrlQueue.push(url);
  }

  if (recipeUrlQueue.length) {
    return recipeUrlQueue;
  } else {
    return null;
  }

}

recipeIDQueue = ['Southern-Chicken-and-Corn-Chowder-1067232', 'Roasted-Garlic_potato-Soup-My-Recipes', 'Turkey-Meatloaf-2505129'];
recipeUrlQueue = getRecipeURLs(recipeIDQueue);
getRecipeInfo(recipeUrlQueue);

