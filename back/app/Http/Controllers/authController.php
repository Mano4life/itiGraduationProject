<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class authController extends Controller
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
}
