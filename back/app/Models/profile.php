<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'image',
        'bio',
        'tiktok_link',
        'instagram_link',
        'youtube_link',
    ];
    public function  user(){
        return $this->belongsTo(User::class);
    }
}

