<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Framework extends Model
{
    protected $guarded = [];
    protected $table = 'frameworks';

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}