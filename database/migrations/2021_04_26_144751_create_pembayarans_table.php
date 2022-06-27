<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePembayaransTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('dari_bank', 30)->nullable();
            $table->string('ke_bank', 30)->nullable();
            $table->integer('nomor_rekening')->nullable();
            $table->string('atas_nama', 40)->nullable();
            $table->integer('nominal_transfer')->nullable();
            $table->string('gambar_bukti', 40)->nullable();
            $table->string('lokasi_gambar', 40)->nullable();
            $table->date('tanggal_konfirmasi')->nullable();
            $table->string('nomor_booking', 10)->nullable();
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
        Schema::dropIfExists('pembayarans');
    }
}
