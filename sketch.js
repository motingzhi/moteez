//const key = 'xyz';
let value2;
let stations;
let rectalpha255= 0;
let alpha200 = 0;
let stroke255 = 0;
let extraCanvas;
let myMap;
let data =[];
let b = 2;
let ell1;
let value;
let datax= [];
let datay=[];
let choosestation =1;


let switchyear=1;
let value3;
let value4;
let value5;

let maxD,minD,maxD2,minD2;

const options = {
  lat:48.85,
  lng:2.35,
  zoom:11,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
  //style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  // studio: true,
  // style: "mapbox://styles/mapbox/traffic-night-v2"
}
const mappa= new Mappa('Leaflet');



function preload(){

  stations= loadTable('Station_Locations.csv','header');
}


function setup() {

  
  
 var canvas = createCanvas(windowWidth, 800);
  //  var x = (windowWidth - width) / 2;
  // var y = (windowHeight - height) / 2;
  // canvas.position(x, y);
   canvas.mousePressed();

   

  
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
 
   let max1=0;
  let min1= Infinity;
  
  
   let max2=0;
  let min2= Infinity;
   for ( let row of stations.rows)//csv表的每一行
  {
    let lat=row.get('Latitude');
    let lon =row.get('Longitude');
    
       let numAccident =Number( row.get('accidentNumber2'));
    let numAccident2 =Number( row.get('AccidentNumber'));
      
      
    let station = row.get('Station');
    let Top1 = row.get('Top1');
     let Top2 = row.get('Top2');
    let Top3 = row.get('Top3');
   data.push({
     lat,
     lon,
     numAccident,
     numAccident2,
     station,
     Top1,
     Top2,
     Top3
   });
 
    if(numAccident> max1){
      max1 = numAccident;
    }
    if(numAccident< min1){
      min1 = numAccident;
    }
     if(numAccident2> max2){
      max2 = numAccident2;
    }
    if(numAccident2< min2){
      min2 = numAccident2;
    }
    
    
  maxD = sqrt(max1);
  minD = sqrt(min1);
  
      
  maxD2 = sqrt(max2);
  minD2 = sqrt(min2);
  
   
  
  }
  
  
  
  

}

function draw() {
  if(switchyear==1){
      for( let country of data)
  {
    country.diameter = map(sqrt(country.numAccident), minD,maxD,1,7);
    country.diameter2 = map(sqrt(country.numAccident), minD,maxD,0.8,6);
   
  }
     }
  if(switchyear==2){
     for( let country of data)
  {
    country.diameter = map(sqrt(country.numAccident2), minD2,maxD2,1,7);
    country.diameter2 = map(sqrt(country.numAccident2), minD2,maxD2,0.8,6);
   
  }
  }
 
         
   clear();

 for( let country of data){
   
  const pix = myMap.latLngToPixel(country.lat, country.lon); 
   
  fill(255,255,0, 255*sin(frameCount*0.1) );
  
   const zoom = myMap.zoom();
   const scl = pow(1.2,zoom)*sin(frameCount*0.05);
   strokeWeight(1);
   stroke(0);
   ellipse(pix.x, pix.y, country.diameter * scl);
   
   fill(255,0,200);
   
   const scl2 = pow(1.15,zoom);
   strokeWeight(1);
   stroke(0);
   ellipse(pix.x,pix.y,country.diameter2*scl2);
   
   
   
   
 }
   for( let country of data){
   
  const pix = myMap.latLngToPixel(country.lat, country.lon);
  const zoom = myMap.zoom();
            const scl = pow(1.2,zoom);
    if( (pix.x-5)< mouseX && (pix.x+5)>mouseX)
    {
      if((pix.y-5)< mouseY && (pix.y+5)>mouseY)
         { 
           fill(255);
         rect(mouseX,mouseY,70*sqrt(scl),30*sqrt(scl));
           let station = country.station;
           fill(0);
           textSize(5*sqrt(scl));
           console.log(4*sqrt(scl));
           text(station,mouseX+5,mouseY+10, 100*sqrt(scl), 20*sqrt(scl));
           
           let number = country.numAccident;
           fill(0);
           textSize(4*sqrt(scl));
           console.log(4*sqrt(scl));
           text("Incidents Number: ",mouseX+5,mouseY+25*(1+sqrt(scl)/100), 100*sqrt(scl), 30*sqrt(scl));
           fill(255,0,200);
           textSize(5*sqrt(scl));
           text(number,mouseX+5,mouseY+45*(1+sqrt(scl)/100), 100*sqrt(scl), 30*sqrt(scl));
         }
     
    }
 }
  
 
  stroke(255);
  fill(0);
    line(45,300,45,390);
  noStroke();
  fill(255);
  ellipse(45,300,20);
  fill(255);
  
  textSize(20);
 text("Other years",70,294,200,100);
  
  fill(255,0,200);
  ellipse(45,390,20);
  textSize(20);
  text("2019",70,382,100,100);
  
  strokeWeight(1);
    stroke(stroke255);
     fill(200,200,200,alpha200);
    rect(45,80,330,160);
     fill(0,0,0);
    textSize(20);
    stroke(0);
  text(value2, 60,90,300,100);   
  noStroke();
  textSize(16);
    text(value, 60, 125,300, 100);
  
  
     fill(255,50,200,rectalpha255);
     rect(60,150,80,16);  
  fill(255,100,200,rectalpha255);
    rect(60,175,70,16);
  fill(255,150,200,rectalpha255);
  rect(60,200,60,16);
  fill(0,0,0,rectalpha255);
   text(value4,150,175,400,200);
  text(value3,150,150,400,200);
  text(value5,150,200,400,200);
  
  
}


function  mousePressed() {
//console.log("yes");
 let i = 0;
  if( 35< mouseX && 55>mouseX)
    {
      if(290< mouseY && 310>mouseY)
         {
          
            switchyear=2;
        
         }
     
    }
  for( let country of data){
   
  const pix = myMap.latLngToPixel(country.lat, country.lon);
  
    if( (pix.x-5)< mouseX && (pix.x+5)>mouseX)
    {
      if((pix.y-5)< mouseY && (pix.y+5)>mouseY)
         {
           value=country.station;
           value2 = "Top 3 inccident types";
            console.log("yes");
         rectalpha255= 255;
         alpha200 = 200;
            stroke255 = 255;
           value3=country.Top1;
           value4=country.Top2;
            value5=country.Top3;
         }
     
    }
 }
 return false;

}