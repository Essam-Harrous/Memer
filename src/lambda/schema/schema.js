const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cloudinary = require('cloudinary').v2;
const gravatar = require('gravatar');
const mongoose = require('mongoose');

const Meme = require('../models/meme');
const Ad = require('../models/ad');
const Comment = require('../models/comment');
const User = require('../models/user');
const Notification = require('../models/notification');
const Template = require('../models/template');

//successType schema
const SuccessType = new GraphQLObjectType({
  name: 'Success',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

//Meme schema
const MemeType = new GraphQLObjectType({
  name: 'Meme',
  fields: () => ({
    id: { type: GraphQLID },
    memeUrl: { type: GraphQLString },
    template: {
      type: TemplateType,
      resolve(parent) {
        return Template.findById(parent.templateId);
      },
    },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    content: {
      type: GraphQLString,
    },
    peopleLikes: {
      type: new GraphQLList(GraphQLID),
    },
    peopleDisLikes: {
      type: new GraphQLList(GraphQLID),
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent) {
        return Comment.find({ memeId: parent.id });
      },
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

//User Schema
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    role: {
      type: GraphQLInt,
    },
    token: {
      type: GraphQLString,
    },
    avatar: {
      type: GraphQLString,
    },
  }),
});

//Comment Schema
const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    meme: {
      type: MemeType,
      resolve(parent) {
        return Meme.findById(parent.memeId);
      },
    },
    content: { type: GraphQLString },
  }),
});

//Template Schema
const TemplateType = new GraphQLObjectType({
  name: 'Template',
  fields: () => ({
    templateUrl: { type: GraphQLString },
    id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

//Ad Schema
const AdType = new GraphQLObjectType({
  name: 'AdType',
  fields: () => ({
    header: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    link: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

//Notification Schema
const NotificationType = new GraphQLObjectType({
  name: 'NotificationType',
  fields: () => ({
    sender: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.senderId);
      },
    },
    receiver: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.receiverId);
      },
    },
    meme: {
      type: MemeType,
      resolve(parent) {
        return Meme.findById(parent.memeId);
      },
    },
    type: { type: GraphQLString },
    id: { type: GraphQLID },
  }),
});

//the root that join all the graphql schema
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, { user }) {
        if (!user || (user && user.role < 2))
          return new Error("you can't get the users data");
        return User.find({});
      },
    },
    user: {
      type: UserType,
      resolve(parent, args, { user }) {
        if (!user) return new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');
        return User.findById(user.id);
      },
    },
    lastMemes: {
      type: new GraphQLList(MemeType),
      resolve() {
        return Meme.find({}).sort({ _id: -1 });
      },
    },
    customMemes: {
      type: new GraphQLList(MemeType),
      args: { tags: { type: new GraphQLList(GraphQLString) } },
      resolve(parent, args) {
        console.log(args.tags, 'haaaaaaaaaaaaaai');
        return Meme.find({
          $or: [
            { tags: { $regex: getRegex(args.tags) } },
            { content: { $regex: getRegex(args.tags) } },
          ],
        }).sort({ _id: -1 });
      },
    },
    myMemes: {
      type: new GraphQLList(MemeType),
      resolve(parent, args, { user }) {
        try {
          if (!user)
            throw new Error('الرجاء تسجيل الدخول أو القيام بإنشاء حساب جديد');
          return Meme.find({ userId: user.id }).sort({ _id: -1 });
        } catch (err) {
          return err;
        }
      },
    },
    meme: {
      type: MemeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Meme.findById(args.id);
      },
    },
    notifications: {
      type: new GraphQLList(NotificationType),
      resolve(parent, args, { user }) {
        if (!user) return new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');
        return Notification.find({ receiverId: user.id });
      },
    },
    ads: {
      type: new GraphQLList(AdType),
      resolve() {
        return Ad.find({});
      },
    },
    templates: {
      type: new GraphQLList(TemplateType),
      resolve() {
        return Template.find({}).sort({ _id: -1 });
      },
    },
    template: {
      type: TemplateType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Template.findById(args.id);
      },
    },
    logIn: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        //check if userData has a value
        console.log(context.user);
        if (context.user) {
          return context.user;
        }

        //check if the username or the email is correct
        const user = await User.findOne({
          $or: [{ username: args.username }, { email: args.email }],
        });
        if (!user) throw new Error('الرجاء إدخال بيانات صحيحة');

        //check if the password is correct
        const isPassword = await bcrypt.compare(args.password, user.password);
        if (!isPassword) throw new Error('الرجاء إدخال بيانات صحيحة');

        //generate a token for this user
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          },
          process.env.TOKEN_SECRET_VALUE,
          { expiresIn: '2h' }
        );

        //return an object that hold the use data
        return {
          token,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          role: user.role,
          id: user.id,
          avatar: user.avatar,
        };
      },
    },
    fetchTags: {
      type: MemeType,
      async resolve(parent, args, context) {
        console.log('hi');
        const res = await Meme.aggregate([
          { $unwind: '$tags' },
          { $project: { tags: 1, _id: 0 } },
          {
            $group: {
              _id: null,
              tags: { $addToSet: '$tags' },
            },
          },
        ]).limit(10);
        console.log(res);
        return res[0];
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUp: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        //check if the userneam or the email has been used
        const isUserUsed = await User.exists({ username: args.username });
        const isEmailUsed = await User.exists({ email: args.email });
        if (isUserUsed) throw new Error(`هذا الإسم ${args.username} غير متوفر`);
        else if (isEmailUsed)
          throw new Error(`هذا البريد ${args.email} مستخدم مسبقا`);

        //hash the use password via bcrypt library
        const password = await bcrypt.hash(args.password, 12);

        //create the avatar
        const avatar = gravatar.url(args.email, { s: '50' }, true);

        //creating a new User
        const newUser = await User.create({
          ...args,
          password,
          role: 0,
          avatar,
        });

        //generate a token for this user
        const token = jwt.sign(
          {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            avatar: newUser.avatar,
          },
          process.env.TOKEN_SECRET_VALUE,
          { expiresIn: '2h' }
        );

        //return an object that hold the use data
        return {
          token,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          id: newUser.id,
          role: newUser.role,
          avatar: newUser.avatar,
        };
      },
    },
    addMeme: {
      type: MemeType,
      args: {
        memeUrl: { type: GraphQLString },
        content: { type: GraphQLString },
        templateUrl: { type: GraphQLString },
        templateId: { type: GraphQLID },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args, { user }) {
        try {
          console.log('inside an addMeme resolver');
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //check if the meme has a templateId or not
          let templateId;
          if (!args.templateId) {
            //upload the template to the cloudinary
            const cloudinaryRes = await Cloudinary.uploader.upload(
              args.templateUrl,
              {
                folder: 'templates',
              }
            );
            //create a new template
            templateId = await Template.create({
              templateUrl: cloudinaryRes.secure_url,
              tags: args.tags,
              userId: user.id,
            }).id;
          } else templateId = args.templateId;

          //upload the template to the cloudinary
          const cloudinaryMemeRes = await Cloudinary.uploader.upload(
            args.memeUrl,
            {
              folder: 'memes',
              transformation: { quality: auto },
            }
          );

          //create a new meme
          return Meme.create({
            ...args,
            userId: user.id,
            templateId,
            memeUrl: cloudinaryMemeRes.secure_url,
          });
        } catch (err) {
          return err;
        }
      },
    },
    deleteMeme: {
      type: SuccessType,
      args: { memeId: { type: GraphQLID } },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //check if this meme is for that user
          const meme = await Meme.findById(args.memeId);
          if (meme.userId != user.id && user.role != 2) {
            throw new Error("you can't delete this Meme");
          }

          //delete the Meme
          const deletedMeme = await meme.remove();
          return {
            success: true,
            message: `you deleted the meme successfully`,
          };
        } catch (e) {
          return e;
        }
      },
    },
    deleteMemes: {
      type: SuccessType,
      args: {
        memeIds: { type: new GraphQLList(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token and admin
          if (!user || (user && user.role < 2)) {
            throw new Error("you can't delete these Memes");
          }

          //fidn and delete the Memes
          await Meme.deleteMany({
            _id: { $in: args.memeIds },
          });
          return {
            success: true,
            message: `you deleted ${args.memeIds.length} successfully`,
          };
        } catch (e) {
          return e;
        }
      },
    },
    updateMeme: {
      type: MemeType,
      args: {
        memeId: { type: GraphQLID },
        content: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //check if this meme is for that user
          const meme = await Meme.findById(args.memeId);
          if (meme.userId != user.id && user.role != 2) {
            throw new Error("you can't delete this Meme");
          }

          //update the Meme
          const updatedMeme = await Meme.findByIdAndUpdate(meme.id, {
            content: args.content,
            tags: args.tags,
          });

          //return the updated object
          return updatedMeme;
        } catch (e) {
          return e;
        }
      },
    },
    addTemplate: {
      type: TemplateType,
      args: {
        tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        templateData: { type: GraphQLString },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //upload the template image to cloudinary
          const cloudinaryRes = await Cloudinary.uploader.upload(
            args.templateData,
            {
              folder: 'templates',
              transformation: { quality: auto },
            }
          );
          console.log(cloudinaryRes);

          //create a new template
          return Template.create({
            tags: args.tags,
            userId: user.id,
            templateUrl: cloudinaryRes.secure_url,
          });
        } catch (err) {
          return err;
        }
      },
    },
    deleteTemplate: {
      type: TemplateType,
      args: { templateId: { type: GraphQLID } },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //check if this template is for that user
          const template = await Template.findById(args.templateId);
          if (template.userId != user.id && user.role != 2) {
            throw new Error("you can't delete this template");
          }

          //delete the template
          const deletedtemplate = await template.remove();

          return deletedtemplate;
        } catch (e) {
          return e;
        }
      },
    },
    deleteTemplates: {
      type: SuccessType,
      args: {
        templateIds: { type: new GraphQLList(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user is admin and has a valid token
          if (!user || (user && user.role < 2)) {
            throw new Error("you can't delete these Memes");
          }

          //fidn and delete the Templates
          await Template.deleteMany({
            _id: { $in: args.templateIds },
          });
          return {
            success: true,
            message: `you deleted ${args.templateIds.length} successfully`,
          };
        } catch (e) {
          return e;
        }
      },
    },
    addComment: {
      type: CommentType,
      args: {
        memeId: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        receiverId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //create a notification
          Notification.create({
            senderId: user.id,
            receiverId: args.receiverId,
            memeId: args.memeId,
            type: 'comment',
          });

          //create a new Comment
          const newComment = await Comment.create({
            memeId: args.memeId,
            userId: user.id,
            content: args.content,
          });

          //push the comment into the Meme
          Meme.findByIdAndUpdate(args.memeId, {
            $push: { comments: newComment.id },
          });

          return newComment;
        } catch (err) {
          return err;
        }
      },
    },
    deleteComment: {
      type: SuccessType,
      args: {
        memeId: { type: new GraphQLNonNull(GraphQLID) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //check if this comment is for that user
          const comment = await Comment.findById(args.commentId);
          if (comment.userId != user.id && user.role != 2) {
            throw new Error("you can't delete this Comment");
          }

          //remove the comment from the meme
          await Meme.findByIdAndUpdate(args.memeId, {
            $pull: { comments: args.commentId },
          });

          //remove the Comment from comments Schema
          const deletedComment = await comment.remove();
          return {
            success: true,
            message: `you deleted the comment ${deletedComment.content}`,
          };
        } catch (e) {
          return e;
        }
      },
    },
    deleteUser: {
      type: SuccessType,
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          //delete the Meme
          await User.findByIdAndDelete(user.id);
          return {
            success: true,
            message: `you deleted the meme successfully`,
          };
        } catch (e) {
          return e;
        }
      },
    },
    deleteUsers: {
      type: SuccessType,
      args: {
        userIds: { type: new GraphQLList(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token and admin
          if (!user || (user && user.role < 2)) {
            throw new Error("you can't delete these Users");
          }

          //fidn and delete the Users
          await User.deleteMany({
            _id: { $in: args.userIds },
          });
          return {
            success: true,
            message: `you deleted ${args.userIds.length} successfully`,
          };
        } catch (e) {
          return e;
        }
      },
    },
    addLike: {
      type: MemeType,
      args: {
        memeId: { type: new GraphQLNonNull(GraphQLID) },
        receiverId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');
          console.log('inside addLike');

          const hasLikedBefore = await Notification.exists({
            memeId: args.memeId,
            senderId: user.id,
            type: 'like',
          });

          if (hasLikedBefore) throw new Error('you already Liked it before');

          await Notification.create({
            senderId: user.id,
            receiverId: args.receiverId,
            memeId: args.memeId,
            type: 'like',
          });

          //find the meme by id and update the likes
          return Meme.findByIdAndUpdate(args.memeId, {
            $push: { peopleLikes: user.id },
          });
        } catch (err) {
          return err;
        }
      },
    },
    removeLike: {
      type: MemeType,
      args: {
        memeId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          const hasLikedBefore = await Notification.exists({
            memeId: args.memeId,
            senderId: user.id,
            type: 'like',
          });

          if (!hasLikedBefore) throw new Error('you did not Liked it before');

          await Notification.findOneAndDelete({
            memeId: args.memeId,
            senderId: user.id,
            type: 'like',
          });

          //find the meme by id and update the likes
          return Meme.findByIdAndUpdate(args.memeId, {
            $pull: { peopleLikes: user.id },
          });
        } catch (err) {
          return err;
        }
      },
    },
    addDisLike: {
      type: MemeType,
      args: {
        memeId: { type: new GraphQLNonNull(GraphQLID) },
        receiverId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          console.log('inside disLike');
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          const hasDisLikedBefore = await Notification.exists({
            memeId: args.memeId,
            senderId: user.id,
            type: 'disLike',
          });

          if (hasDisLikedBefore)
            throw new Error('you already disLiked it before');

          await Notification.create({
            senderId: user.id,
            receiverId: args.receiverId,
            memeId: args.memeId,
            type: 'disLike',
          });

          //find the meme by id and update the likes
          return Meme.findByIdAndUpdate(args.memeId, {
            $push: { peopleDisLikes: user.id },
          });
        } catch (err) {
          return err;
        }
      },
    },
    removeDisLike: {
      type: MemeType,
      args: {
        memeId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { user }) {
        try {
          //check if the user has a valid token
          if (!user) throw new Error('الرجاء تسجيل الدخول أو إنشاء حساب جديد');

          const hasdisLikedBefore = await Notification.exists({
            memeId: args.memeId,
            senderId: user.id,
            type: 'disLike',
          });

          console.log(hasdisLikedBefore);

          if (!hasdisLikedBefore)
            throw new Error('you did not disLiked it before');

          await Notification.findOneAndDelete({
            memeId: args.memeId,
            senderId: user.id,
            type: 'disLike',
          });

          //find the meme by id and update the likes
          return Meme.findByIdAndUpdate(args.memeId, {
            $pull: { peopleDisLikes: user.id },
          });
        } catch (err) {
          return err;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

const getRegex = (arr) => {
  let regexValue = ``;
  arr.map((elm, i) => {
    if (i < arr.length - 1) regexValue += `.*${elm}.*|`;
    else regexValue += `.*${elm}.*`;
  });
  return regexValue;
};
