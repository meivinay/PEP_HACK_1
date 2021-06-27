const taskkill= require("taskkill");
const fs=require("fs");
let processName=process.argv[2];
(async (processName)=>
{
    try{
       fs.readFile("youtube/processIDs.json","utf8",async (err,data)=>
    {
        let fileData=JSON.parse(data);
        if(fileData.length==0)
        {
            console.log("No process running");
            process.exit();
        }
       
        let pid= fileData[0][processName];
        if(pid==undefined)
        {
            console.log("There is no Task with this name");
            process.exit();
        }
        if(require("is-running")(pid))
        await taskkill(pid,{force:true});
        
        deleteKey(processName);
    });
    }
    catch(e)
    {
        console.log("Cant terminate task");
        console.log("Possible issue\n 1.PID is wrong Please try to terminate from nodejs\n 2.wrong process name provided");
    }


 })(processName);
async function deleteKey(processName)
{
    fs.readFile("youtube/processIDs.json","utf8",(err,data)=>
    {
        let fileData=JSON.parse(data);
        delete fileData[0][processName];
        fs.writeFile("youtube/processIDs.json",JSON.stringify(fileData),(err)=>
        {
            if(err)
            {
                console.log("can not write to json file");
            }
        })
    })
}