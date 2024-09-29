<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Http\Resources\CommentResource;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index(){
        $Comments=Comment::get();
        if($Comments->count() > 0)
        {
            return CommentResource::collection($Comments);
        }
        else{
            return response()->json(['message'=>'no record in database'],200);
        }
    }
    public function show(Comment $Comment){
        return new CommentResource($Comment);
        
    }
//store with user authentication
    public function store(Request $request ,Recipe $recipe)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|min:5',
            
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        $Comment = Comment::create([
            'content' => $request->content,
            'user_id' => $request->user()->id, 
            'recipe_id' => $recipe->id,
        ]);
    
        return response()->json(['message' => 'Record added to database', 'data' => new CommentResource($Comment)], 200);
    }

    
//update with user authentication
   public function update(Request $request, Comment $comment)
   {
     $validator = Validator::make($request->all(), [
        'content' => 'required|string|min:5',
        'recipe_id' => 'required|exists:recipes,id', 
     ]);

     if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 422);
      }

      $comment->update([
        'content' => $request->content,
        'recipe_id' => $request->recipe_id,
        'user_id' => $request->user()->id, 
      ]);

      return response()->json(['message' => 'Record updated in database', 'data' => new CommentResource($comment)], 200);
   }
   public function destroy(Comment $comment)
   {
       if ($comment->user_id !== request()->user()->id) {
           return response()->json(['error' => 'Unauthorized'], 403);
       }
   
       $comment->delete();
       return response()->json(['message' => 'Record is deleted from database'], 200);
   }
}
