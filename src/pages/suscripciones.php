<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Suscripciones - NewTube</title>
  <link href='../styles/styles.css' rel='stylesheet'>
  <link href="../output.css" rel="stylesheet">
  <link rel="stylesheet" href="../styles/fonts.css">
  <link rel="icon" type="image/x-icon" href="../assets/favicon/newtube.ico">
</head>
<body>
  <div id="plantilla">
    <?php include '../components/header.php'; ?>
    <main id='main' class="contenedor_ref p-5 overflow-auto h-[100vh-50px]">
        <div class="w-full mx-auto pt-10 h-full flex flex-col gap-5">
            <div>
                <h2 class="font-Poppins font-medium text-lg">
                    Canales a los que estás suscrito 
                </h2>
            </div>
            <div id="contenedor_suscripciones_usuario">
                
            </div>
        </div>
    </main>
    <?php include '../components/sidebar.php'; ?>
  </div>
  <script src="../js/components/sidebar.js"></script>
  <script src="../js/components/header.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/animaciones/animaciones.js"></script>
  <script src="../js/pages/suscripciones.js"></script>
  <script src="../js/utils/observer.js"></script>

</body>
</html>
