<?php

namespace App\Http\Controllers;

use App\Models\Social;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    public function index(){
        $social = Social::with('user')->latest()->get();
        return response()->json($social, 200);
    }
    public function store()
    {
        try{
            $data = request()->validate([
                'user_id' => 'required|integer', 
                'tiktok_link' => 'nullable|string|min:5',
                'instagram_link' => 'nullable|string|min:5',
                'youtube_link' => 'nullable|string|min:5',
            ]);
            
    
            $result = Social::create([
                'user_id' => $data['user_id'],
                'tiktok_link' => !empty($data['tiktok_link']) ? $data['tiktok_link'] : null,
                'instagram_link' => !empty($data['instagram_link']) ? $data['instagram_link'] : null,
                'youtube_link' => !empty($data['youtube_link']) ? $data['youtube_link'] : null,
    
            ]);
            return response()->json($result, 200);
        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
       
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Social $social)
    {
        $social->load(['user']);

        if(is_null($social)){
            return response()->json(['message' => 'social not found'], 404);
        }

        return response()->json($social, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Social $social)
    {
        try{
        $data = request()->validate([
            'user_id' => 'required|integer', 
            'tiktok_link' => 'nullable|string|min:5',
            'instagram_link' => 'nullable|string|min:5',
            'youtube_link' => 'nullable|string|min:5',
        ]);
        
        $updateData = [
            'user_id' => $data['user_id'],
            'tiktok_link' => $data['tiktok_link'] ?? $social->tiktok_link,
            'instagram_link' => $data['instagram_link'] ?? $social->instagram_link,
            'youtube_link' => $data['youtube_link'] ?? $social->youtube_link,
            
        ];

        // Update social
        $result = $social->update(array_filter($updateData));

        return response()->json($result, 201);
       }catch (\Exception $e) {
           return response()->json(['error' => $e->getMessage()], 500);
       }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Social $social)
    {
        $social->delete();
        return response()->json(['message'=>'deleted succesfully'], 200);
    }
}
