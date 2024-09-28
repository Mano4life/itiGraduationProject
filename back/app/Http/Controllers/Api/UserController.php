<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email'=>'required|email|min:8',
            'password'=>'required|string|min:5',
        ]);
        $User=User::where('email',$request->email)->first();
        if(!$User || !Hash::check($request->password,  $User->password)){
            return response()->json(['message'=>'Invalid Credentials'],401);
            }
         $token=$User->createToken('auth_token')->plainTextToken;
         return response()->json(['token'=>$token,'user'=>$User],200);
    }
    public function register(Request $request){
        $request->validate([
                'name'=>'required|string|min:3|max:10',
                 'email'=>'required|email|unique:users,email|min:8',
                 'password'=>'required|string|min:5',
                 'role'=>'required|string',
                 'date_of_birth'=>'date',
                 'gender'=>'nullable|string|in:male,female'
                 ]);
        $User=User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'password'=>Hash::make($request->password),
                    'role'=>$request->role,
                    'date_of_birth'=>$request->date_of_birth,
                    'gender'=>$request->gender,
                ]);
                if($User){
                    $token=$User->createToken('auth_token')->plainTextToken;
                    return response()->json(['message'=>'User Created Successfully','token'=>$token],201);
                }
                else{
                    return response()->json(['message'=>'Invalid Credentials'],401);
                }
                
                
    }
    public function logout(Request $request){
        $user=User::where('id',$request->user()->id)->first();
        if($user){
            $user->tokens()->delete();
            return response()->json(['message'=>'User logged out successfully'],200);
        }
        else{
            return response()->json(['message'=>'not found'],401);
            }

        }


    public function show(User $User){
        $User->load('recipes_saves', 'recipes');
        
        return response()->json($User, 200);
        
    }
    //get user by token
    public function user(Request $request) {
        $user = $request->user();
        $user->savedRecipes = $user->recipes_saves()->get();

        return response()->json($user, 200);
    }


    public function update(Request $request)
   {
        $user = $request->user(); // Get the authenticated user

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:10',
            'date_of_birth' => 'date',
            'gender' => 'nullable|string|in:male,female',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        $user->update([
            'name' => $request->name,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
        ]);
    
        return response()->json(['message' => 'Record updated in database', 'data' => new UserResource($user)], 200);
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
