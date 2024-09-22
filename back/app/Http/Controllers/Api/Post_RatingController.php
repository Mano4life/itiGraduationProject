<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post_Rating;
use App\Http\Resources\Post_RatingResource;
use Illuminate\Support\Facades\Validator;

class Post_RatingController extends Controller
{
    public function index(){
        $Post_Ratings=Post_Rating::get();
        if($Post_Ratings->count() > 0)
        {
            return Post_RatingResource::collection($Post_Ratings);
        }
        else{
            return response()->json(['message'=>'no record in database'],200);
        }
    }
    public function store(Request $request){
        $validator=Validator::make( $request->all(),[
                 'rating'=>'required',
                 'user_id'=>'required',
                 //'post_id'=>'required',
        ]);
        if( $validator->fails())
         {
            return response()->json(['error'=>$validator->message()],422);
         }
       
        $Post_Rating=Post_Rating::create([
            'rating'=>$request->rating,
            'user_id'=>$request->user_id,
           // 'post_id'=>$request->post_id,
        ]);
        return response()->json(['message'=>' record  added in database','data'=>new Post_RatingResource($Post_Rating)],200);
    }

    public function show(Post_Rating $Post_Rating){
        return new Post_RatingResource($Post_Rating);
        
    }

    public function update(Request $request,Post_Rating $Post_Rating){
        $validator=Validator::make( $request->all(),[
                 'rating'=>'required',
                 'user_id'=>'required',
                 //'post_id'=>'required',
       ]);
       if( $validator->fails())
        {
          return response()->json(['error'=>$validator->message()],422);
        }
   
        $Post_Rating->update([
            'rating'=>$request->rating,
            'user_id'=>$request->user_id,
           // 'post_id'=>$request->post_id,
        ]);
        return response()->json(['message'=>' record  updated in database','data'=>new Post_RatingResource($Post_Rating)],200);
        
    }
    public function destroy(Post_Rating $Post_Rating){
        $Post_Rating->delete();
        return response()->json(['message'=>' record  is deleted from database'],200);
    }
/*     class PostRatingController extends Controller
{
    public function store(User $user, Post $post, Request $request)
    {
        $request->validate(['rating' => 'required|integer|min:1|max:5']);
        
        $user->ratedPosts()->attach($post->id, ['rating' => $request->rating]);
        return response()->json(['message' => 'Post rated successfully.'], 201);
    }

    public function update(User $user, Post $post, Request $request)
    {
        $request->validate(['rating' => 'required|integer|min:1|max:5']);
        
        $user->ratedPosts()->updateExistingPivot($post->id, ['rating' => $request->rating]);
        return response()->json(['message' => 'Post rating updated successfully.']);
    }

    public function destroy(User $user, Post $post)
    {
        $user->ratedPosts()->detach($post->id);
        return response()->json(['message' => 'Post rating removed successfully.']);
    }
}
} */
}