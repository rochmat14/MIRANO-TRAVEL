<?php

namespace App\MODEL;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\Admin as Authenticatable;

class Admin extends Authenticatable
{
    //
    use HasApiTokens, Notifiable;
    
    protected $fillable = ['nama' , 'jenis_kelamin' , 'nomor_telepon' , 'alamat' , 'email' , 'password'];
}
