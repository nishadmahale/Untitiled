//Create variables here
  var dogImage1;
  var dogImage2;
  
  var database;
  var foodStock;
  var Dog;
  var foodS;
  var feed,addFood;
  
  var fedTime,lastFed;
  var foodObj;
 


  function preload()
  {
    //load images here
    dogImage1=loadImage("Dog.png");
    dogImage2=loadImage("happydog.png");
   
  }

  function setup() {
    database=firebase.database();
        createCanvas(1000, 500);
        Dog = createSprite(550,250,10,10);
        Dog.addImage(dogImage1);
        Dog.scale=0.15;
        foodObj=new Food();
        
        database=firebase.database();
        foodstock=database.ref('Food');
        foodstock.on("value",readStock);

        
        


     

        var feed=createButton(" Feed Montu");
        feed.position(700,95);
        feed.mousePressed(feedDog);

        var add=createButton("Add Food");
        add.position(800,95);
        add.mousePressed(addFoods);
        

  
    }


    function draw() {
      background(46,139,87);
      foodObj.display();
    
      fedTime=database.ref('FeedTime');
      fedTime.on("value",function(data){
        lastFed=data.val();
      });
     
      fill(255,255,254);
      textSize(15);
      if(lastFed>=12){
        text("Last Feed : "+ lastFed%12 + " PM", 350,30);
       }else if(lastFed==0){
         text("Last Feed : 12 AM",350,30);
       }else{
         text("Last Feed : "+ lastFed + " AM", 350,30);
       }
     
      drawSprites();
    }
    
    //function to read food Stock
    function readStock(data){
      foodS=data.val();
      foodObj.updateFoodStock(foodS);
    }
    
    
    //function to update food stock and last fed time
    function feedDog(){
     
      
    if(foodObj.getFoodStock()<= 0){
        foodObj.updateFoodStock(foodObj.getFoodStock()*0);
      }else{
        foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      }
      
      database.ref('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
      })
    }
    
    //function to add food in stock
    function addFoods(){
      foodS++;
      database.ref('/').update({
        Food:foodS
      })
    }