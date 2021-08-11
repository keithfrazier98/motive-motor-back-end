const service = require("./login.service");

async function read(req, res, next) {
  let type;
  let key;
  if (req.query.email) {
    type = "email";
    key = req.query.email;
  } else {
    type = "fb_login_id";
    key = req.query.fb_login_id;
  }
  userExists = await service.read(type, key);
  console.log(type, key);
  if (userExists) {
    res.status(200).json({ data: userExists });
  } else {
    switch (type) {
      case "email":
        next({
          status: 400,
          message: "This email account is not signed up with Motive Motor.",
        });
        break;
      case "fb_login_id":
        next({
          status: 400,
          message: "This facebook account is not signed up with Motive Motor.",
        });
    }
  }
}

async function create(req, res, next) {
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
      login: newLogin[0],
      preferences: newUserPreferences[0],
      profile: newUserProfile[0],
    },
  });
}

module.exports = {
  read,
  create,
};
