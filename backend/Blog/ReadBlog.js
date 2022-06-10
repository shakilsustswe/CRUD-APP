const dbConnection = require("./../database/dbConnection");
exports.readBlog = async(req,res)=>{
    let query = "SELECT blogs.ID as blog_id, users.ID as user_id,users.Name,users.UserName,blogs.title,blogs.description  FROM users INNER JOIN blogs ON users.ID = blogs.userID";
   
    
    dbConnection.query(query,(err,results)=>{
        if(!err){
          return res.status(200).json(results)
        }
        else{
          return res.status(500).json(err)
        }
      })
}