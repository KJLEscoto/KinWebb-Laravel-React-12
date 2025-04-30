<?php

use App\Http\Controllers\Client\MessageController as ClientMessageController;
use App\Http\Controllers\Client\ProjectsController as ClientProjectsController;
use App\Http\Controllers\Client\WelcomeController;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::resource('projects', ClientProjectsController::class);

Route::resource('message', ClientMessageController::class)->only('store');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';