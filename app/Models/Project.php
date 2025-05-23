<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $table = 'projects';

    public function getRouteKeyName()
    {
        return 'name';
    }

    public function tag(string $title): void
    {
        $tag = Tag::firstOrCreate(['title' => $title]);

        $this->tags()->attach($tag);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function role(string $type): void
    {
        $role = Role::firstOrCreate(['type' => $type]);

        $this->roles()->attach($role);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function screenshots(): HasMany
    {
        return $this->hasMany(Screenshot::class);
    }

    public function techstack(): BelongsToMany
    {
        return $this->belongsToMany(TechStack::class, 'project_techstack');
    }
}