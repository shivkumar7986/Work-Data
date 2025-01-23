var fileSystem = require('fs');

//  WRITING FILE , IF FILE DOES'N EXITS , IT CREATES NEW FILE , IF EXITS , IT OVERRIDE IT .

fileSystem.open('demo.txt', 'w',function (err,file){
    if(err) throw err ;

    console.log("created");
})


fileSystem.writeFile("demo.txt" , "hello i am back with new file!" , function(err , file){
    if(err) throw err;

    
})


fileSystem.appendFile("demo.txt" ,'i am fine  , thaks' , function(err){
    if(err) throw err;

    console.log("data append successfull")
} )


fileSystem.readFile("demo.txt" , 'utf8' , function(err , data){
    if(err) throw err;

    console.log( "File contect:\n" + data)
})