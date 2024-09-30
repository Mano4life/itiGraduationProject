<?php

use App\Models\Ingredient;
use App\Models\pending_recipes;
use App\Models\PendingRecipe;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ingredient_pending_recipe', function (Blueprint $table) {
            $table->foreignIdFor(Ingredient::class)->cascadeOnDelete();
            $table->foreignIdFor(PendingRecipe::class)->cascadeOnDelete();

            $table->float('quantity');
            $table->string('measurement_unit');
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredient_pending_recipe');
    }
};
