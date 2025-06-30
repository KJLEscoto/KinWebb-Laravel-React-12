<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Experience extends Model
{
    protected $table = 'experiences';

    public function company(): BelongsToMany
    {
        return $this->belongsToMany(Company::class);
    }
}