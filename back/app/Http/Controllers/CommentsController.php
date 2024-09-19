<?php

namespace App\Http\Controllers;

use App\Models\comments;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function index(){
        $Comments=comments::all();
        return $Comments;
    }
    public function upload(Request $request){
        $request->validate([
         'content'=>'required|string',
         'user_id'=>'required',
        ]);
        
         $new_comment=new comments();
         $new_comment->content =$request->content;
         $new_comment->user_id =$request->user_id;
         $new_comment->save();
         return response()->json($new_comment, 201);
        
 
 
 
     }
}
