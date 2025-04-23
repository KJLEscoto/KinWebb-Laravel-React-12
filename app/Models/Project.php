<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    protected $guarded = [];
    protected $table = 'projects';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tag(string $title): void
    {
        $tag = Tag::firstOrCreate(['title' => strtolower($title)]);

        $this->tags()->attach($tag);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function role(string $type): void
    {
        $role = Role::firstOrCreate(['type' => strtolower($type)]);

        $this->roles()->attach($role);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }
}