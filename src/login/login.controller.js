const service = require("./login.service");

async function read(req, res, next) {
  let type;
  let key;
  if (req.query.email) {
    type = "email";
    key = req.query.email;
  } else {
    type = "facebook";
    key = req.query.facebook;
  }
  userExists = await service.read(type, key);

  if (userExists) {
    res.status(200).json({ data: userExists });
  } else {
    switch (type) {
      case "email":
        next({ status: 400, message: "This email account is not signed up with Motive Motor." });
        break;
      case "fb_login_id":
        next({status:400, message: "This facebook account is not signed up with Motive Motor."});
    }
  }
}

async function create(req, res, next) {
  console.log(req.body);
  const { first_name, last_name, email, password, theme_id } = req.body.data;
  const newLogin = await service.createUserLogin(email, password);
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
  res.status(201).json({
    data: {
      login: newLogin,
      preferences: newUserPreferences,
      profile: newUserProfile,
    },
  });
}

module.exports = {
  read,
  create,
};
