const exp = require("express");
const userApp = exp.Router();
const User = require("../Models/userModel");

userApp.get("/test", async (req, res) => {
  const result = await User.find();
  res.send({ message: "users", payload: result });
});

userApp.post("/webhooks/clerk", async (req, res) => {
  const event = req.body;

  if (event.type === "user.created") {
    const data = event.data;


    const newUser = {
      clerkId: data.id,
      username: data.username,
      fullName: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0]?.email_address || "",
      profilePictureUrl: data.profile_image_url,
      phoneNumber: data.phone_numbers[0]?.phone_number || "",
      lastLogin: new Date(data.last_sign_in_at),
      twoFactorEnabled: data.two_factor_enabled || false,
    };

    await User.create(newUser);
    console.log('user Created');
    
    return res.status(200).send("User synced");
  }
  else if(event.type==="session.created"){
    const data=event.data;
    const Result= await User.findOne({"clerkId":data.user_id})
    Result.lastLogin=new Date(data.last_active_at)
    Result.isActive=true
    await Result.save()
        console.log(Result)



  }

  res.status(200).send("Event ignored");
});

module.exports = userApp;
