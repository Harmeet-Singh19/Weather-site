$(function(){
    let long;
    let lat;
    let op="HRD0";
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let LocationTimezone= document.querySelector('.location-timezone');
    let temperatureSection= document.querySelector('.temperature');
    const temperatureSpan= document.querySelector('.tf');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long =position.coords.longitude;
            lat=position.coords.latitude;

            const proxy="https://cors-anywhere.herokuapp.com/";
            const api=`${proxy}http://api.weatherapi.com/v1/current.json?key=eb8e92c126684e87a3d162922202307&q=${lat},${long}`;
         fetch(api)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            console.log(data);
            const {temp_c,temp_f,humidity}= data.current;
            const {country,tz_id,region,name}=data.location;
            let summary;
            let icon;
           if(humidity>80){
                summary="Its Rainnyy!!!!! ";
                icon="rain";
           }
           else if( humidity>50){
                summary="It mightttt rain!!";
                icon="partly-cloudy-day";
           }
           else{
                summary="It is as dry as your love life :(";
                icon="clear-day";
           }
           //Set DOM elements from the API
           temperatureDegree.textContent =temp_c;
           temperatureDescription.textContent=summary;
           LocationTimezone.textContent=name+","+region;
           //Set Icon
           setIcons(icon,document.querySelector(".icon"));
           // change temperature to Celsius/Farenheit
           temperatureSection.addEventListener('click',()=>{
               if(temperatureSpan.textContent==="F"){
                   temperatureSpan.textContent="C";
                   temperatureDegree.textContent =temp_c;
               }else{
                temperatureSpan.textContent="F";
                temperatureDegree.textContent =temp_f;
               }
           });
        });
    });
}

function setIcons(icon,iconID){
    const skycons= new Skycons ({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);
}
});