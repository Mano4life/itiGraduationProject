<?php

namespace App\Http\Controllers;

use App\Models\profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(){
        $profile = profile::with('user')->latest()->get();
        return response()->json($profile, 200);
    }
    public function store()
    {
        $data = request()->validate([
            'user_id' => 'required|integer', 
            'image' => 'nullable|image|max:2048',
            'bio' => 'nullable|string|min:5', 
            'tiktok_link' => 'nullable|string|min:5',
            'instagram_link' => 'nullable|string|min:5',
            'youtube_link' => 'nullable|string|min:5',
        ]);
        if (request()->hasFile('image')) {
            $image = request()->file('image')->storeOnCloudinary('recipies');
            $url = $image->getSecurePath();
        }else if($data['image']){
            $url = $data['image'];
        }

        $result = profile::create([
            'user_id' => $data['user_id'],
            'image' => $url,
            'bio' => $data['bio'],
            'tiktok_link' => $data['tiktok_link'],
            'instagram_link' => $data['instagram_link'],
            'youtube_link' => $data['youtube_link'],

        ]);
        return response()->json($result, 200);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(profile $profile)
    {
        $profile->load(['user']);

        if(is_null($profile)){
            return response()->json(['message' => 'profile not found'], 404);
        }

        return response()->json($profile, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(profile $profile)
    {
        $data = request()->validate([
            'user_id' => 'required|integer', 
            'image' => 'nullable|image|max:2048',
            'bio' => 'nullable|string|min:5', 
            'tiktok_link' => 'nullable|string|min:5',
            'instagram_link' => 'nullable|string|min:5',
            'youtube_link' => 'nullable|string|min:5',
        ]);
        if (request()->hasFile('image')) {
            $image = request()->file('image')->storeOnCloudinary('recipies');
            $url = $image->getSecurePath();
        }else if($data['image']){
            $url = $data['image'];
        }
        $result = $profile->update([
            'user_id' => $data['user_id'],
            'image' => $url,
            'bio' => $data['bio'],
            'tiktok_link' => $data['tiktok_link'],
            'instagram_link' => $data['instagram_link'],
            'youtube_link' => $data['youtube_link'],
        ]);

        return response()->json($result,201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(profile $profile)
    {
        $profile->delete();
        return response()->json(['message'=>'deleted succesfully'], 200);
    }
}
