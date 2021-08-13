const service = require("./login.service");

async function read(req, res, next) {
  let type;
  let key;
  let pass;
  if (req.query.email) {
    type = "email";
    key = req.query.email;
    pass = req.query.pass;
  } else if (req.query.fb_login_id) {
    type = "fb_login_id";
    key = req.query.fb_login_id;
  } else if (req.query.google) {
    type = "google";
    key = req.query.google;
  }

  console.log(type, key, pass, "controller");
  const user_id = await service.read(type, key, pass);
  console.log(type, key);
  if (user_id === "badpass") {
    console.log("invalid password")
    next({ status: 403, message: "invalid password" });
  } else if (user_id) {
    console.log("success")
    res.status(200).json({ data: {user_id: user_id} });
  } else {
    console.error("no user found")
    next({ status: 400, message: "no user found" });
  }
}

async function create(req, res, next) {
  console.log("create");
  console.log(req.body.data);
  const { first_name, last_name, email, password, theme_id, id } =
    req.body.data;
  console.log(first_name, last_name, email, password, theme_id);
  const newLogin = await service.createUserLogin(email, password, id);
  console.log(newLogin);
  const user_id = newLogin[0].user_id;
  const newUserPreferences = await service.addUserPreferences(
    user_id,
    theme_id
  );
  const newUserProfile = await service.createUserProfile(
    user_id,
    first_name,
    last_name
  );

  if (newLogin && newUserPreferences && newUserProfile) {
    res.status(201).json({
      data: {
        login: newLogin[0],
        preferences: newUserPreferences[0],
        profile: newUserProfile[0],
      },
    });
  } else {
    next({
      status: "400",
      message:
        "there was a problem when trying to add your information to the database",
    });
  }
}

module.exports = {
  read,
  create,
};
