
let stations;
let extraCanvas;
let myMap;
let data =[];

const options = {
  lat:48.85,
  lng:2.35,
  zoom:10,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}
const mappa= new Mappa('Leaflet');


function preload(){

  stations= loadTable('Station_Locations.csv','header');
}


function setup() {

  
  
 canvas = createCanvas(600, 600);
  extraCanvas = createGraphics(200,200);
   

  
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
 
   let max=0;
  let min= Infinity;
  
   for ( let row of stations.rows)//csv表的每一行
  {
    let lat=row.get('Latitude');
    let lon =row.get('Longitude');
    let numAccident =Number( row.get('AccidentNumber'));
   data.push({
     lat,
     lon,
     numAccident
   });
 
    if(numAccident> max){
      max = numAccident;
    }
    if(numAccident< min){
      min = numAccident;
    }
    
 
   
  
  }
   let maxD = sqrt(max);
  let minD = sqrt(min);
  
  for( let country of data)
  {
    country.diameter = map(sqrt(country.numAccident), minD,maxD,1,6);
   
  }
  
  
  

}

function draw() {
  
         
   clear();

 for( let country of data){
  const pix = myMap.latLngToPixel(country.lat, country.lon); 
  fill(frameCount % 255,255,0,200);

   const zoom = myMap.zoom();
   const scl = pow(1.2,zoom);
   strokeWeight(1);
   stroke(0);
  ellipse(pix.x, pix.y, country.diameter * scl);
 }
//   mk = createGraphics(600, 600);
//   mk.background(255);
//   mk.ellipse(300, 300,600, 600);
//     ( imgClone = mk.get() ).mask(canvas.get() );

//     image(imgClone, 0, 0);
  strokeWeight(160);
  stroke(255);
  fill(0,0);
   ellipse(300,300,760,760);
  

  
//   extraCanvas.background(0);
//  extraCanvas.slider =createSlider(0, 255, 100);
// extraCanvas.slider.position(10, 10);
//   extraCanvas.slider.style('width', '80px');
//   image(extraCanvas,0,0);
  
  

}