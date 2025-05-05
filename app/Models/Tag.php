<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{

    protected $table = 'tags';

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }

    // public function scopeSearch($query, $search)
    // {
    //     return $query->where('title', 'like', "%{$search}%");
    // }
}