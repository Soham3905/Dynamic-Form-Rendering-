# Quick Start Commands

## 🚀 Run on Your Phone

### Terminal 1 - Start Metro:
```powershell
cd C:\ReactNative\myfirstapp
npm start
```

### Terminal 2 - Run on Phone:
```powershell
cd C:\ReactNative\myfirstapp
npm run android
```

### Check Device Connection:
```powershell
adb devices
```

---

## 🐳 Docker Commands

### Build Docker Image:
```powershell
cd C:\ReactNative\myfirstapp
npm run docker:build
```

### Run Docker Container:
```powershell
npm run docker:run
```

### Stop Docker Container:
```powershell
npm run docker:stop
```

---

## 📤 Share Docker Image

### 1. Tag Image (replace 'yourusername'):
```powershell
docker tag myfirstapp:latest yourusername/myfirstapp:latest
```

### 2. Login to Docker Hub:
```powershell
docker login
```

### 3. Push Image:
```powershell
docker push yourusername/myfirstapp:latest
```

### 4. Share this command with your friend:
```powershell
docker pull yourusername/myfirstapp:latest
```

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

