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
         Post.publishCreate({
           id: post.id,
           title: post.title,
           description: post.description
         });
         res.redirect('posts');
       }
     } );

   },
   show: function(req,res){

   },
   edit: function(req,res){
    console.log("edit:"+req.params['id']);
    Post.findOne(req.params['id']).done(function(err,post){
      if(err){
        return console.log(err);
      }else{
        return res.view('posts/edit',{post: post});
      }
    });
  },
  update: function(req,res){
   console.log("update:"+req.param('id'));
   post = Post.findOne(req.param('id')).done(function(err,post){
    if(err){
      return console.log(err);
    }else{
      post.title = req.param('title');
      post.description = req.param('description');
      post.save(function(err,post){
        if(err){
          return console.log(err);
        }else{
          Post.publishUpdate( post.id, {
            title: post.title,
            description: post.description
          });
          res.redirect('posts');
        }
      });

    }
  });

 },
 destroy: function(req,res){
   console.log("delete:"+req.param('id'));
   Post.findOne(req.param('id')).done(function(err,post){
    if(err){
      return console.log(err);
    }else{
     post.destroy(function(err){
      if(err){

      }else{
        Post.publishDestroy(post.id);
        res.redirect('posts');
      }
    });
   }
 });
 },
 index: function(req,res){
  console.log("index");
  posts = Post.find({sort: 'title'}, function(err, posts) {
   return res.view('posts/index',{ posts: posts});
 });

},
binding: function(req,res){

 Post.find().exec(function (err, posts) {
  Post.subscribe(req.socket);
  Post.subscribe(req.socket, posts);
});
}


};
