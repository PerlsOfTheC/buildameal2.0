import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ingredients: String;
  // ProteinButton: String[];
  // VegetableButton: String[];
  // FruitsButton: String[];
  // DairyButton: String[];
  // AllegriesButton: String[];
  // DietButton: String[];
  // CuisineButton: String[];
  // CourseButton: String[];
  // TimeButton: String[];

  constructor() { }

  ngOnInit() {
  }

  getSearchIngredient(){
    console.log("hellll0000000");
  }

}

