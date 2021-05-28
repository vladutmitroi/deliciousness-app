const functions = require("firebase-functions");
const admin = require("firebase-admin");
//admin is an SDK used to interact with multiple firebase services - auth, firestore etc
//initializing app with admin
admin.initializeApp(functions.config().firebase);

// every cloud function is defined under 'exports' keyword

const createNotification = (notification) => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then((doc) => console.log("notification added", doc));
};

exports.recipeCreate = functions.firestore
  .document("recipes/{recipeId}")
  .onCreate((doc) => {
    const recipe = doc.data();
    const notification = {
      content: `added a new recipe - ${recipe.title}`,
      user: recipe.author,
      time: admin.firestore.FieldValue.serverTimestamp(),
      notificationType: "recipe",
    };

    return createNotification(notification);
  });

exports.recipeDelete = functions.firestore
  .document("recipes/{recipeId}")
  .onDelete((doc) => {
    const recipe = doc.data();
    const notification = {
      content: `deleted recipe ${recipe.title}`,
      user: recipe.author,
      time: admin.firestore.FieldValue.serverTimestamp(),
      notificationType: "recipe",
    };

    return createNotification(notification);
  });

exports.userJoined = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      const newUser = doc.data();
      const notification = {
        content: "joined deliciousness",
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
        notificationType: "user",
      };

      return createNotification(notification);
    });
});
