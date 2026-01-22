
const express = require('express');
const studentRouter = express.Router()
const {studentLogin} = require("../middlewares/middleware")
const {studentVerify} = require("../middlewares/verify")
const { postStudent,putSetStudent,putPullStudent, putPushStudent, deleteOneStudent,putOneStudent,getOneStudent,getAllStudent, putSetProgress } = require("../controllers/controller");
  




studentRouter.post('/verify',studentVerify)
studentRouter.post('/login',studentLogin)
studentRouter.post('/create', postStudent)
studentRouter.get('/', getAllStudent)
studentRouter.get('/:_id', getOneStudent)
studentRouter.put('/push/:id/:object', putPushStudent)
studentRouter.put('/edit/:_id/:object/:idx', putSetProgress)
studentRouter.put('/:_id', putOneStudent)
studentRouter.put('/reset/:name', putOneStudent)
studentRouter.put('/pull/:_id/:_id2/:object', putPullStudent)
studentRouter.put('/set/:_id/:object', putSetStudent)
studentRouter.delete("/:_id", deleteOneStudent)




module.exports = { studentRouter };
