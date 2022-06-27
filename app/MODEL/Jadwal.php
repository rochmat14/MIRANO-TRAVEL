<?php

namespace App\MODEL;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    public static function autoNumber(){
        return DB::table('jadwals')->orderBy('id', 'desc')->take(1)->get();
    }

    public function jurusan(){
        return $this->belongsTo('App\MODEL\Jurusan', 'jurusan_id');
    }

    public function armada(){
        return $this->belongsTo('App\MODEL\Armada', 'armada_id');
    }

    public function supir(){
        return $this->belongsTo('App\MODEL\Supir', 'supir_id');
    }
}
