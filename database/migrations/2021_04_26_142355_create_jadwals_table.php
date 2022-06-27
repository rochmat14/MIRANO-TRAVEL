<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJadwalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // jika = Base table or view already exists: 1050 
        // Schema::dropIfExists('jadwals');

        Schema::create('jadwals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('tanggal_berangkat')->nullable();
            $table->integer('armada_id')->nullable();
            $table->integer('jurusan_id')->nullable();
            $table->integer('supir_id')->nullable();
            $table->integer('harga_tiket')->nullable();
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
        Schema::dropIfExists('jadwals');
    }
}
