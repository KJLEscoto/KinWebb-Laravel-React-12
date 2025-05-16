<?php

use App\Http\Controllers\Admin\AboutController as AdminAboutController;
use App\Http\Controllers\Admin\HeroController as AdminHeroController;
use App\Http\Controllers\Admin\MainTextController as AdminMainTextController;
use App\Http\Controllers\Admin\ProjectsController as AdminProjectsController;
use App\Http\Controllers\Admin\ShortController as AdminShortController;
use App\Http\Controllers\Admin\TechStackController as AdminTechStackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
  // dashboard page
  Route::get('admin/dashboard', function () {
    return Inertia::render('dashboard');
  })->name('admin.dashboard');

  // admin projects page
  Route::resource('admin/projects', AdminProjectsController::class)
    ->except(['destory'])
    ->names([
      'index' => 'admin.projects.index',
      'create' => 'admin.projects.create',
      'store' => 'admin.projects.store',
      'show' => 'admin.projects.show',
      'edit' => 'admin.projects.edit',
      'update' => 'admin.projects.update',
    ]);
  Route::patch('admin/projects/{project}/toggle-featured', [AdminProjectsController::class, 'toggleFeatured'])->name('admin.projects.toggle-featured');

  // admin tech stack page
  Route::resource('admin/tech-stack', AdminTechStackController::class)
    ->except(['destory'])
    ->names([
      'index' => 'admin.techstack.index',
      'create' => 'admin.techstack.create',
      'store' => 'admin.techstack.store',
      'show' => 'admin.techstack.show',
      'edit' => 'admin.techstack.edit',
      'update' => 'admin.techstack.update',
    ]);

  // admin hero page
  Route::resource('admin/hero', AdminHeroController::class)
    ->except(['edit', 'show'])
    ->names([
      'index' => 'admin.hero.index',
      'create' => 'admin.hero.create',
      'store' => 'admin.hero.store',
      'show' => 'admin.hero.show',
      'update' => 'admin.hero.update',
      'destroy' => 'admin.hero.destroy',
    ]);

  // about me page
  Route::resource('admin/about-me', AdminAboutController::class)
    ->except(['destory'])
    ->names([
      'index' => 'admin.about-me.index',
      'create' => 'admin.about-me.create',
      'store' => 'admin.about-me.store',
      'show' => 'admin.about-me.show',
      'edit' => 'admin.about-me.edit',
      'update' => 'admin.about-me.update',
    ]);
  Route::resource('admin/about-me/short', AdminShortController::class)
    ->only(['store', 'update'])
    ->names([
      'store' => 'admin.about-me.store-short',
      'update' => 'admin.about-me.update-short',
    ]);
  Route::resource('admin/about-me/main', AdminMainTextController::class)
    ->only(['store', 'update'])
    ->names([
      'store' => 'admin.about-me.store-main-text',
      'update' => 'admin.about-me.update-main-text',
    ]);

});