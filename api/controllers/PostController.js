/**
 * PostController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostController)
   */
   _config: {},
   new: function(req,res){
   	console.log('New action called');
   	return res.view('posts/new',{
   		posts: [{title: 'Title of the post'}]
   	});

   },
   create: function(req,res){
   	console.log('Create action called'+req.param('title') );
   	Post.create({
   		title: req.param('title'),
   		description: req.param('description')
   	}).done(function(err, post){
   		if (err) {
   			return console.log(err);

         }else {
           console.log("Post created:", post);
           posts = Post.find({}, function(err, posts) {
            console.log("create title:"+posts[0].title);
            Post.publishCreate({
               id: post.id,
               title: post.title,
               description: post.description
            });
            return res.view('posts/index',{ posts: posts});
         });
        }
     } );

   },
   show: function(req,res){

   },
   edit: function(req,res){

   },
   update: function(req,res){

   },
   destroy: function(req,res){

   },
   index: function(req,res){
   	console.log("index");
   	posts = Post.find({}, function(err, posts) {
   		console.log("TITLE:"+posts[0].title);
   		return res.view('posts/index',{ posts: posts});
   	});
   	
   },
   binding: function(req,res){
     
     Post.find().exec(function (err, posts) {
      Post.subscribe(req.socket);
      // Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
      Post.subscribe(req.socket, posts);
   });
  }


};
