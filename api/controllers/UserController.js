/**
 * UserController
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
   * (specific to UserController)
   */
   _config: {},
   new: function(req,res){
    console.log('New action called');
    return res.view({
      post: [{title: 'Title of the post'}]
    });

  },
  create: function(req,res){

  },
  show: function(req,res){

  },
  edit: function(req,res){

  },
  update: function(req,res){

  },
  destroy: function(req,res){

  },
  
};