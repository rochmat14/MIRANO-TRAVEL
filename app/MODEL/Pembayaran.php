<?php

namespace App\MODEL;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    //
    protected $fillable = [
        'dari_bank',
        'ke_bank',
        'nomor_rekening',
        'atas_nama',
        'nominal_transfer',
        'gambar_bukti',
        'tanggal_konfirmasi',
        'nomor_booking'
    ];
}
