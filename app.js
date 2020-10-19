const express =require("express");
const request = require("request");
const bodyParser=require("body-parser");
const https=require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));//to get the dat from the post

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html" );
});


app.post("/failure",function(req,res){
  res.redirect("/");
});


app.post("/",function(req,res){
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var email=req.body.email;


  var data={
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  var jasonData = JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/6a77cb5b38";
  const options={
    method: "POST",
    auth: "angela1:fe114bbbe6537a0e09ef5316f35bf83f-us2"
  }

          const requestHTTPS=https.request(url,options, function(response){
            if(response.statusCode===200){
              res.sendFile(__dirname+"/sucess.html");
            }
            else{
              res.sendFile(__dirname+"/failure.html");
            }

  });
  requestHTTPS.write(jasonData);
  requestHTTPS.end();
});





app.listen(process.env.PORT || 3000,function(){
  console.log("Server initiated in port 3000");
});

//API key mailchimp
//fe114bbbe6537a0e09ef5316f35bf83f-us2

//list id
//6a77cb5b38
