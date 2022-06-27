<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama', 50)->nullable();
            $table->string('jenis_kelamin', 20)->nullable();
            $table->string('nomor_telepon', 15)->nullable();
            $table->string('alamat', 50)->nullable();
            $table->string('email', 30)->unique()->nullable();
            $table->string('password', 50)->nullable();
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
        Schema::dropIfExists('admins');
    }
}
