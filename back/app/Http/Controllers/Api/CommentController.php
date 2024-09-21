<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Http\Resources\CommentResource;
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
    public function store(Request $request){
        $validator=Validator::make( $request->all(),[
                'content'=>'required|string|min:5',
                 'user_id'=>'required',
                 //'post_id'=>'required',
        ]);
        if( $validator->fails())
         {
            return response()->json(['error'=>$validator->message()],422);
         }
       
        $Comment=Comment::create([
            'content'=>$request->content,
            'user_id'=>$request->user_id,
           // 'post_id'=>$request->post_id,
        ]);
        return response()->json(['message'=>' record  added in database','data'=>new CommentResource($Comment)],200);
    }

    public function show(Comment $Comment){
        return new CommentResource($Comment);
        
    }

    public function update(Request $request,Comment $Comment){
        $validator=Validator::make( $request->all(),[
            'content'=>'required|string|min:5',
                 'user_id'=>'required',
                 //'post_id'=>'required',
       ]);
       if( $validator->fails())
        {
          return response()->json(['error'=>$validator->message()],422);
        }
   
        $Comment->update([
          'content'=>$request->content,
            'user_id'=>$request->user_id,
           // 'post_id'=>$request->post_id,
        ]);
        return response()->json(['message'=>' record  updated in database','data'=>new CommentResource($Comment)],200);
        
    }
    public function destroy(Comment $Comment){
        $Comment->delete();
        return response()->json(['message'=>' record  is deleted from database'],200);
    }
}
