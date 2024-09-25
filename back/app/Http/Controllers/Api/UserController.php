<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(){
        $Users=User::get();
        if($Users->count() > 0)
        {
            return UserResource::collection($Users);
        }
        else{
            return response()->json(['message'=>'no record in database'],200);
        }
    }
    public function store(Request $request){
        $validator=Validator::make( $request->all(),[
                'name'=>'required|string|min:3|max:10',
                 'email'=>'required|email|min:8',
                 'password'=>'required|string|min:5',
                 'role'=>'required|string',
                 'date_of_birth'=>'date',
                 'gender'=>'nullable|string|in:male,female'
        ]);
        if( $validator->fails())
         {
            return response()->json(['error'=>$validator->errors()],422);
         }
       
        $User=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password,
            'role'=>$request->role,
            'date_of_birth'=>$request->date_of_birth,
            'gender'=>$request->gender,
        ]);
        return response()->json(['message'=>' record  added in database','data'=>new UserResource($User)],200);
    }

    public function show(User $User){
        $User->load('recipes_saves');
        $response = [
            'id' => $User->id,
            'name' => $User->name,
            'email' => $User->email,
            'role' => $User->role,
            'date_of_birth' => $User->date_of_birth,
            'gender' => $User->gender,
            'saved_recipes' => $User->recipes_saves, 
        ];
    
        return response()->json($response, 200);
        
    }

    public function update(Request $request,User $User){
        $validator=Validator::make( $request->all(),[
            'name'=>'required|string|min:3|max:10',
             'email'=>'required|email|min:8',
             'password'=>'required|string|min:5',
             'role'=>'required|string',
             'date_of_birth'=>'date',
             'gender'=>'nullable|string|in:male,female'
       ]);
       if( $validator->fails())
        {
          return response()->json(['error'=>$validator->errors()],422);
        }
   
        $User->update([
          'name'=>$request->name,
          'email'=>$request->email,
          'password'=>$request->password,
          'role'=>$request->role,
          'date_of_birth'=>$request->date_of_birth,
          'gender'=>$request->gender,
        ]);
        return response()->json(['message'=>' record  updated in database','data'=>new UserResource($User)],200);
        
    }
    public function destroy(User $User){
        $User->delete();
        return response()->json(['message'=>' record  is deleted from database'],200);
    }

    //see saved recipes
    public function getSavedRecipes(Request $request)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
    ]);

    $user = User::find($request->user_id);
    $savedRecipes = $user->savedRecipes();

    return response()->json($savedRecipes, 200);
}
}
