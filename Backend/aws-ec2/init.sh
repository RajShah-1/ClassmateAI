sudo apt update && sudo apt upgrade -y

sudo apt install -y python3-pip python3-venv redis-server ffmpeg git build-essential

# Redis
sudo systemctl enable redis
sudo systemctl start redis

cd ~
git clone https://github.com/YOUR_USERNAME/classmate-backend.git
cd classmate-backend

# Python setup
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip

# Install Python deps
pip install -r requirements.txt

# pip install flask flask_sqlalchemy mutagen celery redis python-dotenv whisper torch \
#             langchain langchain-google-genai summa gunicorn

mkdir uploads
sudo ufw allow 5000

echo 'Pulled all the dependencies'
