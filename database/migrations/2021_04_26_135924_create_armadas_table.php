<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArmadasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('armadas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nomor_polisi', 20)->nullable();
            $table->string('jenis', 70)->nullable();
            $table->integer('jumlah_kursi')->nullable();
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
        Schema::dropIfExists('armadas');
    }
}
