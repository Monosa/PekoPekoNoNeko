from django.shortcuts import render

# Create your views here.
from .models import Song

def titlescreen(request):
    "Función que muestra la pantalla de título nada más acceder a la aplicación"
    return render(request, 'titlescreen.html', {})


def index(request):
    """
    Función vista para la página inicio del sitio.
    """
    # Genera contadores de algunos de los objetos principales
    #num_songs=Song.objects.all().count()
    
    
    # Renderiza la plantilla HTML index.html con los datos en la variable contexto
    return render(
        request,
        'index.html',
        context={},
    )


def crea(request):
    """
    Función vista para la página inicio del sitio.
    """
    
    # Renderiza la plantilla HTML index.html con los datos en la variable contexto
    return render(
        request,
        'crea.html',
    )