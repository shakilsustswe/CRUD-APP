const dbConnection = require("./../database/dbConnection");
exports.deleteBlog = async(req,res)=>{
    const id = req.params.id;
    const user = req.user;

    
    let query1 = "select * from blogs where blogs.ID = ?"
    dbConnection.query(query1,[id],(err,results)=>{
      
      if(results[0] && results[0].userId === user.userId ){
        let query2 = "delete from blogs WHERE ID = ?";
      dbConnection.query(query2,[id],(err,results)=>{
          if(!err){
              if(results.affectedRows === 0){
                  return res.status(404).json({message:"Blog does not exist---(=="})
              }
            return res.status(200).json({message:"Blog deleted successfully......(^ ^)"})
          }
          else{
            return res.status(500).json(err)
          }
        })
      }
      else{
        return res.status(400).json(err)
      }
    })
}