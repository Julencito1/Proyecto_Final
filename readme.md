# MANUAL DE USUARIO

### Canales

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

### Inicio

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

En esta sección se mostrará información personal del usuario propietario del canal, incluyendo...

* Breve descripción
* Fecha en la que se registro en la aplicacíon
* País de origen

#### Demostración

![1748865100877](image/readme/1748865100877.png)

---

### Tus vídeos privados

Esta sección es parecida a la de "Videos", se actualizará el nombre de la sección a "Tus vídeos privados (N.Total de videos privados)" y  se mostrará una lista de videos en el que al ser el propietario del canal, podrás:

* Establecer como público
* Borrar el vídeo

#### Demostración

![1748865433320](image/readme/1748865433320.png)

---

### Página 404

Se navegará automáticamente a esta página en el caso en que el usuario intenté acceder a un vídeo, a una sección o a un canal que no existe, es una página sencilla, minimalista que cuenta además con un link para ofrecer la oportunidad al usuario de navegar directamente a la página inicial de la aplicación `"/"`.

![1748865796543](image/readme/1748865796543.png)

---
