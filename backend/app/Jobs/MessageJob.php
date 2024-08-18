<?php

namespace App\Jobs;

use App\Events\MessageSentEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MessageJob implements ShouldQueue
{
    use Queueable,Dispatchable,SerializesModels,InteractsWithQueue;

    /**
     * Create a new job instance.
     */
    public $message,$receiver;
    public function __construct($message,$receiver)
    {
        $this->$message = $message;
        $this->$receiver = $receiver;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        MessageSentEvent::dispatch($this->message,$this->receiver);
        // broadcast(new MessageSentEvent($this->message,$this->receiver));
    }
}
