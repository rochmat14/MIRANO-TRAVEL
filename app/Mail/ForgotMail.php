<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ForgotMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;
    
    public function __construct($password)
    {
        $this->data=$password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data=$this->data;
        return $this->from('abdulrochmat874@gmail.com')->view('mail.forgot',compact('data'))->subject('Password Reset Link');
    }
}
