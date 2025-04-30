<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
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

        return inertia('welcome', compact('featured_projects'));
    }
}