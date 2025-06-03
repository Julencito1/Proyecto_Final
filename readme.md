# MANUAL DE USUARIO

### Cabecera

La cabecera está formada por los siguientes componentes:

1. Menu (icono)
2. Logo de la aplicación
3. Barra de búsqueda
4. Botón para crear un nuevo video
5. Notificaciones
6. Perfil / Menu de usuario

---

#### Menu (icono)

El menu es un botón que permite minimizar y maximizar la barra lateral de la aplicación.

![1748932904646](image/readme/1748932904646.png)

![1748932917589](image/readme/1748932917589.png)

---

#### Logo de la aplicación

Es simplemente un link que te lleva a la página de inicio de la aplicación.

![1748932970958](image/readme/1748932970958.png)

---

#### Barra de búsqueda

La barra de búsqueda permite encontrar y facilitar la búsqueda de videos y/o canales dentro, de la aplicación.

Por cada vez que el usuario realice una búsqueda se almacenará en el almacenamiento local del navegador, también conocido como `localStorage`. Lo que permitirá al usuario realizar de nuevo cualquiera de sus 10 últimas búsquedas. La barra de búsqueda tambien cuenta con un botón de limpiar, que quitará cualquier string situado dentro del input, y que solo se mostrará en caso de que haya más de cero letras en el input.

![1748933260494](image/readme/1748933260494.png)

![1748933294161](image/readme/1748933294161.png)

---

#### Botón para crear un nuevo video

Al hacer click en este botón aparecerá un menu con la opción de "Crear Nuevo Video", al presionar en este link se te redirigirá a la página para crear nuevos videos.

![1748933465821](image/readme/1748933465821.png)

---

#### Notificaciones

Este botón con ese icono tan característico desplegará un menú que contendrá las notificaciones recibidas por parte del usuario en la `ÚLTIMA SEMANA` y mostrará información como:

* Avatar del usuario que creó el video
* Título del video
* Miniatura del video
* Hace cuanto se publicó

En cuanto a cómo se crean las notificaciones, cada vez que un canal cree un nuevo vídeo se enviará automaticamente una notificación con la información mencionada anteriormente.

Si es la primera vez que desplegan el menu y el usuario contiene notificaciones no leidas, se establecerán como leidas, por otro lado, las notificaciones leidas se mostrarán en la parte superior derecha junto al icono de las notificaciones.

![1748933893175](image/readme/1748933893175.png)

![1748933927464](image/readme/1748933927464.png)

---

#### Perfil / Menu de usuario

Este componente contiene a simple vista el avatar del usuario loggeado en la aplicación, este es un botón, que al hacer click, muestra la siguiente información:

* Avatar del usuario
* Nombre
* Nombre del canal

Junto con un link para visitar tu propio canal y un botón para cerrar sesión en la cuenta.

![1748934337347](image/readme/1748934337347.png)

---

### Barra lateral

La barra lateral esta formada por un conjunto de links que facilitan la navegación dentro de la aplicación, estos links son:

1. Inicio
2. Historial
3. Marcados
4. Videos Guardados
5. Suscripciones
6. Listado 4 últimos canales siguiendo.

![1748935105120](image/readme/1748935105120.png)

---

### Marcados

En esta página se mostrarán los videos y comentarios que el usuario ha marcado (me gusta / no me gusta).

Estarán separados por tabulaciones:

* Videos
* Comentarios

#### Videos

Aparecerán de forma listada los videos marcados ordernados de más recientes a más antiguos, mostrando:

1. Miniatura
2. Duración
3. Título
4. Num. Visualizaciones
5. Fecha publicación
6. Avatar usuario creador
7. Nombre creador
8. Estado Marcado `( ME GUSTA / NO ME GUSTA )`

Cada elemento es un link que te llevará al video original.

![1748947322939](image/readme/1748947322939.png)

![1748947513400](image/readme/1748947513400.png)

---



#### Comentarios

En esta segunda sección, se listarán los comentarios marcados del usuario mostrando la siguiente información:

1. Tipo `( PADRE -> ICONO PERSONA / HIJO -> ICONO FLECHA HACIA ARRIBA )`
2. Avatar usuario
3. Nombre usuario
4. Contenido comentario
5. Estado Marcado `( ME GUSTA / NO ME GUSTA )`
6. Fecha publicación

Cada comentario es un link que te llevará al video donde se escribió ese comentario.

![1748947405979](image/readme/1748947405979.png)

![1748947503909](image/readme/1748947503909.png)

![1748947533635](image/readme/1748947533635.png)

---

### Videos Guardados

En esta página se listarán los videos que el usuario guarde.

Ofrece filtros para faciliar la búsqueda de videos guardados:

1. Barra de búsqueda
2. Botón de filtros `( MÁS VISUALIZACIONES | MENOS VISUALIZACIONES | MÁS ANTIGUOS | MÁS RECIENTES)`

El filtro seleccionado contendra un tick para conocer el filtro establecido, por defecto, ***MÁS RECIENTES***.

Cada vídeo mostrará la siguiente información:

* Miniatura
* Duración
* Título
* Visualizaciones
* Fecha publicación
* Avatar usuario
* Nombre usuario
* Botón eliminar [ ✖ ]

El botón de eliminar se mostrará cada vez que el usuario pase el cursor por encima de un video, al hacer click en este, se eliminará de la lista de videos guardados.

![1748950018455](image/readme/1748950018455.png)

![1748950039321](image/readme/1748950039321.png)

En caso de que no haya videos guardados o el filtro por búsqueda no encuentre ningún video se mostrará la siguiente pantalla:

![1748950253412](image/readme/1748950253412.png)

---

### Canales

![1748936769274](image/readme/1748936769274.png)

![1748862271290](image/readme/1748862271290.png "Imágen Canales")

En la página canales, podemos explorar cierta información del usuario dentro de la aplicación.

A primera vista podemos observar:

* Portada del canal.
* Avatar del usuario.
* Nombre del usuario.
* Número de suscriptores.
* Número de videos públicos del canal.

> Esta sección consta de tabulaciones separadas por Inicio, Videos, Sobre Mí y Tus Videos Privados.
>
> La sección "Tus Videos Privados" solo aparecerá si el canal corresponde al usuario actual, en caso de que no, simplemente desaparece. Lo contrario ocurre con el botón de "Suscribirme" situado debajo del nombre del canal "@paco-hbl2", si el canal actual corresponde al del usuario actual no aparece debido a que tú no te puedes suscribir a tí mismo, pero si no es el mismo usuario aparecerá.

---

### Inicio

![1748936812176](image/readme/1748936812176.png)

En la seccion de "Inicio" el usuario podra observar 2 secciones:

* Vídeos más vistos
* Canales que sigue

![1748863224849](image/readme/1748863224849.png)

El título de la sección alternará dependiendo si el usuario que está visitando el canal, es el correspondiente de este o no, por ejemplo, en este caso aparece "Tus vídeos más vistos" y "Canales que sigues",

haciendo referencia a que es el canal del usuario actual, en caso de lo contrario, muestra "Videos que podrían gustarte" y "Canales que X (el canal actual) sigue".

![1748863667371](image/readme/1748863667371.png)

En cuanto a la obtención de datos, en la seccion de vídeos se obtienen los 3 vídeos más vistos del canal, por otro lado en la secciones de canales, aparece los 4 últimos canales que el usuario correspondiente a ese canal ha seguido.

Si el canal actual, no sigue a ningún canal, simplemente desaparece la sección.

![1748863804431](image/readme/1748863804431.png)

Lo mismo ocurre cuando el canal, sigue a alguien pero no tiene vídeos publicados.

![1748863844758](image/readme/1748863844758.png)

En el caso de que no cumpla ni una ni otra condición, se muestra un SVG para indicar que el canal está "descubriendo NewTube", este mensaje alterna dependiendo si es el canal del usuario actual.

`CUENTA CAMBIADA A "testportada", sin cumplir ninguna condición.`

![1748864017765](image/readme/1748864017765.png)

Si volvemos a la cuenta principal y volvemos a ver el canal de "testportada" nos aparece lo siguiente:

![1748864162208](image/readme/1748864162208.png)

---

### Videos

![1748936829259](image/readme/1748936829259.png)

En esta sección aparecerán los videos  del canal ordenados de más recientes a más antiguos. Mostrarán información relevante del video, como el título, la miniatura, la duración, la fecha de publicación, el número de visitas...

También consta de un botón extra, para interactuar y manipular las propiedades del video.

* Ocultar video (solo si el usuario actual es el propietario del canal)
* Guardar / Quitar de guardados el video seleccionado
* Compartir (copiar la url del video en el portapapeles)

#### Demostración

![1748864824871](image/readme/1748864824871.png)

![1748864842402](image/readme/1748864842402.png)

![1748864873358](image/readme/1748864873358.png)

En caso de no tener ningún video, aparecerá lo siguiente:

![1748865164423](image/readme/1748865164423.png)

---

### Sobre Mí

![1748936847185](image/readme/1748936847185.png)

En esta sección se mostrará información personal del usuario propietario del canal, incluyendo...

* Breve descripción
* Fecha en la que se registro en la aplicación
* País de origen

#### Demostración

![1748865100877](image/readme/1748865100877.png)

---

### Tus vídeos privados

![1748936860709](image/readme/1748936860709.png)

Esta sección es parecida a la de "Videos", se actualizará el nombre de la sección a "Tus vídeos privados (N.Total de videos privados)" y  se mostrará una lista de videos en el que al ser el propietario del canal, podrás:

* Establecer como público
* Borrar el vídeo

#### Demostración

![1748865433320](image/readme/1748865433320.png)

![1748935664671](image/readme/1748935664671.png)

---

### Página 404

![1748936964955](image/readme/1748936964955.png)

Se navegará automáticamente a esta página en el caso en que el usuario intenté acceder a un vídeo, a una sección o a un canal que no existe, es una página sencilla, minimalista que cuenta además con un link para ofrecer la oportunidad al usuario de navegar directamente a la página inicial de la aplicación `"/"`.

#### Demostración

![1748865796543](image/readme/1748865796543.png)

---
