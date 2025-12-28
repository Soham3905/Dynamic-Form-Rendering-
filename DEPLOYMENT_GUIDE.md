# React Native Deployment Guide

This guide will help you:
1. Run the app on your Android phone via USB debugging
2. Create and run a Docker image
3. Share the Docker image with your friend

---

## Prerequisites

### For Phone Deployment:
- ✅ Android phone connected via USB
- ✅ USB debugging enabled on your phone
- ✅ Android SDK and platform tools installed
- ✅ Java Development Kit (JDK) installed
- ✅ Node.js (v20 or higher) installed

### For Docker:
- ✅ Docker Desktop installed and running
- ✅ Docker Hub account (for sharing images)

---

## Part 1: Running on Your Phone via USB

### Step 1: Verify USB Connection

Open PowerShell or Command Prompt and run:

```powershell
# Check if your device is detected
adb devices
```

You should see your device listed. If not:
- Make sure USB debugging is enabled on your phone
- Accept the USB debugging authorization prompt on your phone
- Try a different USB cable/port

### Step 2: Install Dependencies

Navigate to your project directory:

```powershell
cd C:\ReactNative\myfirstapp
```

Install npm dependencies (if not already done):

```powershell
npm install
```

### Step 3: Start Metro Bundler

In your first terminal window, start the Metro bundler:

```powershell
npm start
```

Or with cache reset:

```powershell
npx react-native start --reset-cache
```

**Keep this terminal window open!**

### Step 4: Run on Your Phone

Open a **new terminal window** (keep Metro running in the first one) and run:

```powershell
cd C:\ReactNative\myfirstapp
npm run android
```

Or directly:

```powershell
npx react-native run-android
```

This will:
- Build the Android app
- Install it on your connected phone
- Launch the app automatically

### Troubleshooting Phone Connection:

If you encounter issues:

```powershell
# Restart ADB server
adb kill-server
adb start-server
adb devices

# Check if port 8081 is available (Metro bundler port)
netstat -ano | findstr :8081

# If port is busy, kill the process or use a different port
```

---

## Part 2: Creating Docker Image

### Step 1: Build the Docker Image

Navigate to your project directory:

```powershell
cd C:\ReactNative\myfirstapp
```

Build the Docker image:

```powershell
# Using npm script
npm run docker:build

# Or directly with docker
docker build -t myfirstapp:latest .
```

This will create a Docker image named `myfirstapp:latest`.

### Step 2: Verify the Image

Check if the image was created:

```powershell
docker images
```

You should see `myfirstapp` in the list.

### Step 3: Run the Docker Container

**Option A: Using Docker Compose (Recommended)**

```powershell
npm run docker:run
```

Or:

```powershell
docker-compose up
```

This will:
- Start the Metro bundler in a container
- Expose port 8081 for Metro bundler
- Mount your code for live reloading

**Option B: Using Docker directly**

```powershell
docker run -it -p 8081:8081 -v ${PWD}:/app -v /app/node_modules myfirstapp:latest
```

### Step 4: Connect Your Phone to Docker Metro

When the Docker container is running:

1. Make sure your phone is connected via USB
2. Run this command to forward Metro port:

```powershell
adb reverse tcp:8081 tcp:8081
```

3. Now you can run the app on your phone:

```powershell
# In a new terminal (keep Docker running)
cd C:\ReactNative\myfirstapp
npm run android
```

### Stop Docker Container

To stop the Docker container:

```powershell
npm run docker:stop
```

Or:

```powershell
docker-compose down
```

---

## Part 3: Sharing Docker Image with Your Friend

### Step 1: Tag Your Image for Docker Hub

First, create a Docker Hub account at https://hub.docker.com (if you don't have one).

Tag your image with your Docker Hub username:

```powershell
# Replace 'yourusername' with your actual Docker Hub username
docker tag myfirstapp:latest yourusername/myfirstapp:latest
```

### Step 2: Login to Docker Hub

```powershell
docker login
```

Enter your Docker Hub username and password when prompted.

### Step 3: Push Image to Docker Hub

```powershell
# Using npm script
npm run docker:push

# Or directly (make sure you tagged it first)
docker push yourusername/myfirstapp:latest
```

This will upload your image to Docker Hub. The process may take a few minutes depending on your internet speed.

### Step 4: Share the Image Link

Once pushed, your friend can pull the image using:

```powershell
docker pull yourusername/myfirstapp:latest
```

**Share this command with your friend:**
```
docker pull yourusername/myfirstapp:latest
```

Replace `yourusername` with your actual Docker Hub username.

### Step 5: Your Friend's Setup

Your friend should:

1. **Pull the image:**
   ```powershell
   docker pull yourusername/myfirstapp:latest
   ```

2. **Run the container:**
   ```powershell
   docker run -it -p 8081:8081 -v ${PWD}:/app -v /app/node_modules yourusername/myfirstapp:latest
   ```

3. **Or use docker-compose** (if they have the docker-compose.yml file):
   ```powershell
   # First, they need to update docker-compose.yml to use your image
   # Or you can share the entire project folder
   docker-compose up
   ```

---

## Quick Reference Commands

### Phone Deployment:
```powershell
# Start Metro
npm start

# Run on phone (in new terminal)
npm run android

# Check connected devices
adb devices

# Forward Metro port
adb reverse tcp:8081 tcp:8081
```

### Docker:
```powershell
# Build image
npm run docker:build

# Run container
npm run docker:run

# Stop container
npm run docker:stop

# Push to Docker Hub (after tagging)
npm run docker:push
```

### Docker Hub Sharing:
```powershell
# Tag image
docker tag myfirstapp:latest yourusername/myfirstapp:latest

# Login
docker login

# Push
docker push yourusername/myfirstapp:latest
```

---

## Troubleshooting

### Issue: "Device not found" when running on phone
**Solution:**
- Check USB debugging is enabled
- Run `adb devices` to verify connection
- Try `adb kill-server && adb start-server`

### Issue: "Port 8081 already in use"
**Solution:**
- Stop any running Metro bundler instances
- Or use: `npx react-native start --port 8082` and update port forwarding

### Issue: Docker build fails
**Solution:**
- Make sure Docker Desktop is running
- Check you're in the correct directory
- Try: `docker system prune` to clean up

### Issue: Can't push to Docker Hub
**Solution:**
- Verify you're logged in: `docker login`
- Check your image is tagged correctly: `docker images`
- Ensure you have internet connection

---

## Notes

- The Docker image contains the Metro bundler, not the compiled Android app
- Your friend will still need to have React Native development environment set up to build the Android app
- For production sharing, consider building an APK file instead
- The Docker setup is primarily for sharing the development environment

---

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)

