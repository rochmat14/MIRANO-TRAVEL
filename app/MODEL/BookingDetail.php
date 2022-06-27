<?php

namespace App\MODEL;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class BookingDetail extends Model
{
    //
    protected $fillable = [
        'nama', 
        'nomor_id', 
        'tempat_jemput', 
        'nomor_kursi', 
        'nomor_booking', 
        'booking_id', 
        'jadwal_id'
    ];

    public static function noRef(){
        return DB::table('booking_details')->orderBy('nomor_booking', 'desc')->take(1)->get();
    }
}
