<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use App\Models\Project;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $featured_projects = Project::where('is_featured', true)->with('roles')->get();

        $main_hero = Hero::where('is_active', true)->first();

        return inertia('welcome', compact('main_hero', 'featured_projects'));
    }
}