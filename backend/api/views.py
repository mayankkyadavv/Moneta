from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from base.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register_user(request):
    if request.method == 'GET':
        return Response({"Error" : "Dont come here!"})
    
    try:
        user_data = request.data
        user_data['password'] = make_password(user_data['password'])
        user = User.objects.create(**user_data)
        return Response({"message": "creation succesfull", "user": {user.username}}, status=200)
        
    except Exception as e:
        return Response({"error": f"Error making account: {e}"}, status=401)

