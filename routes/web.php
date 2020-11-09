<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::view('/', 'vue.initial');


//Esse comando é para dar F5 e não dar página 404 ...
Route::get('/{vue_capture?}', function() {
    return view('vue.initial');
})->where('vue_capture', '[\/\w\.-]*');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
