<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function recipes(){
        return $this->hasMany(Recipe::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
