<?php

use App\Http\Controllers\Admin\HeroController as AdminHeroController;
use App\Http\Controllers\Admin\ProjectsController as AdminProjectsController;
use App\Http\Controllers\Admin\TechStackController as AdminTechStackController;
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
  ]);
  Route::patch('admin/projects/{project}/toggle-featured', [AdminProjectsController::class, 'toggleFeatured'])->name('admin.projects.toggle-featured');

  Route::resource('admin/tech-stack', AdminTechStackController::class)->names([
    'index' => 'admin.techstack.index',
    'create' => 'admin.techstack.create',
    'store' => 'admin.techstack.store',
    'show' => 'admin.techstack.show',
    'edit' => 'admin.techstack.edit',
    'update' => 'admin.techstack.update',
  ]);

  Route::resource('admin/hero', AdminHeroController::class)->names([
    'index' => 'admin.hero.index',
    'create' => 'admin.hero.create',
    'store' => 'admin.hero.store',
    'show' => 'admin.hero.show',
    'edit' => 'admin.hero.edit',
    'update' => 'admin.hero.update',
  ]);
  Route::patch('admin/hero/{hero}/toggle-main-hero', [AdminHeroController::class, 'toggleMainHero'])->name('admin.projects.toggle-main-hero');
});