<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index()
    {
        
        $recipes = Recipe::all();
        $data = [
            'status' => 200,
            'recipes' => $recipes
        ];

        return response()->json($data, 200);
        // dd($recipes);

        // $recipes = Recipe::latest()->simplePaginate(3);
        // return view('recipes.index', [
        //     'recipes' => $recipes
        // ]);
    }

    public function create()
    {
        return view('recipes.create');
    }

    public function show(Recipe $recipe)
    {
        // return $recipe;
        return view('recipes.show', ['recipe' => $recipe]);
    }

    public function store()
    {
        request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:10'],
            'image' => ['required', 'active_url']
        ]);

        Recipe::create([
            'name' => request('name'),
            'description' => request('description'),
            'image' => request('image')
        ]);

        return redirect('/recipes');
    }

    public function edit(Recipe $recipe)
    {
        return view('recipes.edit', ['recipe' => $recipe]);
    }

    public function update(Recipe $recipe)
    {
        //authorize (on hold....)
        request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:10'],
            'image' => ['required', 'active_url']
        ]);

        $recipe->update([
            'name' => request('name'),
            'description' => request('description'),
            'image' => request('image')
        ]);

        return redirect('/recipes/' . $recipe->id);
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return redirect('/recipes');
    }
}
