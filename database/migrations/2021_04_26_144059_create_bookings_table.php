<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->bigIncrements('id')->nullable();
            $table->string('nomor_booking', 10)->nullable();
            $table->integer('jadwal_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('jumlah_penumpang')->nullable();
            $table->integer('harga_total')->nullable();
            $table->date('tanggal_booking')->nullable();
            $table->enum('status_booking', array('aktif', 'selesai', 'cancel'))->nullable();
            $table->enum('status_bayar', array('lunas', 'belum dibayar', 'pending'))->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
