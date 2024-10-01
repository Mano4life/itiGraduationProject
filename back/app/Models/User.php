<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable,HasApiTokens;

    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'date_of_birth',
        'gender'
    ];
    
    function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function recipes_saves(){
        return $this->belongsToMany(Recipe::class,'recipe_user_saved');
    }

    public function recipes_ratings(){
        return $this->belongsToMany(Recipe::class,'recipe_user_rating')->withPivot('rating');
    }
    public function recipes(){
        return $this->hasMany(Recipe::class);
    }
    public function pendingRecipes(){
        return $this->hasMany(PendingRecipe::class);
    }

    //otp stuff
    public function generateCode(){
        $this->timestamps = false;
        $this->code = rand(1000,9999);
        $this->expires_at = now()->addMinute(15);
        $this->save();
    }

    public function resetCode(){
        $this->timestamps = false;
        $this->code = null;
        $this->expires_at = null;
        $this->save();
    }
    
}
