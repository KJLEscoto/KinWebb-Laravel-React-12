<?php

use App\Http\Controllers\Client\AboutController as ClientAboutController;
use App\Http\Controllers\Client\MessageController as ClientMessageController;
use App\Http\Controllers\Client\ProjectsController as ClientProjectsController;
use App\Http\Controllers\Client\WelcomeController;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// home page
Route::get('/', [WelcomeController::class, 'index'])->name('home');

// projects page
Route::resource('projects', ClientProjectsController::class);

// about me page
Route::resource('about-me', ClientAboutController::class);

// get in touch
Route::resource('message', ClientMessageController::class)->only('store');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';