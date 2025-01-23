let Country_Object = {
    "India" : {
        "Himachal" : ["Shimla","Kasauli","Manali"],
        "Punjab" : ["Mohali","Bathinda","Mansa"],
        "J&K" : ["Gulmarg","Jammu","Srinagar"]
    },
    "USA" : {
        "Virginia" : ["Ashburn","Richmond","Roanoke"],
        "Florida" : ["Tampa","Miami","Orlando"],
        "California" : ["San Diego","San Francisco","Los Angeles"]
    },
    "Australia" : {
        "Queensland" : ["Brisbane","Cairns","Gold Coast"],
        "Tasmania" : ["Hobart","Bernie","Sheffield"],
        "New South Wales" : ["Sydney","Albury","Orange"]
    }
}
function main(){
    for (var x in Country_Object){
        country.options[country.options.length] = new Option (x,x);            //what is new option?
    }
    country.onchange = function(){                                             //if onchange to default?
        state.length = 1;
        city.length = 1;
        for (var y in Country_Object[this.value]){                              
            state.options[state.options.length]  = new Option (y,y);
        }
    }
    state.onchange = function(){
        city.length = 1;
        var z = Country_Object[country.value][this.value];                //explain this? city not connecting in casade (issue here)?
        for (var i=0 ;i < z.length; i++){
            city.options[city.options.length] = new Option (z[i],z[i]);
        }
    }
}
window.onload = function(){
        main();
}