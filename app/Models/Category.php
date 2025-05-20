<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    protected $table = 'categories';

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class);
    }

}