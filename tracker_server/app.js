const express = require('express');

const app = express();
const PORT = 3000;

//sample app get mehtod that gets a request from the front end.
app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});
//implement an app.get for the twitter api to get log in with GET/ sign-in-with-twitter.

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT);
	else
		console.log("Error occurred, server can't start", error);

	}
);
