<?php

namespace App\MODEL;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    //
    protected $fillable = [
        'nomor_booking',
        'jadwal_id',
        'user_id',
        'jumlah_penumpang',
        'harga_total',
        'tanggal_booking',
        'status_booking',
        'status_bayar'
    ];

    
    
    public static function noRef(){
        return DB::table('bookings')->orderBy('nomor_booking', 'desc')->take(1)->get();
    }

    // milik dari = ke 1 data
    public function jadwal(){
        return $this->belongsTo('App\MODEL\Jadwal', 'jadwal_id');
    }

    // milik dari = ke 1 data
    public function user(){
        return $this->belongsTo('App\MODEL\User', 'user_id');
    }

    // memiliki banyak data = 1 ke banyak
    public function bookingDetail(){
        // return $this->hasMany('App\MODEL\BookingDetail', $this->primaryKey);
        return $this->hasMany('App\MODEL\BookingDetail', 'nomor_booking', 'nomor_booking');
    }

    // milik dari = ke 1 data
    public function penumpangBooking(){
        return $this->belongsTo('App\MODEL\PenumpangBooking', 'jadwal_id', 'jadwal_id');
    }

    // milik dari = ke 1 data
    public function pembayaran() {
        return $this->belongsTo('App\MODEL\Pembayaran', 'nomor_booking', 'nomor_booking');
    }
}
