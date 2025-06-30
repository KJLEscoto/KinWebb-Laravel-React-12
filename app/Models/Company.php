<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Company extends Model
{
    protected $table = 'companies';

    public function experiences(): BelongsToMany
    {
        return $this->belongsToMany(Experience::class, 'company_experience');
    }
}