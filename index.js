// api_key="https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=process.env.74d85ca6c04292aea1811e94363e0cf7"
// let city="vijayawada";
const http=require("http");
const fs=require("fs");
var requests=require("requests");

const homeFile=fs.readFileSync("home.html","utf-8")


const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempVal%}",orgVal.main.temp);
     temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
     temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
     temperature=temperature.replace("{%location%}",orgVal.name);
     temperature=temperature.replace("{%country%}",orgVal.sys.country);
     temperature=temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
return temperature;
};

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests(
            `http://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=metric&appid=74d85ca6c04292aea1811e94363e0cf7`
          )
            .on("data", (chunk) => {
                const objdata=JSON.parse(chunk);
                const arrData=[objdata];
                console.log(arrData[0].main.temp);
                const realTimeData=arrData.map((val)=>replaceVal(homeFile,val)).join(""); //string format
                // console.log(realTimeData);
                res.write(realTimeData)
            })
           
            .on("end",(err)=>{
                if(err) return console.log("connection avatledhu voy",err);
                console.log("end");
            })
        }
      });

      server.listen(8000,"127.0.0.1");