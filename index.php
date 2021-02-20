<?php 
  $vm = $_GET['vm'];
?>

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="text/html" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/preloader.css" />
    <link
      rel="apple-touch-icon"
      href="media/fav-180.png"
      type="image/png"
      sizes="180x180"
    />
    <link rel="icon" href="media/fav-32.png" type="image/png" sizes="32x32" />
    <link rel="icon" href="media/fav-16.png" type="image/png" sizes="16x16" />

    <title>Ancla.Preloader</title>
    <style>
      body {
        background-color: #181818;
      }
      .main {
        font-family: "Roboto", sans-serif;
        font-size: 36px;
        position: absolute;
        color: white;
        text-align: center;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section class="main">Контент</section>
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/preloader.js"></script>
    <script>
      showPreloader(<?php echo $vm ? $vm . "000" : "5000" ?>);
    </script>
  </body>
</html>
