<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::latest()->paginate(8);
        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $data = request()->validate([
            'name' => ['required', 'string', 'min:3']
        ]);

        $result = Category::create($data);

        return response()->json($result, 200);
        //test redirection if needed.
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        if(is_null($category)){
            return response()->json(['message' => 'category not found'], 404);
        }

        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Category $category)
    {
        $data = request()->validate([
            'name' => ['required', 'min:3']
        ]);

        $result = $category->update($data);

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message'=>'deleted succesfully'], 200);
    }
}
