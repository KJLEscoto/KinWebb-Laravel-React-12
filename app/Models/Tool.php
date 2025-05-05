<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tool extends Model
{
    protected $table = 'tools';

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}