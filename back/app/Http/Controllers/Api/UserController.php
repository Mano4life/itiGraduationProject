<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Notifications\TwoFactorCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users, 200);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|min:8',
            'password' => 'required|string|min:5',
        ]);
        $User = User::where('email', $request->email)->first();
        if (!$User || !Hash::check($request->password,  $User->password)) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }
        if ($User->code !== NULL) {
            return response()->json(['message' => 'Please verify your code'], 401);
        }

        $token = $User->createToken('auth_token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $User], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:3|max:10',
            'email' => 'required|email|unique:users,email|min:8',
            'password' => 'required|string|min:5',
            'role' => 'required|string',
            'date_of_birth' => 'date',
            'gender' => 'nullable|string|in:male,female'
        ]);
        $User = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
        ]);

        $User->generateCode();
        $User->notify(new TwoFactorCode());

        if ($User) {
            $token = $User->createToken('auth_token')->plainTextToken;
            return response()->json(['message' => 'User Created Successfully and OTP generated', 'token' => $token], 201);
        } else {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }
    }

    public function logout(Request $request)
    {
        $user = User::where('id', $request->user()->id)->first();
        if ($user) {
            $user->tokens()->delete();
            return response()->json(['message' => 'User logged out successfully'], 200);
        } else {
            return response()->json(['message' => 'not found'], 401);
        }
    }

    //get user by token and get saved recipe with it
    public function user(Request $request)
    {
        $user = $request->user();
        $user->load('recipes_saves', 'recipes', 'recipes_ratings');

        $userData = $user->toArray();

        $userData['ratings'] = $user->recipes_ratings->map(function ($rating) {
            return [
                'rating' => $rating->pivot->rating,
                'recipe_id' => $rating->id,
            ];
        });

        return response()->json($userData, 200);
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


    // public function destroy(Request $request)
    // {
    //     $user = $request->user(); // Get the authenticated user
    //     $user->delete();
    //     return response()->json(['message' => ' record  is deleted from database'], 200);
    // }

    public function destroy(User $user){
        $user->delete();
        return response()->json(['message' => 'deleted succesfully'], 200);
    }
}
