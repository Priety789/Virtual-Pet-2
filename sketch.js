//Create variables here
var dog, happyDog;
var dogImg, happyDogImg;
var milk, milkImg;
var database;
var foodS, foodStock;
var fedTime, lastFed;
var food;

function preload() {
	//load images here
    dogImg = loadImage("images/Dog.png");
    happyDogImg = loadImage("images/happydog.png");
    milkImg = loadImage("images/Milk.png");
}

function setup() {
    createCanvas(800, 800);

    dog = createSprite(400, 400, 20, 20);
    dog.addImage(dogImg);
    dog.scale = 0.25;

    database = firebase.database();
    foodStock = database.ref('food');
    foodStock.on("value", readStock);

    feed = createButton("Feed the dog");
    feed.position(700, 195);
    feed.mousePressed(feedDog);

    fedTime = database.ref('FeedTime');
    fedTime.on("value", function (data) {
        lastFed = data.val();
    })
}


function draw() {  
    background(46, 139, 87);

    if (keyWentDown(UP_ARROW)) {
        writeStock(foodS);
        dog.addImage(happyDogImg);
        milk = createSprite(random(20, 300), 400, 20, 20);
        milk.addImage(milkImg);
        milk.scale = 0.125;
    }

    drawSprites();

    //add styles here
    textSize(20);
    fill(0);
    text("Press the up arrow to add the food!", 285, 70);
    text("Click the button to feed the dog!", 300, 120);

    if (lastFed >= 12) {
        text("Last feed: " + lastFed % 12 + " PM", 350, 30);
    } else if (lastFed === 0) {
        text("Last feed: 12 AM", 350, 30);
    } else {
        text("Last feed: " + lastFed + " AM", 350, 30);
    }
}

function readStock(data) {
    foodS = data.val();
}

function writeStock(x) {
    if (x < 0) {
        x = 0;
    } else {
        x = x - 1;
    }
    database.ref('/').update({
        food: x
    })
}

function feedDog() {
    foodS++;
    database.ref('/').update({
        food: foodS
    })
    milk.visible = false;
}