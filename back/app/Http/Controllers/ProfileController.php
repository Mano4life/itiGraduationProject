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
            'user_id' => 'required',
            'image'=>'',
            'bio'=>'',
            'tiktok_link'=>'',
            'instagram_link'=>'',
            'youtube_link'=>'',
        ]);

        $result = profile::create($data);

        return response()->json($result, 200);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(profile $profile)
    {
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
            'user_id' => 'required',
            'image'=>'',
            'bio'=>'',
            'tiktok_link'=>'',
            'instagram_link'=>'',
            'youtube_link'=>'',
        ]);

        $result = $profile->update($data);

        return response()->json($result);
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
