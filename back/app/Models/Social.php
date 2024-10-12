<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'tiktok_link',
        'instagram_link',
        'youtube_link',
    ];
    public function  user(){
        return $this->belongsTo(User::class);
    }
}

