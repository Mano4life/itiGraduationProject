<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;
    protected $table = 'visitors';
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'date_of_birth',
        'gender'
    ];
    // function recipes(){
    //    return $this->belongsToMany(Recipe::class,'recipe_user_saved', foreignPivotKey:'visitor_id');
    // }

    function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function recipes_saves(){
        return $this->belongsToMany(Recipe::class,'recipe_user_saved', foreignPivotKey:'recipes_id');
    }

    public function recipes_ratings(){
        return $this->belongsToMany(Recipe::class,'recipe_user_saved', foreignPivotKey:'recipes_id')->withPivot('rating');
    }
}
