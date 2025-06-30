<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Experience;
use App\Models\Hero;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $featured_projects = Project::where('is_featured', true)->with('roles')->get();

        $main_hero = Hero::where('is_active', true)->first();

        $short = DB::table('short_about')->first();

        return inertia('welcome', compact('main_hero', 'featured_projects', 'short'));
    }
}