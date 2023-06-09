const PORT=3000;
const express=require('express');
const socketIO=require("socket.io");
const https=require('https');
const server=express().listen(PORT, ()=> {
    console.log('listening to'+' '+PORT);
});

const io=socketIO(server);

io.on('connection',(socket)=>{
    console.log('Client conntected');
    socket.on('disconnect',()=>{
        console.log('Client Disconnected');
    });
});

const options={
   
    
    hostname :'data.messari.io',
    port:443,
    path:'/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd',
    method: 'GET',
}
setInterval(()=>{

    https.request(options,(res)=>{
        let str='';
        res.on('data',(chunk)=>(str+=chunk));
        res.on('end',()=>{
            const prices=JSON.parse(str).data.map((item)=>{
                return{
                    id:item.id,
                    name: item.symbol,
                    price: item.metrics.market_data.price_usd,
                }
            })
            io.emit('crypto',prices);
        });
    })
    .end();

},5000)

