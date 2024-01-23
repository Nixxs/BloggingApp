"use strict";
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Like = require("./like");

async function init() {
// create relationships between models
    User.hasMany(Post, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Post.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        }
    });
    User.hasMany(Comment, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Comment.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    User.hasMany(Like, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        }
    });
    Like.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Post.hasMany(Comment, {
        foreignKey: {
            name: "postId",
            allowNull: false,
        },
    });
    Comment.belongsTo(Post, {
        foreignKey: {
            name: "postId",
            allowNull: false,
        },
    });
    Post.hasMany(Like, {
        foreignKey: {
            name: "postId",
            allowNull: false,
        },
    });
    Like.belongsTo(Post, {
        foreignKey: {
            name: "postId",
            allowNull: false,
        }
    });
  // sync all models with database
  await User.sync();
  await Post.sync();
  await Comment.sync();
  await Like.sync();
}

module.exports = {
  init,
};