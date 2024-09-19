<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use PhpParser\Node\Stmt\TryCatch;

class UserController extends Controller
{
    public function index(){
        $Users=User::all();
        return $Users;
    }
    public function upload(Request $request){
       $request->validate([
        'name'=>'required|string',
        'email'=>'required|unique',
        'password'=>'required|confirmed|min:4',
        'gender'=>'required|string',
        'role'=>'required|string'
       ]);
       try {
        $new_user=new User;
        $new_user->name =$request->name;
        $new_user->email =$request->email;
        $new_user->password =Hash::make($request->password);
        $new_user->gender =$request->gender;
        $new_user->role =$request->role;
        $new_user->save();
        return response();
       } catch (\Exception $e) {
        return response();
       }



    }
}
