<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;
    protected $table ='visitors';
    protected $fillable=[
        'name',
        'email',
        'password',
        'role',
        'date_of_birth',
        'gender'
    ];
   // function user_saved_posts(){
   //    return $this->hasMany(Post::class,'user_id','id');
   // }
}
