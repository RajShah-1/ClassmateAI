

npx expo export:embed \
  --platform ios \
  --dev false \
  --entry-file node_modules/expo-router/entry.js \
  --bundle-output ios/main.jsbundle \
  --assets-dest ios

- Run above in UI/ to bundle the js
- Then go to Profile Scheme and change build type to release


For Backend:
- Use nohup 

(venv) azureuser@myVm:~/ClassmateAI/Backend$ nohup flask --app celery-app run --host=0.0.0.0 --port=5000 &
(venv) azureuser@myVm:~/ClassmateAI/Backend$ nohup celery -A celery-app.celery worker --loglevel=info --pool threads &