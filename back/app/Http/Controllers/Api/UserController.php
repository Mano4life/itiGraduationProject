<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Notifications\resetPasswordToken;
use App\Notifications\TwoFactorCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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
            'name' => 'required|string|min:3',
            'email' => 'required|email|unique:users,email|min:8',
            'password' => 'required|string|min:5',
            'role' => 'required|string',
            'date_of_birth' => 'date',
            'gender' => 'nullable|string|in:male,female',
            'tiktok_link' => 'nullable|string|min:5',
            'instagram_link' => 'nullable|string|min:5',
            'youtube_link' => 'nullable|string|min:5',
            'bio'=>'nullable|string'
        ]);
        $User = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'tiktok_link' => !empty($request['tiktok_link']) ? $request['tiktok_link'] : null,
            'instagram_link' => !empty($request['instagram_link']) ? $request['instagram_link'] : null,
            'youtube_link' => !empty($request['youtube_link']) ? $request['youtube_link'] : null,
            'bio' => !empty($request['bio']) ? $request['bio'] : null
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
        $user->load('recipes_saves.category', 'recipes.category', 'recipes_ratings','pendingRecipes.category'); 

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
            'name' => 'required|string|min:3',
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
            'role' => $request->role
        ]);

        return response()->json(['message' => 'Record updated in database', 'data' => new UserResource($user)], 200);
    }

/////update links
    public function updateLinks(Request $request)
{
    $user = $request->user();
    
    
    $validator = Validator::make($request->all(), [
        'tiktok_link' => 'nullable|string|min:5',
        'instagram_link' => 'nullable|string|min:5',
        'youtube_link' => 'nullable|string|min:5',
        'bio' => 'nullable|string'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    try {
        $user->update([
            'tiktok_link' => $request['tiktok_link'] === '' ? null : $request['tiktok_link'],
            'instagram_link' => $request['instagram_link'] === '' ? null : $request['instagram_link'],
            'youtube_link' => $request['youtube_link'] === '' ? null : $request['youtube_link'],
            'bio' => $request['bio'] === '' ? null : $request['bio'],
        ]);

        return response()->json($user, 201); 
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

///public profile
public function publicView(User $user)
{
    
    $user->load(['recipes' => function ($query) {
        $query->select('id', 'name', 'image', 'user_id', 'category_id','time'); // Make sure to include the category_id
    }, 'recipes.category' => function ($query) {
        $query->select('id', 'name');
    }]);

    // Transform the recipes to include the category
    $recipesWithCategories = $user->recipes->map(function ($recipe) {
        return [
            'id' => $recipe->id,
            'name' => $recipe->name,
            'image' => $recipe->image,
            'time'=>$recipe->time,
            'category' => $recipe->category, 
            
        ];
    });

    return response()->json([
        'name' => $user->name,
        'tiktok_link' => $user->tiktok_link,
        'instagram_link' => $user->instagram_link,
        'youtube_link' => $user->youtube_link,
        'bio'=>$user->bio,
        'recipes' => $recipesWithCategories,
    ], 200);
}
    public function destroy(User $user){
        $user->delete();
        return response()->json(['message' => 'deleted succesfully'], 200);
    }
    ////update user
    public function updateUser(User $user){
        $request = request()->validate([
            'name' => 'required|string|min:3',
            'date_of_birth' => 'date',
            'gender' => 'nullable|string|in:male,female',
            'role'=> 'required|string|in:admin,user,premium',
            'email' => 'required|email|unique:users,email,' . $user->id . '|min:8',
            ]);
            $user->update($request);
            return response()->json(['message' => 'user updated succesfully'], 200);
            

    }
    //forget password
    public function forgotPassword(Request $request) {
        // Validate the email format
        $request->validate(['email' => 'required|email']);
    
        $email = $request->email;
    
        // Check if the email exists in the users table
        $userExists = User::where('email', $email)->exists();
        if (!$userExists) {
            return response()->json(['message' => 'Email does not exist.'], 404);
        }
    
        // Generate the token
        $token = rand(1000, 9999);
        
        // Create or update the password reset token
        $passwordToken = PasswordResetToken::updateOrCreate(
            ['email' => $email],
            ['token' => $token, 'created_at' => now()]
        );
        
        // send token to mail
        $passwordToken->notify(new resetPasswordToken());
        // Send the reset password email
        // Mail::to($email)->send(new ResetPasswordMail($token));
    
        return response()->json(['message' => 'Reset password link sent!']);
    }
    //VAILDATE CODE
    public function validateCode(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:password_reset_tokens,email',
        ]);
    
        $resetToken = PasswordResetToken::where('email', $request->email)->first();
        if (!$resetToken || $resetToken->token !== $request->token) {
            return response()->json(['message' => 'Invalid token.'], 400);
        }
    
        return response()->json(['message' => 'Token is valid.']);
    }
    //RESET PASSWORD
    public function resetPassword(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:password_reset_tokens,email',
            'password' => 'required|min:8',
        ]);
    
        $resetToken = PasswordResetToken::where('email', $request->email)->first();
        if (!$resetToken || $resetToken->token !== $request->token) {
            return response()->json(['message' => 'Invalid token.'], 400);
        }
    
        // Update user password
        $user = User::where('email', $request->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();
        
       
        PasswordResetToken::where('email', $request->email)->delete();
    
        return response()->json(['message' => 'Password has been reset.']);
    }
}
