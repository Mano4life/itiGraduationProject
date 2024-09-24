<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category(){
        return $this->belongsTo(Category::class);
    }
    
    public function subcategory(){
        return $this->belongsTo(Subcategory::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function ingredients(){
        return $this->belongsToMany(Ingredient::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }

    public function users_saves(){
        return $this->belongsToMany(User::class,'recipe_user_saved', relatedPivotKey:'user_id');
    }

    public function users_ratings(){
        return $this->belongsToMany(User::class,'recipe_user_rating', relatedPivotKey:'user_id')->withPivot('rating');
    }
    public function averageRating()
    {
        return $this->users_ratings()->avg('rating');
    }
}
