echo "[Step 1]: Clearing build..."
rm -rf ./build
rm -rf ./client/build

echo "[Step 2]: Building React Client..."
gnome-terminal -e 'npm run build:client'

clear

echo "[Step 3]: Building api-server..."
yarn tsc
