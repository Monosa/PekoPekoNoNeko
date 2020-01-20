from django.db import models
import uuid
# Create your models here.
class Song(models.Model):
    """
    Modelo que representa un género literario (p. ej. ciencia ficción, poesía, etc.).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text="ID único para esta canción")
    name = models.CharField(max_length=200, help_text="Ingrese el nombre de la canción")
    author = models.CharField(max_length=200, help_text="Ingrese el nombre del autor")
	
    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej. en el sitio de Administración)
        """
        return self.name
