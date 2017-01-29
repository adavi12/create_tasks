var express = require("express");
var router = express.Router();

var pg = require("pg");

var config = { database: "tasks-to-do" };

var pool = new pg.Pool(config);


router.put('/:id', function(req, res){
  pool.connect(function(err, client, done){
    if (err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      client.query('UPDATE tasks SET completion_status=$2 WHERE id = $1 RETURNING *',
                   [req.params.id,req.body.completion_status],
                   function(err, result){
                     done();
                     if (err) {
                       console.log('Error updating task', err);
                       res.sendStatus(500);
                     } else {
                       res.send(result.rows);
                     }
                   });
    }
  });
});

module.exports = router;
