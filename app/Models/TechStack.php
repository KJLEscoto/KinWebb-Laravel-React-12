<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TechStack extends Model
{
    protected $table = 'techstack';

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}