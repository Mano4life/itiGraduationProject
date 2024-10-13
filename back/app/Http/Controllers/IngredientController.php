<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = Ingredient::with('recipes.category')->get();
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

        $result = Ingredient::create($data);

        return response()->json($result, 200);
        //test redirection if needed.
    }

    /**
     * Display the specified resource.
     */
    public function show(Ingredient $Ingredient)
    {
        $Ingredient->load(['recipes.category']);
        if(is_null($Ingredient)){
            return response()->json(['message' => 'Ingredient not found'], 404);
        }

        return response()->json($Ingredient, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Ingredient $Ingredient)
    {
        $data = request()->validate([
            'name' => ['required', 'min:3']
        ]);

        $result = $Ingredient->update($data);

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ingredient $Ingredient)
    {
        $Ingredient->delete();
        return response()->json(['message'=>'deleted succesfully'], 200);
    }
}
