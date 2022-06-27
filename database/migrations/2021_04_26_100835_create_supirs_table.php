<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSupirsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('supirs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama', 50)->nullable();
            $table->integer('nomor_sim')->nullable();
            $table->string('nomor_telepon', 15)->nullable();
            $table->text('alamat')->nullable();
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
        Schema::dropIfExists('supirs');
    }
}
