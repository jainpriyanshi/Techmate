const express = require("express");
const router =  express.Router();
const Validator = require("validator");
const isEmpty = require("is-empty");
const Post = require ("../models/Post");
const Member = require ("../models/Member");
const auth = require('../middleware/auth');

const ValidateDoubt = function validateDoubt(data) {
    let errors = {};
    data.doubt = !isEmpty(data.doubt) ? data.doubt : "";
    data.category = !isEmpty(data.category) ? data.category : "";
  
    if (Validator.isEmpty(data.doubt)) {
      errors.doubt = "Post can't be empty";
    } 


    if (Validator.isEmpty(data.category)) {
      errors.category = "Select a category";
    }  

    if (Validator.isEmpty(data.code)) {
      errors.code = "Select a code";
    } 
    
    else{
      
      const arr=["Competitive Programming", "Web Development", "App Development", "Game Development", "Blockchain", "Artifical Intelligence", "Cloud Comuting", "Image Processing", "Other"];
      var correct = arr.includes(data.category);
      
      if(!correct) 
        errors.category = "Select a Valid Category";
    }
    
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  const ValidateComment = function ValidateComment(data) {
    let errors = {};
    data.comment = !isEmpty(data.comment) ? data.comment : "";
    
    if (Validator.isEmpty(data.comment)) {
      errors.comment = "Please enter a reply";
    } 

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };


router.get('/', auth, async(req, res)=>{
  try {
    const forum =await Post.find({}).sort({"date":"desc"});
    
    res.json(forum);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
  
});



router.get('/showpost/:id', auth, async(req, res)=>{
  try {
    
    const post =await Post.findById(req.params.id);
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) 
      return res.status(404).json({ notfound: 'Post not found' });
    res.json(post)
  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }});

  router.get('/userpost', auth, async(req, res)=>{
    try {
      const post =await Post.find( {member:  req.user.id});
      if(!post)  return res.status(404).json({notfound: 'Post not found'})
      res.json(post)
    } catch (error) {
      console.error(error.message);
      res.status(500).send({servererror:'Server Error'});
    }});



  router.post('/category', auth, async(req, res)=>{
    try {
      console.log(req.body.category);
      const posts= await Post.find({category: req.body.category});
      res.json(posts)  
    } catch (error) {
      console.error(error.message);
      res.status(500).send({servererror:'Server Error'});
    }
  });




router.post('/', auth, async(req,res) =>{
    console.log(req.body);
    if(typeof req.body.description === undefined  )
    return res.status(400).json({description:"Description is needed"});
    const { errors, isValid } = ValidateDoubt(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }


    try {
      const user = await Member.findById(req.user.id);

      const newPost = new Post({
        member: req.user.id,
        doubt: req.body.doubt,
        category: req.body.category,
        name: user.name,
        date: new Date(),
        description: req.body.description,
        code: req.body.code,
        
      });

      const post=await newPost.save();
       
      res.json(post);

    } catch (error) {
      console.error(error.message);
      res.status(500).send({servererror:'Server Error'});
    }
});


router.delete('/deletepost/:id', auth, async(req, res)=>{
  try {
    console.log(req.params.id)
     const post =await Post.findById(req.params.id);
     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) 
      return res.status(404).json({ notfound: 'Post not found' });
     post.remove();
     const forum =await Post.find({}).sort({"date":"desc"});
      res.json(forum);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }});






router.post('/like/:id', auth, async(req,res) =>{  
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
          {
            return res.status(404).json({ notfound: 'Post not found' })
          }

      post.likes = post.likes+1;

      liked=await post.save();
      res.json(liked);
      

    } catch (error) {
      console.error(error.message);
      res.status(500).send({servererror:'Server Error'});
    }
});


router.post('/likeforum/:id', auth, async(req,res) =>{  
  try {
      const post = await Post.findById(req.params.id);
      if(!post)
        {
          return res.status(404).json({ notfound: 'Post not found' })
        }

    post.likes = post.likes+1;

    await post.save();
    const forum =await Post.find({});

    res.json(forum);
    

  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
});


router.post('/comment/:id', auth, async(req,res) =>{  
  try {
      const user = await Member.findById(req.user.id);
      const post = await Post.findById(req.params.id);
      if(!post)
        {
          return res.status(404).json({ notfound: 'Post not found' })
        }

      const { errors, isValid } =await ValidateComment(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }

        post.n_comments = post.n_comments+1;
      const newComment ={
        user: req.user.id,
        comment: req.body.comment,
        name: user.name,
        tagUserName: post.name,
        tagUserId: post.member,
        date: new Date()
      }
      
      post.comments.unshift(newComment);

      const commented= await post.save();
      res.json(commented);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
});


router.post('/replycomment/:id/:cid', auth, async(req,res) =>{  
  try {
      const post = await Post.findById(req.params.id);
      const user = await Member.findById(req.user.id);

      if(!post)
        {
          return res.status(404).json({ notfound: 'Post not found' })
        }
      
        const target = post.comments.find( comment => comment.id === req.params.cid);
        if(!target){
          return res.status(404).json({ error: 'Comment does not exist' });
        }

      const { errors, isValid } =await ValidateComment(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }

        post.n_comments = post.n_comments+1; 
        const newComment ={
          user: req.user.id,
          comment: req.body.comment,
          name: user.name, 
          tagUserName: target.name,
          tagUserId: target.user,
          date: new Date()
        }
        console.log(newComment);

      await post.comments.unshift(newComment);
      const commented= await post.save();
      res.json(commented);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
});

router.delete('/deletecomment/:id/:cid', auth, async(req,res) =>{  
  try {
      const post = await Post.findById(req.params.id);
      if(!post)
        {
          return res.status(404).json({ notfound: 'Post not found' })
        }
      
        post.comments = post.comments.filter(({id})=> id!== req.params.cid );
        post.n_comments = post.n_comments-1;
      const deletecomment= await post.save();
      res.json(deletecomment);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
});


router.post('/likecomment/:id/:cid', auth, async(req,res) =>{  
  try {
      const post = await Post.findById(req.params.id);
      if(!post)
        {
          return res.status(404).json({ notfound: 'Post not found' })
        }

        const target = post.comments.find( comment => comment.id === req.params.cid);
        if(!target){
          return res.status(404).json({ error: 'Comment does not exist' });
        }

      
        
        target.likes = target.likes+1;
      const liked= await post.save();
      res.json(liked);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
});
  
router.delete('/:id', auth, async(req,res) =>{  
  try {
      const post = await Post.findById(req.params.id);
      if(!post)
        {
          return res.status(404).json({ notfound: 'Post not found' })
        }


        if(post.member.toString()!== req.user.id)
        {
          return res.status(404).json({ auth: 'You can not delete this post' });
        }

        await post.remove();
        res.status(200).send('Sucess');
          
        
  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
});


router.post('/editpost/:id', auth, async(req,res) =>{  
  console.log(req.body.description);
  console.log(req.body.category);
  
  try {
      const post = await Post.findById(req.params.id);
      if(!post)
        {
          return res.status(404).json({ notfound: 'Post not found' })
        }
    

        if(post.member.toString()!== req.user.id)
        {
          return res.status(404).json({ auth: 'You can not edit this comment' });
        }

        if(typeof req.body.description === undefined)   
    return res.status(400).json({description:"Field can't be empty" });

    

      const { errors, isValid } =await ValidateDoubt(req.body);
        
      if (!isValid) {
          return res.status(400).json(errors);
        }

        let updated= await Post.findByIdAndUpdate(req.params.id,req.body)
      const commented= await updated.save();
      res.json(commented);
      console.log(commented);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({servererror:'Server Error'});
  }
});


module.exports = router;
