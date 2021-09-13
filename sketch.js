var dog, sadDog, happyDog;
var food, foodObj, foodStock;
var feed, addFood, fedTime, lastFed;

 function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
 }

 function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  food = createButton("Add Food");
  food.position(800, 95);
  food.mousePressed(addFood); 
 }

 function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
   text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
 }else if(lastFed == 0){
   text("Last Feed : 12 AM", 350, 30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350, 30);
 }
  drawSprites();
 }
  function readStock(data){
   var foodval = data.val();
   foodObj.updateFoodStock(foodval);
  }
  
  function feedDog(){
   dog.addImage(happyDog);
   if(foodObj.getFoodStock() > 0){
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
  });
}
}
  
 function addFood(){
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  database.ref('/').update({
  Food:foodObj.getFoodStock()
  });
 }

