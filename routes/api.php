<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\CategoriesController;


Route::Post('/register',[UsersController::class,"register"]);
Route::Post('/login',[UsersController::class,"login"]);


 
Route::group([
    "middleware"=>["auth:sanctum"]



], function () {

    Route::get('/profile',[UsersController::class,"getProfile"]);
    Route::post('/user-profile',[UsersController::class,"updateProfile"]);
    Route::get('/user-details',[UsersController::class,"userDetails"]);
    Route::get('/products',[ProductsController::class,"index"]);
    Route::post('/add-products',[ProductsController::class,"store"]);
    Route::put('/edit-products/{id}',[ProductsController::class,"update"]);

    Route::get('/products/{productId}/comments', [ProductCommentController::class, 'index']);
    Route::post('/products/comments', [ProductCommentController::class, 'store']);
    Route::get('/products/comments/{id}', [ProductCommentController::class, 'show']);
    Route::put('/products/comments/{id}', [ProductCommentController::class, 'update']);
    Route::delete('/products/comments/{id}', [ProductCommentController::class, 'destroy']);
    Route::get('/category',[CategoriesController::class,"index"]);
    Route::post('/add-category',[CategoriesController::class,"store"]);

    Route::get('/edit-category/{id}',[CategoriesController::class,"update"]);


    Route::get('/logout',[UsersController::class,"logout"]);
    
});
