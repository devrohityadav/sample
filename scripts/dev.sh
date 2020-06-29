echo "[Step 1]: Starting react dev server ..."
gnome-terminal -e 'npm run client'

echo "[Step 2]: Starting Local-node-dev-server..."
NODE_ENV=development nodemon src/*.js
