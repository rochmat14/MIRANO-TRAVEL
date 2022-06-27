<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// api admin
Route::group(['middleware' => 'auth:admin_api'], function(){
    Route::get('/mirano-travel/admin', 'API\AdminAuthController@index');
});

Route::post('/mirano-travel/admin/register', 'API\AdminAuthController@register');

Route::post('/mirano-travel/admin/login', 'API\AdminAuthController@login');

Route::post('/mirano-travel/admin/forgot-password', 'API\AdminAuthController@forgotPassword');

Route::post('/mirano-travel/admin/update', 'API\AdminAuthController@update');

//api supir admin
Route::get('/mirano-travel/admin/supir', 'API\SupirController@index');

Route::post('/mirano-travel/admin/supir-create', 'API\SupirController@store');

Route::put('/mirano-travel/admin/supir-update', 'API\SupirController@update');

Route::delete('/mirano-travel/admin/supir-delete/{id}', 'API\SupirController@destroy');

//route armada admin
Route::get('/mirano-travel/admin/armada', 'API\ArmadaController@index');

Route::post('/mirano-travel/admin/armada-create', 'API\ArmadaController@store');

Route::put('/mirano-travel/admin/armada-update', 'API\ArmadaController@update');

Route::delete('/mirano-travel/admin/armada-delete/{id}', 'API\ArmadaController@destroy');

//route jurusan admin
Route::get('/mirano-travel/admin/jurusan', 'API\JurusanController@index');

Route::post('/mirano-travel/admin/jurusan-create', 'API\JurusanController@store');

Route::put('/mirano-travel/admin/jurusan-update', 'API\JurusanController@update');

Route::delete('/mirano-travel/admin/jurusan-delete/{id}', 'API\JurusanController@destroy');

//route jadwal admin
Route::get('/mirano-travel/admin/jadwal', 'API\JadwalController@index');

Route::post('/mirano-travel/admin/jadwal-create', 'API\JadwalController@store');

Route::put('/mirano-travel/admin/jadwal-update', 'API\JadwalController@update');

Route::delete('/mirano-travel/admin/jadwal-delete/{id}', 'API\JadwalController@destroy');

Route::post('/mirano-travel/admin/cari-laporan-jadwal', 'API\JadwalController@laporanJadwal');

Route::post('/mirano-travel/user/cari-jadwal', 'API\JadwalController@CariJadwal');

// route booking admin
Route::get('/mirano-travel/admin/booking', 'API\BookingController@AllBooking');

Route::post('/mirano-travel/admin/update-status-booking', 'API\BookingController@updateStatusBooking');

Route::post('/mirano-travel/admin/laporan-booking', 'API\BookingController@laporanBooking');

Route::delete('/mirano-travel/admin/booking/{nomor_booking}', 'API\BookingController@delete');

// route booking user
Route::post('/mirano-travel/user/booking-create', 'API\BookingController@store');

Route::post('/mirano-travel/booking', 'API\BookingController@MyBooking');

Route::post('/mirano-travel/user/update-status-bayar', 'API\BookingController@updateStatusBayar');

Route::post('/mirano-travel/detail-tanggal-berangkat', 'API\BookingController@detailJadwal');

Route::post('/mirano-travel/detail-pelanggan', 'API\BookingController@detailPelanggan');

Route::post('/mirano-travel/user/konfirmasi-tiket', 'API\BookingController@KonfirmasiTiket');

// route booking detail user 
Route::post('/mirano-travel/user/booking-detail-create', 'API\BookingDetailController@store');

Route::post('/mirano-travel/detail-jumlah-penumpang', 'API\BookingDetailController@jumlahPenumpang');

Route::get('/auto-number', 'API\BookingController@autoNumber');

Route::post('/mirano-travel/jumlah-kursi', 'API\BookingDetailController@jumlahKursi');

// user auth
Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/mirano-travel/user', 'API\UserAuthController@index');
});

Route::post('/mirano-travel/user/register', 'API\UserAuthController@register');

Route::post('/mirano-travel/user/login', 'API\UserAuthController@login');

Route::post('/mirano-travel/user/forgot-password', 'API\UserAuthController@forgotPassword');

Route::get('/mirano-travel/data-user', 'API\UserController@dataUser');

Route::post('/mirano-travel/user/update', 'API\UserController@update');

Route::post('/mirano-travel/user/user-update', 'API\UserController@userUpdate');

// route pembayaran user
Route::post('/mirano-travel/user/pembayaran-create', 'API\PembayaranController@store');

Route::get('/mirano-travel/user/pembayaran', 'API\PembayaranController@index');

Route::post('/mirano-travel/user/pembayaran', 'API\PembayaranController@getNomorBooking');

Route::post('/mirano-travel/user/pembayaran-update', 'API\PembayaranController@update');

Route::post('/mirano-travel/detail-pembayaran', 'API\PembayaranController@detailPambayaran');