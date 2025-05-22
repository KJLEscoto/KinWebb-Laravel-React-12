<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    protected $table = 'skills';

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_skill');
    }
}