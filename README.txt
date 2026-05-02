# 🇫🇷 French Mastery Hub — Setup Guide

## What you need first (one-time)
1. Move this folder to **C:\French\french-mastery-hub** (NOT inside OneDrive)
2. Make sure Node.js is installed (nodejs.org — green LTS button)

## To install (one-time, 2 minutes)
1. Open PowerShell in this folder (Shift + right-click → "Open PowerShell window here")
2. Type exactly: `npm install`
3. Press Enter and wait for it to finish

## To start the app every day
- Double-click **START.bat**
- Wait ~10 seconds
- Open your browser to: **http://localhost:5173**
- Create your account (stored locally on your computer only)

## Features that work with NO setup
- All 46 lessons (A1 to B2) with grammar explanations
- Vocabulary flashcards with spaced repetition (SM-2)
- Grammar drills with explanations
- Reading passages (A1-B2 with Oakville context)
- Listening with free browser text-to-speech
- Speaking recorder with pronunciation tips
- Progress dashboard, streak tracking, XP
- Daily planner with Google Calendar export

## Optional: AI Writing Feedback (costs pennies)
1. Go to platform.openai.com, create account, add $5 credit
2. Create an API key
3. Open the .env file in this folder with Notepad
4. Replace `OPENAI_API_KEY=optional` with `OPENAI_API_KEY=sk-your-key-here`
5. Restart the app
Cost: about $0.001 per writing submission. $5 lasts for years.

## Your data
Everything is saved in **server/db/data.json** — just a text file on your computer.
No cloud, no subscription, no data shared anywhere.
