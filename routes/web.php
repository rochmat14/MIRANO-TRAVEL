<?php

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

Route::get('/', function () {
    return view('welcome');
});

Route::view('/', 'app');

Route::view('/admin/register', 'app');

Route::view('/admin/login', 'app');

Route::view('/admin/forgot-password', 'app');

Route::view('/admin/update-admin', 'app');

Route::view('/admin', 'app');

Route::view('/admin/pelanggan', 'app');

Route::view('/admin/supir', 'app');

Route::view('/admin/armada', 'app');

Route::view('/admin/jurusan', 'app');

Route::view('/admin/jadwal', 'app');

Route::view('/admin/data-booking', 'app');

Route::view('/admin/cari-laporan-booking', 'app');

Route::view('/admin/cetak-laporan-booking/{tanggal_booking}', 'app');

Route::view('/admin/cari-laporan-jadwal', 'app');

Route::view('/admin/cetak-laporan-jadwal/{tanggal_berangkat}/{armada}/{supir}', 'app');

// route user
Route::view('/register', 'app');

Route::view('/update-user', 'app');

Route::view('/login', 'app');

Route::view('/forgot-password', 'app');

Route::view('', 'app');

Route::view('/daftar-jadwal/{tanggalBerangkat}/{kotaAsal}/{kotaTujuan}/{jumlahPenumpang}', 'app');

Route::view('/pemesanan-jadwal/{id}/{jenis}/{jumlahKursi}/{keberangkatan}/{tujuan}/{tanggalBerangkat}/{hargaTiket}/{jumlahPenumpang}/{jadwalId}', 'app');

Route::view('/riwayat-booking/{user_id}', 'app');

Route::view('/konfirmasi-transfer/{nomor_booking}/{user_id}', 'app');

Route::view('/konfirmasi-transfer/{nomor_booking}/{user_id}', 'app');

Route::view('/konfirmasi-transfer-edit/{nomor_booking}/{user_id}', 'app');

Route::view('/detail-bayar/{nomor_booking}/{user_id}', 'app');

Route::view('/admin/cetak-laporan-jadwal/{valueTanggalBerangkat}/{valueArmada}/{valueSupir}', 'app');
// Route::view('/{path}', 'app');