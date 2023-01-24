var db = require("../config/connection");
var collection = require("../config/collections");
const { ObjectId } = require("mongodb");
const { response } = require("express");
const bcrypt = require("bcrypt");

module.exports = {
  /*Upload Image */
  uploadImage: (image) => {
    return new Promise(async (resolve, reject) => {
      let imageArray = [];
      image.forEach((element) => {
        imageArray.push(element.filename);
      });
      await db
        .get()
        .collection(collection.IMAGE_UPLOAD)
        .insertOne({ image: imageArray })
        // .toArray();
        // console.log("-------",img);
        .then((response) => {
          resolve(response);
        });

      console.log(imageArray);
    });
  },

  /*Retrieve All Images */
  retrieveImage: () => {
    return new Promise(async (resolve, reject) => {
      let count = await db.get().collection(collection.IMAGE_UPLOAD).count();
      if (count > 0) {
        let images = await db
          .get()
          .collection(collection.IMAGE_UPLOAD)
          .aggregate([
            {
              $unwind: {
                path: "$image",
              },
            },
            {
              $group: {
                _id: null,
                image: {
                  $push: "$image",
                },
              },
            },
          ])
          .toArray();
        console.log(images[0].image);
        resolve(images[0].image);
      } else {
        resolve((images = null));
      }
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      //let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.userName });
      console.log(user);
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            response.user = user;
            response.noUser = false;
            response.status=status
            resolve(response);
          } else {
            resolve({status:false});
          }
        });
      } else {
        resolve({ noUser: true });
      }
    });
  },
  addUsers: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data);
        });
    });
  },
};
