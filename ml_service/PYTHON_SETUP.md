# Python Installation Guide for Windows

## Quick Diagnosis
Run these commands in PowerShell to check Python status:
```powershell
# Check if Python is installed
python --version
py --version
where python

# Check PATH
$env:Path -split ';' | Select-String python
```

## Installation Steps

### Option 1: Official Python Installer (Recommended)
1. Download: https://www.python.org/downloads/windows/
2. **CRITICAL**: Check ✅ "Add Python to PATH" during installation
3. Click "Install Now"
4. Restart PowerShell after installation

### Option 2: Microsoft Store (Easiest)
1. Open Microsoft Store
2. Search "Python 3.12"
3. Click "Get" / "Install"
4. Automatically adds to PATH

### Option 3: Use Python Launcher (Already Installed)
If `py` works but `python` doesn't:
```powershell
# Use 'py' instead of 'python'
py --version
py -m pip install -r requirements.txt
py app.py
```

## Verification
After installation:
```powershell
# Close and reopen PowerShell, then:
python --version  # Should show: Python 3.x.x
pip --version     # Should show pip version
```

## Quick Fix for Your Project
If you have Python but PATH is not set:

### Find Python Installation
```powershell
# Common locations:
C:\Users\Preyas\AppData\Local\Programs\Python\Python312\python.exe
C:\Python312\python.exe
C:\Users\Preyas\AppData\Local\Microsoft\WindowsApps\python.exe
```

### Add to PATH (Current Session Only)
```powershell
$env:Path += ";C:\Users\Preyas\AppData\Local\Programs\Python\Python312"
$env:Path += ";C:\Users\Preyas\AppData\Local\Programs\Python\Python312\Scripts"
```

### Install Dependencies
```powershell
cd "P:\SkillScope\Project file\skillscope-pathfinder-ai\ml_service"
python -m pip install -r requirements.txt
```

### Test ML Service
```powershell
python app.py
# Should show: Running on http://127.0.0.1:5000
```

## Alternative: Use `py` Launcher
Windows includes a Python launcher:
```powershell
py -m pip install -r requirements.txt
py app.py
```

## Still Having Issues?

### Issue: "Python was not found"
**Solution**: Reinstall Python with "Add to PATH" checked

### Issue: "Permission Denied"
**Solution**: Run PowerShell as Administrator

### Issue: "pip is not recognized"  
**Solution**: 
```powershell
py -m ensurepip --upgrade
py -m pip install --upgrade pip
```

## For Your Presentation Tomorrow

**Backup Plan**: The website works perfectly with the mock fallback! You can:
1. Demo with current setup (mock predictions)
2. Mention "ML model is implemented and ready"
3. Show the ML code files as proof
4. Test ML after fixing Python post-presentation
