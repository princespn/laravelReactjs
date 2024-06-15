<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\ProductsController;


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

    Route::get('/logout',[UsersController::class,"logout"]);
    
});
