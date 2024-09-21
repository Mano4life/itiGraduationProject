<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post_Rating extends Model
{
    use HasFactory;
    protected $table='post_rating';
    protected $fillable = [
       // 'post_id',
        'visitor_id',
        'rating',
        ];
}
