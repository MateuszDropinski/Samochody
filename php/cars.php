<?php
        $file = file_get_contents("../data/cars.json");
        $json = json_decode($file, true);
        echo $file;
?>