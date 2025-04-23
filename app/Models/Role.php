<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{

    protected $guarded = [];
    protected $table = 'roles';

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}