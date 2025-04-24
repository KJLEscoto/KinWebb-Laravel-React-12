<?php

use App\Http\Controllers\Admin\ProjectsController as AdminProjectsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('admin/dashboard', function () {
    return Inertia::render('dashboard');
  })->name('admin.dashboard');

  Route::resource('admin/projects', AdminProjectsController::class)->names([
    'index' => 'admin.projects.index',
    'create' => 'admin.projects.create',
    'store' => 'admin.projects.store',
    'show' => 'admin.projects.show',
    'edit' => 'admin.projects.edit',
    'update' => 'admin.projects.update',
    'destroy' => 'admin.projects.delete',
  ]);
});