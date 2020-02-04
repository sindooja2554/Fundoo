var redisConnection = require('./services/redis');

//  function abc(){
//     redisConnection.set('redisKey',"abc",(error,data)=>{
//         if(error){
//             console.log(error);
//         } else {
//             console.log(data);
//         }
//     })

function pqr(){
    redisConnection.get('redisKey',(error,data)=>{
        if(error){
            console.log(error);
        } else {
            console.log(data);
        }
    })
}

pqr()