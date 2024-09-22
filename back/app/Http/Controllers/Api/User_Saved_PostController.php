<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User_Saved_Post;
use App\Http\Resources\User_Saved_PostResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class User_Saved_PostController extends Controller
{
    public function index(){
        $User_Saved_Posts=User_Saved_Post::get();
        if($User_Saved_Posts->count() > 0)
        {
            return User_Saved_PostResource::collection($User_Saved_Posts);
        }
        else{
            return response()->json(['message'=>'no record in database'],200);
        }
    }
    public function store(Request $request){
        $validator=Validator::make( $request->all(),[
            
                 'user_id'=>'required',
                 //'post_id'=>'required',
        ]);
        if( $validator->fails())
         {
            return response()->json(['error'=>$validator->message()],422);
         }
       
        $User_Saved_Post=User_Saved_Post::create([
           
            'user_id'=>$request->user_id,
           // 'post_id'=>$request->post_id,
        ]);
        return response()->json(['message'=>' record  added in database','data'=>new User_Saved_PostResource($User_Saved_Post)],200);
    }

    public function show(User_Saved_Post $User_Saved_Post){
        return new User_Saved_PostResource($User_Saved_Post);
        
    }

    public function update(Request $request,User_Saved_Post $User_Saved_Post){
        $validator=Validator::make( $request->all(),[
            
                 'user_id'=>'required',
                 //'post_id'=>'required',
       ]);
       if( $validator->fails())
        {
          return response()->json(['error'=>$validator->message()],422);
        }
   
        $User_Saved_Post->update([
          
            'user_id'=>$request->user_id,
           // 'post_id'=>$request->post_id,
        ]);
        return response()->json(['message'=>' record  updated in database','data'=>new User_Saved_PostResource($User_Saved_Post)],200);
        
    }
    public function destroy(User_Saved_Post $User_Saved_Post){
        $User_Saved_Post->delete();
        return response()->json(['message'=>' record  is deleted from database'],200);
    }
/*     class SavedPostController extends Controller
{
    public function store(User $user, Post $post)
    {
        $user->savedPosts()->attach($post->id);
        return response()->json(['message' => 'Post saved successfully.'], 201);
    }

    public function destroy(User $user, Post $post)
    {
        $user->savedPosts()->detach($post->id);
        return response()->json(['message' => 'Post unsaved successfully.']);
    }
} */
}
