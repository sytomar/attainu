const db = require("../database/index")

exports.getPost = function(req, res, next) {
  let query_params = req.swagger.params;
  let page_no = query_params.page.value;
  let page_size = query_params.size.value;
  let skips = page_size * (page_no - 1);
  
  let sql ='select * from posts LIMIT '+page_size+' OFFSET '+skips+';'
  let params =[]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":rows
    })
  });
};

exports.createPost = function(req, res, next) {
  let post = req.body.post;
  let user = req.auth.sub
  let sql ='INSERT INTO posts (userId, post) VALUES (?,?)'
  let params =[user, post]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        "message": "success",
        "data": {
          "user": user,
          "post": post
        },
        "id" : this.lastID
      }));
  });
};

exports.editPost = function(req, res, next) {
  let post_id = req.swagger.params.id.value;
  let post = req.body.post;
  let user = req.auth.sub;

  let sql ='UPDATE posts SET userId = "'+user+'", post = "'+post+'" WHERE id = '+post_id;
  let params =[]
  db.run(sql,params,
    function (err, result) {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({
            message: "success",
            data: {
              "id": post_id, 
              "user": user,
              "post": post
            },
            changes: this.changes
        })
  });
};

exports.deletePost = function(req, res, next) {
  let post_id = req.swagger.params.id.value;

  let sql ='DELETE FROM posts WHERE id = '+post_id;
  let params =[]
  db.run(sql,params,
    function (err, result) {
      if (err) {
          res.status(400).json({"error": res.message})
          return;
      }
      res.json({"message":"deleted", changes: this.changes})
  });
};
