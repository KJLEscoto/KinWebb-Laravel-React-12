<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Screenshot extends Model
{
    protected $table = 'screenshots';

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}