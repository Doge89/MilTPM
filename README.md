# Milwaukee TPM

Para obtener los cambios de la rama frontend sin que sobreescriban los cambios en el proyecto local se usan los siguientes comandos

```
  git merge origin/frontend --allow-unrelated-histories -X theirs
```
