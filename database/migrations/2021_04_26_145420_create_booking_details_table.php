<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama', 50)->nullable();
            $table->integer('nomor_id')->nullable();
            $table->text('tempat_jemput')->nullable();
            $table->integer('nomor_kursi')->nullable();
            $table->string('nomor_booking', 10)->nullable();
            $table->string('booking_id', 10)->nullable();
            $table->integer('jadwal_id')->nullable();
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
        Schema::dropIfExists('booking_details');
    }
}
