import { Component, OnInit } from '@angular/core';

declare function getResultIngredients(): any;
declare function  assign(ingredientsList,maxRes,Cuisine): any;
declare function getRecipeId(): any;
declare function getRecipeName(): any;
declare function getTotalTime(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ingredient: String;
  myingredientsList: String[];
  myrecipeUrl: String;
  myrecipeName: String;
  mytotalTime: String;
  myid:String;
  myrating:String;
  attributes: String[];

  constructor() {
    console.log('hellll0000000');

  }

  //i hard coded 3, & cusine for now.
  ngOnInit() {
    this.myingredientsList = getResultIngredients();
    this.myrecipeUrl = assign(this.myingredientsList,3,'American');
    this.myid = getRecipeId();
    this.myrecipeName = getRecipeName();
    this.mytotalTime = getTotalTime();
    // addToCheckBox();
    // displayBanner();
  }


  addClicked(){
    // ingredientsList = getResultIngredients();
    //this.ingredientsList.push(this.ingredient);
    console.log(this.myingredientsList);
    console.log(this.myrecipeUrl);
    console.log(this.myid);
    console.log(this.myrecipeName);
    console.log(this.mytotalTime);
    console.log('ive been clicked');
  }


}

