//const data = require('./homepageStyle');

class Recipe{
//images need to be an array
  constructor(_totalTime,_image,_myname,_url,_ingredients,_rating){
    this._totalTime = _totalTime;
    this._image = _image;
    this._url = _url;
    this._ingredients = _ingredients;
    this._rating = _rating;
    this._myname = _myname;
  }
  get totalTime(){
    return this._totalTime;
  }
  get image(){
    return this._image;
  }
  get name(){
    return this._myname;
  }
  get url(){
    return this._url;
  }
  get ingredients(){
    return this._ingredients;
  }
  get rating(){
    return this._rating;
  }
   setIngridents(ingridents) {
    console.log("setIngridents: " + ingridents);
  }
}
module.exports = Recipe;





