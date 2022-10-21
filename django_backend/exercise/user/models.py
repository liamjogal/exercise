from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django_backend.exercise import user


class UserManager(BaseUserManager):
    
    def create_user(self, username, email, password, **kwargs):
        if username == None:
            raise TypeError('User must have a username')
        if email == None:
            raise TypeError("User must have an email")
        if password == None:
            raise TypeError("User must have a password")
        user= self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user
