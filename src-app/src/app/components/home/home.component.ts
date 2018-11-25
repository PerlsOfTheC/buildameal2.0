import { Component, OnInit } from '@angular/core';
// const recipe = require('../assests/recipes');
//import '../../../assets/recipes'
declare function getResultIngredients(): any;
declare function setIngredients(ingredients): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myingredientsList: String[];
  hi: String;
  //myRecipe = new Recipe();


  constructor() {
    console.log('hellll0000000');

  }

  //i hard coded 3, & cusine for now.
  ngOnInit() {
    this.myingredientsList = getResultIngredients();
  }


  addClicked(){
    // ingredientsList = getResultIngredients();
    //this.ingredientsList.push(this.ingredient);
    console.log(this.myingredientsList);
    this.hi = setIngredients(this.myingredientsList);
    console.log( this.hi + 'ive been clicked');
  }


}

