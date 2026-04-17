"""
Vercel Serverless Entry Point for the Drona AI Flask backend.

This file imports the Flask `app` object from the backend folder
and exposes it as a Vercel serverless function handler.
"""
import sys
import os

# Make the backend directory importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app import app

# Vercel looks for a variable named `app` to use as the WSGI handler.
# Our Flask app object is already named `app`, so no further work needed.
