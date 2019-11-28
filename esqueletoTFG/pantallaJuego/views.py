from django.shortcuts import render

# Create your views here.
from .models import Song

def index(request):
    """
    Función vista para la página inicio del sitio.
    """
    # Genera contadores de algunos de los objetos principales
    num_songs=Song.objects.all().count()
    
    
    # Renderiza la plantilla HTML index.html con los datos en la variable contexto
    return render(
        request,
        'index.html',
        context={'num_songs':num_songs},
    )
