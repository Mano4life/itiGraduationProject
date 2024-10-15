<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;

class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcat = Subcategory::with(['category'])->get();
        return response()->json($subcat, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $data = request()->validate([
            'name' => ['required', 'string', 'min:3'],
            'category_id' => ['required', 'exists:categories,id']
        ]);

        $result = Subcategory::create($data);

        return response()->json($result, 200);
        //test redirection if needed.
    }

    /**
     * Display the specified resource.
     */
    public function show(Subcategory $subcategory)
    {
        if(is_null($subcategory)){
            return response()->json(['message' => 'subcategory not found'], 404);
        }

        return response()->json($subcategory, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Subcategory $subcategory)
    {
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'category_id' => ['required', 'exists:categories,id']
        ]);

        $result = $subcategory->update($data);

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();
        return response()->json(['message'=>'deleted succesfully'], 200);
    }
}
