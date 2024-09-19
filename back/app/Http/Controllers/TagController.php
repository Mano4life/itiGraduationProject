<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = Tag::latest()->paginate(8);
        return response()->json($result, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $data = request()->validate([
            'name' => ['required', 'string', 'min:3']
        ]);

        $result = Tag::create($data);

        return response()->json($result, 200);
        //test redirection if needed.
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $Tag)
    {
        if(is_null($Tag)){
            return response()->json(['message' => 'Tag not found'], 404);
        }

        return response()->json($Tag, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Tag $Tag)
    {
        $data = request()->validate([
            'name' => ['required', 'min:3']
        ]);

        $result = $Tag->update($data);

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $Tag)
    {
        $Tag->delete();
        return response()->json(['message'=>'deleted succesfully'], 200);
    }
}
