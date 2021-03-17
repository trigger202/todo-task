<?php
namespace App\Mapper;

class TodoMap {
    private $title, $recipient, $id, $created, $videoWatched, $videoName, $status;

    function setTitle(string $title) : void {
        $this->title = $title;
    }

    function setRecipient(string $recipient) : void {
        $this->recipient = $recipient;
    }

    function setId(string $id) : void {
        $this->id = $id;
    }

    function setVideoWatched(bool $videoWatched) : void {
        $this->videoWatched = $videoWatched;
    }

    function setCreated(string $created) : void {
        $this->created = $created;
    }

    function setVideoName(string $videoName) : void {
        $this->videoName = $videoName;
    }

    function setStatus(string $status) : void {
        $this->status = $status;
    }

    function getTitle() : string {
        return $this->title;
    }

    function getRecipient() : string {
        return $this->recipient;
    }

    function getId() : string {
        return $this->id;
    }

    function getVideoWatched() : string {
        return $this->videoWatched;
    }

    function getCreated() : string {
        return $this->created;
    }

    function getVideoName() : string {
        return $this->videoName;
    }

    function getStatus() : string {
        return $this->status;
    }
}
