<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_Saved_Post extends Model
{
    use HasFactory;
    protected $table='user_saved_posts';
    protected $fillable = [
        'visitor_id',
        'post_id',
        ];
}
